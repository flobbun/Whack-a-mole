interface LeaderboardEntry {
    id: number;
    name: string;
    score: number;
}

export type Leaderboard = LeaderboardEntry[];