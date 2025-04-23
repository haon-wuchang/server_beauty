import express from "express";
import * as controller from '../controller/loginController.js';

const router = express.Router();

router.post('/',controller.CheckLogin);

export default router;