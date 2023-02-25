import { Link } from "react-router-dom";
import { RoutePaths } from "../../constants/RoutePaths";
import useLeaderboard from "../../hooks/useLeaderboard";
import s from "./Leaderboard.module.css";

const Leaderboard = () => {
    const { leaderboard, loading } = useLeaderboard();
    return (
        <div className={s.root}>
            <p>Leaderboard</p>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {leaderboard.map((entry, index) => (
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