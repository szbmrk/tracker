import React from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { api_url } from '../../config.js/config';
import { useParams } from 'react-router-dom';

const Seasonal = () => {
    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { seasonYear } = useParams();

    React.useEffect(() => {
        fetchData();
    }, [seasonYear]);

    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(api_url + '/stats/' + seasonYear);
        setPlayers(response.data);
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="loading">Loading...</div>
        );
    }

    return (
        <div className="overall-container">
            <div className="stat-cards-grid">
                {players.map(player => (
                    <StatCard key={player._id} player={player} seasonal={true} />
                ))}
            </div>
        </div>
    );
};

export default Seasonal;