import express from "express";
import * as multicontroller from '../controller/adminController.js';
import * as controller from '../controller/adminSingleController.js';
import * as uploadcontroller from '../controller/productUploadController.js';

    const router = express.Router();

router
    .post('/',controller.fileUpload)
    .post('/multiple',multicontroller.fileUploadMultiple)
    .post('/dbupload',uploadcontroller.registerProduct )
    .post('/dbDescUpload',uploadcontroller.registerProductDesc )
    .post('/getLastPid',multicontroller.getLastPid);

export default router;
