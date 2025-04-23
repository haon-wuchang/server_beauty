import express from "express";
import * as controller from '../controller/productController.js'

const router = express.Router();

router 
    .post('/list', controller.getList) // product list 페이지
    .post('/detail', controller.getProduct) // 상품상세 페이지
    .post('/addWishList', controller.setWishList) // 위시리스트 추가
    .post('/getWishList', controller.getWishList) // 위시리스트 불러오기 
    .post('/reviewPhotos', controller.reviewPhotosUp) // 리뷰사진 업로드
    .post('/review', controller.reviewUp) // 리뷰 업로드
    .post('/getReview', controller.getReview) // 리뷰 가져오기
    .post('/DeleteReview', controller.DeleteReview) // 리뷰 삭제
    .post('/subList', controller.getSUbCateItems); // 서브 카테고리별 아이템 호출
    

export default router;