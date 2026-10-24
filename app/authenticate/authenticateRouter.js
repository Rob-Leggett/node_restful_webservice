import { Router } from 'express';
import * as authenticateController from './authenticateController.js';
import { authLimiter } from '../rateLimiter.js';

const router = Router();

router.post('/', authLimiter, authenticateController.authenticate);

export default router;
