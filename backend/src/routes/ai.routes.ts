import { Router } from 'express';
import { handleChat } from '../controllers/ai.controller';
import { validate } from '../middlewares/validate';
import { aiChatSchema } from '../validators/ai.validator';
import { aiLimiter } from '../middlewares/security';

const router = Router();

router.post('/chat', aiLimiter, validate(aiChatSchema), handleChat);

export default router;
