import React from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { api_url } from '../../config.js/config';

const Overall = () => {
    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(api_url + '/stats/overall');
            setPlayers(response.data);
        } catch (error) {
            console.error("Error fetching player stats:", error);
        }
        setLoading(false);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="overall-container">
            <div className="stat-cards-grid">
                {players.map(player => (
                    <StatCard key={player._id} player={player} seasonal={false} />
                ))}
            </div>
        </div>
    );
};

export default Overall;