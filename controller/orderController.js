import * as repository from '../repository/orderRepository.js';

/********************************************
    장바구니 목록 전체 조회(전체상품주문)
    사용처 : payment
    작성자 : 김유나
********************************************/
export const getCartAll = async(req, res) => {
    const result = await repository.getCartAll(req.body);
    res.json(result);
    res.end();
}


/********************************************
    장바구니 선택 목록 조회(선택상품주문)
    사용처 : payment
    작성자 : 김유나
********************************************/
export const getSelectItems = async(req, res) => {
    const result = await repository.getSelectItems(req.body);
    res.json(result);
    res.end();
}


/********************************************
    결제 페이지 배송지 수정
    사용처 : payment
    작성자 : 김유나
********************************************/
export const updateDelivery = async(req, res) => {
    const result = await repository.updateDelivery(req.body);
    res.json(result);
    res.end();
}


/********************************************
    구매 상품 주문 테이블에 저장
    사용처 : Payment
    작성자 : 김유나
********************************************/
export const saveToOrder = async(req, res) => {
    const result = await repository.saveToOrder(req.body);
    res.json(result);
    res.end();
}


/********************************************
    선택 주문 완료 후 장바구니 테이블에서 삭제
    사용처 : Payment
    작성자 : 김유나
********************************************/
export const deleteItems = async(req, res) => {
    const result = await repository.deleteItems(req.body);
    res.json(result);
    res.end();
}


/********************************************
    주문 완료 후 주문 번호로 주문 내역 호출
    사용처 : payment success
    작성자 : 김유나
********************************************/
export const getBill = async(req, res) => {
    const result = await repository.getBill(req.body);
    res.json(result);
    res.end();
}