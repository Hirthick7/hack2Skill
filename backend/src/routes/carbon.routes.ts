import { Router } from 'express';
import { calculateCarbonFootprint } from '../controllers/carbon.controller';
import { validate } from '../middlewares/validate';
import { calculateCarbonSchema } from '../validators/carbon.validator';

const router = Router();

router.post('/calculate', validate(calculateCarbonSchema), calculateCarbonFootprint);

export default router;
