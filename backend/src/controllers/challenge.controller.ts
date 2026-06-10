import { Request, Response, NextFunction } from 'express';
import { getChallenges, completeChallenge } from '../services/challenge.service';
import { ApiResponse, Challenge } from '../types';

export const listChallenges = async (req: Request, res: Response<ApiResponse<Challenge[]>>, next: NextFunction) => {
  try {
    const data = await getChallenges();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

export const markChallengeComplete = async (req: Request, res: Response<ApiResponse<Challenge>>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const challenge = await completeChallenge(id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Challenge marked as completed',
      data: challenge
    });
  } catch (error) {
    next(error);
  }
};
