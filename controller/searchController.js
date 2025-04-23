import * as repository from '../repository/searchRepository.js';

export const getAllProduct = async(req, res) => {
    const result = await repository.getAllProduct(req.body);
    res.json(result);
    res.end();
}