import { Router } from 'express';
import jwtVerifier from '../authenticate/jwtVerifier.js';
import * as customerController from './customerController.js';

const router = Router();

router.use(jwtVerifier);

router.get('', customerController.getCustomers);
router.get('/:id', customerController.getCustomer);
router.post('', customerController.saveCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

export default router;
