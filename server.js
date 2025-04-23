import express from 'express';
import cors from 'cors';
import path from 'path';
import productRouter from './router/productRouter.js';
import LoginRouter from './router/LoginRouter.js';
import mypageRouter from './router/mypageRouter.js';
import mainRouter from './router/mainRouter.js';
import searchRouter from './router/searchRouter.js';
import cartRouter from './router/cartRouter.js';
import signupRouter from './router/signupRouter.js';
import orderRouter from './router/orderRouter.js';
import adminRouter from './router/adminRouter.js';
import snsLoginRouter from './router/snsLoginRouter.js';
import paymentRouter from './router/paymentRouter.js';


/* 서버 생성 및 포트 정의 */
const server = express();
const port = 9000;

/* 서버의 공통적인 작업 */
server.use(express.json());
server.use(express.urlencoded()); 
server.use(cors());
server.use('/upload_files', express.static(path.join("upload_files")));
server.use('/upload_review_photos', express.static('upload_review_photos'));

/* 서버의 요청처리를 위한 미들웨어 정의 */
server.use('/product', productRouter)
server.use('/login',LoginRouter);
server.use('/signup',signupRouter);
server.use('/mypage',mypageRouter);
server.use('/main', mainRouter);
server.use('/search', searchRouter);
server.use('/cart', cartRouter);
server.use('/order', orderRouter);
server.use('/uploads', adminRouter);
server.use('/:provider', snsLoginRouter);
server.use('/payment', paymentRouter);



server.listen(port,()=>{
    console.log('서버실행중');    
});