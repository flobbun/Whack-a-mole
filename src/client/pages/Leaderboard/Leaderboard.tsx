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
                    <li key={index+entry.id}>{entry.name} - {entry.score}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Leaderboard;