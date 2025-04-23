import express from "express";
import * as controller from '../controller/mypageController.js';

const router = express.Router();

router
    .post('/getMyinfo',controller.getMyinfo)
    .post('/updateInfo',controller.updateInfo)
    .post('/deleteUser',controller.deleteAllMyinfo)
    .post('/addDelivery',controller.addDelivery)
    .post('/updateMainDelivery',controller.updateMainDelivery)
    .post('/deleteDelivery',controller.deleteDelivery)
    .post('/getMyOrder',controller.getMyOrder)
    .post('/getWishNumber',controller.getWishNumber)
    .post('/getWishInfo',controller.getWishInfo)
    .post('/updateWishList',controller.updateWishList)
    .post('/deleteAllWishList',controller.deleteAllWishList)
    .post('/getReview',controller.getReview)
    .post('/deleteOrder',controller.deleteOrder);

export default router;