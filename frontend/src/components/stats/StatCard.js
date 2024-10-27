import React from 'react';
import '../../styles/statcard.css';

const StatCard = ({ player, seasonal }) => {
    const getRankImage = (rank) => {
        if (rank === "NO RANK") {
            return `/images/ranks/unranked.png`;
        }

        if (rank === "CHAMPIONS") {
            return `/images/ranks/champions.png`;
        }

        let rankTitle = rank.split(' ')[0].toLowerCase();
        let rankNumber = rank.split(' ')[1];
        rankNumber = rankNumber === 'V' ? 5 : rankNumber === 'IV' ? 4 : rankNumber === 'III' ? 3 : rankNumber === 'II' ? 2 : 1;

        return `/images/ranks/${rankTitle}-${rankNumber}.png`;
    };

    const kd = (player.kills / player.deaths).toFixed(2);
    const winrate = ((player.wins / player.matches) * 100).toFixed(1);

    const profileImage = `/images/players/${player.playerName}.png`;
    const currentRankImage = seasonal ? getRankImage(player.currentRank) : null;
    const maxRankImage = seasonal ? getRankImage(player.maxRank) : null;

    return (
        <div className="stat-card" data-theme={player.playerName}>
            <div className="stat-card__header">
                <img src={profileImage} alt={`${player.playerName} profile`} className="stat-card__profile-pic" />
                <h2 className="stat-card__name">{player.playerName}</h2>
            </div>
            {player.matches === 0 ? (
                <div className="stat-card__no-data">No data available</div>
            ) : (
                <div className="stat-card__stats">
                    <div className="stat-card__stat">
                        <span className="stat-card__label">Kills</span>
                        <span className="stat-card__value">{player.kills.toLocaleString('en-US')}</span> {/* Format Kills */}
                    </div>
                    <div className="stat-card__stat">
                        <span className="stat-card__label">K/D Ratio</span>
                        <span className="stat-card__value">{kd}</span>
                    </div>
                    <div className="stat-card__stat">
                        <span className="stat-card__label">Winrate</span>
                        <span className="stat-card__value">{winrate}%</span>
                        <div className="stat-card__progress-bar">
                            <div
                                className="stat-card__progress"
                                style={{ width: `${winrate}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="stat-card__stat">
                        <span className="stat-card__label">Matches</span>
                        <span className="stat-card__value">{player.matches.toLocaleString('en-US')}</span> {/* Format Matches */}
                    </div>
                    {!seasonal && (
                        <div className="stat-card__stat">
                            <span className="stat-card__label">Headshot %</span>
                            <span className="stat-card__value">{player.hsRate}%</span>
                            <div className="stat-card__progress-bar">
                                <div
                                    className="stat-card__progress"
                                    style={{ width: `${player.hsRate}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                    {seasonal && (
                        <>
                            <div className="stat-card__stat">
                                <div className="stat-card__rank-container">
                                    <span className="stat-card__label">Current</span>
                                    <img src={currentRankImage} alt={`${player.currentRank} rank`} className="stat-card__rank-pic" />
                                </div>
                            </div>
                            <div className="stat-card__stat">
                                <div className="stat-card__rank-container">
                                    <span className="stat-card__label">Max</span>
                                    <img src={maxRankImage} alt={`${player.maxRank} rank`} className="stat-card__rank-pic" />
                                </div>
                            </div>
                        </>
                    )}
                    {!seasonal && (
                        <div className="stat-card__stat">
                            <span className="stat-card__label">Playtime</span>
                            <span className="stat-card__value">{player.playTime} h</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default StatCard;