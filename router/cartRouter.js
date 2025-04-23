import express from "express";
import * as controller from '../controller/cartController.js'

    const router = express.Router();

router
    .post('/items', controller.getItems) // 장바구니 리스트 가져오기
    .post('/add', controller.addCart) // 새로운 아이템 저장
    .put('/updateQty', controller.updateQty) // 아이템 수량 업데이트
    .delete('/deleteItem', controller.deleteCartItem) // 장바구니 아이템 개별 삭제
    .delete('/deleteAll', controller.clearCart) // 장바구니 아이템 전체 삭제
    .post('/selectItems', controller.getSelectItemPrice); // 장바구니 선택 아이템 정보 호출

export default router;
