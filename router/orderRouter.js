import express from "express";
import * as controller from '../controller/orderController.js';

const router = express.Router();

router
    .post('/all', controller.getCartAll) // 카트 전체 목록 가져오기
    .post('/select', controller.getSelectItems) // 카트 선택 목록 가져오기
    .post('/saveOrder', controller.saveToOrder) // 주문 상품 주문 테이블에 저장
    .delete('/deleteItems', controller.deleteItems) // 선택 주문 완료 후 해당 상품 장바구니 테이블에서 삭제
    .post('/updateDelivery', controller.updateDelivery); // 결제 페이지에서 배송지 변경

export default router;