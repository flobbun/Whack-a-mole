"use strict";
import { Request, Response } from "express";

/**
 * @route GET /api
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  return res.status(200).json([
    {
      name: "John Doe",
      score: 100,
    },
    {
      name: "Jane Doe",
      score: 50,
    },
    {
      name: "John Smith",
      score: 25,
    },
    {
      name: "Carl Smith",
      score: 10,
    },
    {
      name: "Maria Doe",
      score: 5,
    },
  ]);
};
