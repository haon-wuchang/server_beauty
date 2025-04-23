import * as repository from '../repository/signupRepository.js';


/*************************** 
 *  아이디 중복체크 
***************************/
export const getIdCheck = async(req, res) => {  
  const result = await repository.getIdCheck(req.body);
  res.json(result);
  res.end();
};

/*************************** 
 * 회원가입 로직
***************************/
export const setSignup = async(req, res) =>{
  const phone = `${req.body.phone1}-${req.body.phone2}-${req.body.phone3}`;
  const email = `${req.body.email}@${req.body.emailDomain}`;
  req.body.phone = phone;
  req.body.email = email;

  const result = await repository.setSignup(req.body);
  res.json(result);
  res.end();
};

/*************************** 
 * 유저 아이디 찾기
***************************/
export const getUserIdFind = async(req,res) =>{
  const phone = `${req.body.phone1}-${req.body.phone2}-${req.body.phone3}`;
  req.body.phone = phone;
  
  const result = await repository.getUserIdFind(req.body);
  res.json(result);
  res.end();
};

/*************************** 
 * 유저 비밀번호 일치 여부 확인 & 비밀번호 변경
***************************/
export const getUserPwdFind= async(req,res) =>{
  
  const result = await repository.getUserPwdFind(req.body);
  if(result === 1){
    const result = await repository.updatePwd(req.body);
  }
  res.json(result);
  res.end();
}