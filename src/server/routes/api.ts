"use strict";
import { Request, Response } from "express";

/**
 * @route GET /api
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  return res.status(200).json([
    {
      id: 4,
      name: "Carl Smith",
      score: 10,
    },
    {
      id: 1,
      name: "John Doe",
      score: 100,
    },
    {
      id: 3,
      name: "John Smith",
      score: 25,
    },
    {
      id: 2,
      name: "Jane Doe",
      score: 50,
    },
    {
      id: 5,
      name: "Maria Doe",
      score: 5,
    },
  ]);
};
