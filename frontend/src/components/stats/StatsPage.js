import React from 'react';
import StatCard from './StatCard';
import axios from 'axios';
import { api_url } from '../../config/config.js';
import { useParams } from 'react-router-dom';
import '../../styles/spinner.css';
import MapsTable from './MapsTable.js';

const StatsPage = ({ seasonal }) => {
    const [players, setPlayers] = React.useState([]);
    const [maps, setMaps] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [view, setView] = React.useState('players');

    const { seasonYear } = useParams();

    const [hasMaps, setHasMaps] = React.useState(false);

    React.useEffect(() => {
        fetchData();
    }, [seasonYear]);

    const fetchData = async () => {
        setLoading(true);
        setView('players');
        if (!seasonal) {
            document.title = 'Tracker | R6 - Overall Stats';
            const response = await axios.get(api_url + '/stats/overall');
            setPlayers(response.data.playerStats.sort((a, b) => b.matches - a.matches));
            setMaps(response.data.mapStats);
            if (response.data.mapStats.length > 0) {
                setHasMaps(true);
            }
            else {
                setHasMaps(false);
            }
            setLoading(false);
        } else {
            document.title = 'Tracker | R6 - Season ' + seasonYear + ' Stats';
            const response = await axios.get(api_url + '/stats/' + seasonYear);
            setPlayers(response.data.playerStats.sort((a, b) => b.matches - a.matches));
            setMaps(response.data.mapStats);
            if (response.data.mapStats.length > 0) {
                setHasMaps(true);
            }
            else {
                setHasMaps(false);
            }
            setLoading(false);
        }
    };

    if (loading && view === 'players') {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="overall-container">
            {seasonal && hasMaps && (
                <div
                    className={`view-toggle ${view === 'players' ? 'players-active' : 'maps-active'}`}
                    onClick={() => setView(view === 'players' ? 'maps' : 'players')}
                >
                    <span className={`toggle-option ${view === 'players' ? 'active' : ''}`}>Players</span>
                    <span className={`toggle-option ${view === 'maps' ? 'active' : ''}`}>Maps</span>
                    <div className="knob"></div>
                </div>
            )}

            {view === 'players' ? (
                <div className="stat-cards-grid">
                    {players.map(player => (
                        <StatCard key={player._id} player={player} seasonal={seasonal} />
                    ))}
                </div>
            ) : (
                <div className="maps-placeholder">
                    <MapsTable maps={maps} seasonYear={seasonYear} />
                </div>
            )}
        </div>
    );
};

export default StatsPage;