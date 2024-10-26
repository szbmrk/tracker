import React from 'react';
import StatCard from './StatCard';
import axios from 'axios';

const Overall = () => {
    const api_url = process.env.REACT_APP_API_URL;

    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(api_url + '/players');
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
    }

    if (loading) {
        return (
            <div>loading</div>
        );
    }

    return (
        <div>
            {players.map(player => (
                <StatCard key={player._id} player={player} />
            ))}
        </div>
    );
};

export default Overall;