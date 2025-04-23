import express from 'express';
import * as controller from '../controller/signupController.js';

const router = express.Router();

router.post('/idCheck', controller.getIdCheck)
      .post('/submit', controller.setSignup)  
      .post('/find/id', controller.getUserIdFind)  
      .post('/find/pwd', controller.getUserPwdFind);  

export default router;