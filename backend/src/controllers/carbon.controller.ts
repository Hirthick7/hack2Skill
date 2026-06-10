import { Request, Response, NextFunction } from 'express';
import { calculateCarbon } from '../services/carbon.service';
import { ApiResponse, CarbonResult } from '../types';

export const calculateCarbonFootprint = async (req: Request, res: Response<ApiResponse<CarbonResult>>, next: NextFunction) => {
  try {
    const input = req.body;
    const result = calculateCarbon(input);

    res.status(200).json({
      success: true,
      message: 'Carbon footprint calculated successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
