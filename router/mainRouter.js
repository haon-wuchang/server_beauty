import express from 'express';
import * as controller from '../controller/mainController.js';

const router = express.Router();

router
    .post('/bestItem', controller.getMainBestItem)
    .post('/sunItem', controller.getMainSunItem);

export default router;