import { Router } from 'express';
import * as authenticateController from './authenticateController.js';

const router = Router();

router.post('', authenticateController.authenticate);

export default router;
