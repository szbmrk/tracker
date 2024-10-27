import React from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { api_url } from '../../config/config.js';
import { useParams } from 'react-router-dom';
import '../../styles/spinner.css';

const StatsPage = ({ seasonal }) => {
    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const { seasonYear } = useParams();

    React.useEffect(() => {
        fetchData();
    }, [seasonYear]);

    const fetchData = async () => {
        setLoading(true);
        if (!seasonal) {
            document.title = 'Tracker | R6 - Overall Stats';
            const response = await axios.get(api_url + '/stats/overall');
            setPlayers(response.data.sort((a, b) => b.matches - a.matches));
            setLoading(false);
        }
        else {
            document.title = 'Tracker | R6 - Season ' + seasonYear + ' Stats';
            const response = await axios.get(api_url + '/stats/' + seasonYear);
            setPlayers(response.data.sort((a, b) => b.matches - a.matches));
            setLoading(false);
        }

    }

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }


    return (
        <div className="overall-container">
            <div className="stat-cards-grid">
                {players.map(player => (
                    <StatCard key={player._id} player={player} seasonal={seasonal} />
                ))}
            </div>
        </div>
    );
};

export default StatsPage;