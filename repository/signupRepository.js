import { db } from "./db.js";
/*************************** 
 *  아이디 중복체크 
***************************/
export const getIdCheck = async({id}) => {
  const sql =`select count(*) as cnt from customer where id = ?`;

  const [result] = await db.execute(sql, [id]);  
  return result;
};
/*************************** 
 * 회원가입 로직
***************************/
export const setSignup = async(formdata) => {
  const sql =`
      insert into customer(id, password, name, phone, email, register_date )
      values(?,?,?,?,?,now())
  `;
  const values = [
        formdata.id,  
        formdata.password,  
        formdata.name,  
        formdata.phone,  
        formdata.email
  ];

  const [result] = await db.execute(sql, values );
  return result.affectedRows;
};

/*************************** 
 * 유저 아이디 찾기
***************************/
export const getUserIdFind = async(formdata) =>{
  const sql =`
    select count(*) as cnt, id 
    from customer 
    where name=? 
    and phone=?
    group by id
`;
  
const values = [ formdata.name, formdata.phone];
const [result] = await db.execute(sql, values);
return result;
};

/*************************** 
 * 유저 비밀번호 일치 여부 확인
***************************/
export const getUserPwdFind= async(formdata) =>{
const sql =`select count(*) as cnt from customer 
 where id =?  and password =? 
`;

const values= [formdata.id , formdata.password];
const [result] = await db.execute(sql, values);
return result[0].cnt;
}  

/*************************** 
 * 유저  비밀번호 변경
***************************/
export const updatePwd = async(formdata) => {
  const sql =`update customer set password = ? where id = ? `;

  const values = [formdata.newPassword, formdata.id];              

  const [result] = await db.execute(sql, values);
  return result.affectedRows;
};