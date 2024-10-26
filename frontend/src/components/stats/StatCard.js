import React from 'react';
import '../../styles/statcard.css';

const StatCard = ({ player }) => {
    const kd = (player.kills / player.deaths).toFixed(2);
    const avgKills = (player.kills / player.matches).toFixed(2);
    const winrate = ((player.wins / player.matches) * 100).toFixed(1);

    return (
        <div className="stat-card">
            <h2 className="stat-card__name">{player.playerName}</h2>
            <div className="stat-card__stats">
                <div className="stat-card__stat">
                    <span className="stat-card__label">Headshot %</span>
                    <span className="stat-card__value">{player.hsRate}%</span>
                </div>
                <div className="stat-card__stat">
                    <span className="stat-card__label">Kills</span>
                    <span className="stat-card__value">{player.kills}</span>
                </div>
                <div className="stat-card__stat">
                    <span className="stat-card__label">K/D Ratio</span>
                    <span className="stat-card__value">{kd}</span>
                </div>
                <div className="stat-card__stat">
                    <span className="stat-card__label">Avg Kills</span>
                    <span className="stat-card__value">{avgKills}</span>
                </div>
                <div className="stat-card__stat">
                    <span className="stat-card__label">Winrate</span>
                    <span className="stat-card__value">{winrate}%</span>
                </div>
                <div className="stat-card__stat">
                    <span className="stat-card__label">Matches</span>
                    <span className="stat-card__value">{player.matches}</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;