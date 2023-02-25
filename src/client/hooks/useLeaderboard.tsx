import { useEffect, useState } from "react";
import { Leaderboard } from "../interfaces/leaderboard";

const useLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLeaderboard = async () => {
        setLoading(true);
        const response = await fetch("/api/leaderboard", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
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