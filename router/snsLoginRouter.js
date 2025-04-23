import express from 'express';
import * as controller from'../controller/snsLoginController.js';

const router = express.Router();

router.post('/:provider/callback', controller.snsLoginCallback);

export default router;
