import { Router } from 'express';
import { listChallenges, markChallengeComplete } from '../controllers/challenge.controller';

const router = Router();

router.get('/', listChallenges);
router.post('/:id/complete', markChallengeComplete);

export default router;
