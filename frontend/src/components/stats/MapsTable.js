import React, { useState } from 'react';
import '../../styles/mapstable.css';
import axios from 'axios';
import { api_url } from '../../config/config.js';

const MapsTable = ({ maps, seasonYear }) => {
    const currentSeasonYear = 'Y9S3';
    const [mapStats, setMapStats] = useState(maps);

    const getImageUrl = (mapName) => {
        return `/images/maps/${mapName}.png`;
    };

    const updateWins = async (index, delta) => {
        if (delta === 1) {
            try {
                const response = await axios.post(api_url + '/stats/map/win', {
                    seasonYear,
                    mapName: mapStats[index].mapName
                });

                if (response.status === 200) {
                    const updatedMapStats = [...mapStats];
                    updatedMapStats[index].wins += 1;
                    setMapStats(updatedMapStats);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (delta === -1) {
            if (mapStats[index].wins === 0) {
                return;
            }

            try {
                const response = await axios.delete(api_url + '/stats/map/win', {
                    data: {
                        seasonYear,
                        mapName: mapStats[index].mapName
                    }
                });

                if (response.status === 200) {
                    const updatedMapStats = [...mapStats];
                    updatedMapStats[index].wins -= 1;
                    setMapStats(updatedMapStats);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const updateLosses = async (index, delta) => {
        if (delta === 1) {
            try {
                const response = await axios.post(api_url + '/stats/map/loss', {
                    seasonYear,
                    mapName: mapStats[index].mapName
                });

                if (response.status === 200) {
                    const updatedMapStats = [...mapStats];
                    updatedMapStats[index].losses += 1;
                    setMapStats(updatedMapStats);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (delta === -1) {
            if (mapStats[index].losses === 0) {
                return;
            }

            try {
                const response = await axios.delete(api_url + '/stats/map/loss', {
                    data: {
                        seasonYear,
                        mapName: mapStats[index].mapName
                    }
                });

                if (response.status === 200) {
                    const updatedMapStats = [...mapStats];
                    updatedMapStats[index].losses -= 1;
                    setMapStats(updatedMapStats);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="maps-table-container">
            <h2 className="maps-table-title">Map Stats</h2>
            <div className="maps-table-wrapper">
                <table className="maps-table">
                    <thead>
                        <tr>
                            <th>Map</th>
                            <th>Name</th>
                            <th>Matches</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Winrate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapStats.map((map, index) => (
                            <tr key={index} className="map-row">
                                <td>
                                    <img src={getImageUrl(map.mapName)} alt={map.mapName} className="map-image" />
                                </td>
                                <td>{map.mapName}</td>
                                <td>{map.wins + map.losses}</td>
                                <td>
                                    <div className="win-loss-controls">
                                        {seasonYear === currentSeasonYear && (
                                            <>
                                                <button onClick={() => updateWins(index, -1)} className="win-loss-button">-</button>
                                                {map.wins}
                                                <button onClick={() => updateWins(index, 1)} className="win-loss-button">+</button>
                                            </>
                                        )}
                                        {seasonYear !== currentSeasonYear && map.wins}
                                    </div>
                                </td>
                                <td>
                                    <div className="win-loss-controls">
                                        {seasonYear === currentSeasonYear && (
                                            <>
                                                <button onClick={() => updateLosses(index, -1)} className="win-loss-button">-</button>
                                                {map.losses}
                                                <button onClick={() => updateLosses(index, 1)} className="win-loss-button">+</button>
                                            </>
                                        )}
                                        {seasonYear !== currentSeasonYear && map.losses}
                                    </div>
                                </td>
                                <td>
                                    <div className="progress-bar-wrapper">
                                        <span className="winrate-text">
                                            {((map.wins + map.losses === 0 ? 0 : (map.wins / (map.wins + map.losses)) * 100).toFixed(1))}%
                                        </span>
                                        <div className="progress-bar-container">
                                            <div
                                                className="progress-bar"
                                                style={{ width: `${(map.wins + map.losses === 0 ? 0 : (map.wins / (map.wins + map.losses)) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MapsTable;