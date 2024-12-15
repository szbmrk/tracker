import React from 'react';
import '../styles/vs.css';

const VS = () => {
    const tournaments = [
        {
            name: 'Első R6 Cup',
            winners: ['wolfino0', 'Szoboh', 'Kiliman-Jaro'],
        },
    ];

    document.title = 'Tracker | 1v1 Cup';

    return (
        <div className="tournament-results-container">
            <h1 className="tournament-header">Tournament Results</h1>
            {tournaments.map((tournament, index) => (
                <div key={index} className="tournament-card">
                    <h2>{tournament.name}</h2>
                    <ul>
                        {tournament.winners.map((winner, rank) => (
                            <li
                                key={rank}
                                className={`player player-rank-${rank + 1}`}
                                data-theme={winner}
                            >
                                <span className="rank-badge">
                                    {rank + 1 === 1
                                        ? '🥇'
                                        : rank + 1 === 2
                                            ? '🥈'
                                            : '🥉'}
                                </span>
                                <span className="player-name">{winner}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default VS;
