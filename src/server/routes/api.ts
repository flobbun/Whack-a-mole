"use strict";
import { Request, Response } from "express";

// Mocked data
const getLeaderboardFromDB = () => [
  {
    id: 1,
    name: "Carl Smith",
    score: 10,
  },
  {
    id: 2,
    name: "John Doe",
    score: 100,
  },
  {
    id: 3,
    name: "John Smith",
    score: 25,
  },
  {
    id: 4,
    name: "Jane Doe",
    score: 50,
  },
  {
    id: 5,
    name: "Maria Doe",
    score: 15,
  },
  {
    id: 6,
    name: "Doe Doe",
    score: 10,
  },
  {
    id: 7,
    name: "John Doe",
    score: 1,
  },
  {
    id: 8,
    name: "Fred",
    score: 32,
  },
  {
    id: 9,
    name: "Jane Wang",
    score: 44,
  },
  {
    id: 10,
    name: "Maria Anderson",
    score: 35,
  },
  {
    id: 11,
    name: "Anderson Doe",
    score: 49,
  },
]

/**
 * @route GET /api
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  const leaderboard = getLeaderboardFromDB().slice(0, 10);
  return res.status(200).json(leaderboard);
};
