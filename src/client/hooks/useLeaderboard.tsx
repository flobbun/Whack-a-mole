import { useEffect, useState } from "react";
import { ApiPaths, API_URL } from "../constants/ApiPaths";
import { Leaderboard } from "../interfaces/leaderboard";

/**
 * @description Hook to fetch leaderboard data
 * @returns {Object} leaderboard, loading
 */
const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Leaderboard>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLeaderboard = async () => {
        setLoading(true);
        const response = await fetch(`${API_URL}${ApiPaths.LEADERBOARD}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json() as Leaderboard;
        setLeaderboard(data);
        setLoading(false);
        return data;
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return {
        leaderboard,
        loading,
    }
}

export default useLeaderboard