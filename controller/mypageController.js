import * as repository from '../repository/mypageRepository.js';

export const getMyinfo = async(req,res) => {
    const result = await repository.getMyinfo(req.body);
    res.json(result);
    res.end();
}
// 회원정보 수정
export const updateInfo = async(req,res) => {
        const result = await repository.updateInfo(req.body);
        res.json(result);
        res.end();
}
// 회원탈퇴 
export const deleteAllMyinfo = async(req,res) => {
        const result = await repository.deleteAllMyinfo(req.body);
        res.json(result);
        res.end();
}
// 배송지 추가 
export const addDelivery = async(req,res) => {
    const addAddress = String(req.body.deliData.zipcode).concat('!', req.body.deliData.address, '=',req.body.deliData.extra_address,'+',req.body.deliData.name,'~',req.body.deliData.phone);      
        const result = await repository.addDelivery(req.body.id, addAddress);       
        res.json(result);
        res.end();
}

// 메인배송지 업뎃
export const updateMainDelivery = async(req,res) => {
    const id = req.body.id;
    const data = req.body.deliData2;
        const result = await repository.updateMainDelivery(id, data);       
        res.json(result);
        res.end();
}

// 추가배송지 삭제
export const deleteDelivery = async(req, res) => {
    const result = await repository.deleteDelivery(req.body);
    res.json(result);
    res.end();
}

// 주문정보 전체 가져오기
export const getMyOrder = async(req, res) => {
    const result = await repository.getMyOrder(req.body);
    res.json(result);
    res.end();
}



// 위시리스트 번호 전체 가져오기
export const getWishNumber = async(req, res) => {
    const result = await repository.getWishNumber(req.body);
    res.json(result);
    res.end();
}

// 위시리스트 정보 가져오기
export const getWishInfo = async(req, res) => {
    const result = await repository.getWishInfo(req.body);
    res.json(result);
    res.end();
}

// 위시리스트 삭제 후 새정보 가져오기
export const updateWishList = async(req, res) => {
    const result = await repository.updateWishList(req.body);
    res.json(result);
    res.end();
}


// 위시리스트 전체삭제
export const deleteAllWishList = async(req, res) => {
    const result = await repository.deleteAllWishList(req.body);
    res.json(result);
    res.end();
}

// 내리뷰가져오기
export const getReview = async(req, res) => {
    const result = await repository.getReview(req.body);
    res.json(result);
    res.end();
}

// 리뷰작성클릭시 해당 제품으로 이동되고 오더테이블에서 해당내역 삭제
export const deleteOrder = async(req, res) => {
    // console.log(res.body);    
    const result = await repository.deleteOrder(req.body);
    res.json(result);
    res.end();
}


