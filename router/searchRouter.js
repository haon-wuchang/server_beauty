import express from 'express';
import * as controller from '../controller/searchController.js';

const router = express.Router();

router.post('/', controller.getAllProduct);

export default router;