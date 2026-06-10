import { Request, Response, NextFunction } from 'express';
import { generateAIResponse } from '../services/ai.service';
import { ApiResponse } from '../types';

export const handleChat = async (req: Request, res: Response<ApiResponse<{ reply: string }>>, next: NextFunction) => {
  try {
    const { message, context } = req.body;
    
    const aiResponseText = await generateAIResponse(message, context);

    res.status(200).json({
      success: true,
      data: {
        reply: aiResponseText
      }
    });
  } catch (error) {
    next(error);
  }
};
