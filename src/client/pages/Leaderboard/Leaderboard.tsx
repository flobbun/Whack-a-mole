import { Link } from "react-router-dom";
import { RoutePaths } from "../../constants/RoutePaths";
import useLeaderboard from "../../hooks/useLeaderboard";
import s from "./Leaderboard.module.css";
import { RootState } from "../../store";
import { useSelector } from 'react-redux';

const Leaderboard = () => {
    const score = useSelector((state: RootState) => state.score.value);
    const { leaderboard, loading } = useLeaderboard();

    const getSortedLeaderboard = () => {
        if (score) {
            return [...leaderboard, { name: "You!", score, id: 0 }].sort((a, b) => b.score - a.score).slice(0, 10);
        }
        return leaderboard.sort((a, b) => b.score - a.score);
    };

    return (
        <div className={s.root}>
            <p>Leaderboard</p>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {getSortedLeaderboard().map((entry, index) => (
                        <li key={index + entry.id}>{entry.name} - {entry.score} <small>🏆</small></li>
                    ))}
                </ul>
            )}
            <Link to={RoutePaths.GAME}>
                <button>Back to gaming 🎮</button>
            </Link>
        </div>
    )
}

export default Leaderboard;