import * as repository from '../repository/loginRepository.js';
import jwt  from 'jsonwebtoken';

export const CheckLogin = async(req,res) =>{
    let result = await repository.CheckLogin(req.body);
    if(result.result === 1){
        const token = jwt.sign({'user_id':req.body.id}, 'wayvLDnt7F'); 
        result = {...result,'token':token};
    } 
    res.json(result);    
    res.end();
}