import * as repository from '../repository/mainRepository.js';

/* 메인 베스트 상품 리스트 호출 */
export const getMainBestItem = async(req, res) => {
    const result = await repository.getMainBestItem(req.body);
    res.json(result);
    res.end();
}

/* 메인 선케어 상품 리스트 호출 */
export const getMainSunItem = async(req, res) => {
    const result = await repository.getMainSunItem(req.body);
    res.json(result);
    res.end();
}