import {db} from './db.js';

export const CheckLogin = async(data) => {    
    const sql = `
        select count(*) as result_rows
            from customer 
            where id = ? and password = ?
                `;
    const [result] = await db.execute(sql,[data.id,data.pwd]);   

    return {"result":result[0].result_rows};
}