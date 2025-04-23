import * as repository from '../repository/adminRepository.js';

// 상품 메인, 슬라이드 이미지 등록
export const registerProduct = async(req,res) => {
    const result = await repository.registerProduct(req.body);
    res.json(result); 
    res.end();
}

// 상품 설명이미지 등록
export const registerProductDesc = async(req,res) => {
    const result = await repository.registerProductDesc(req.body);
    res.json(result); 
    res.end();
}