import { db } from './db.js';

// 마이페이지 회원정보 가져오기
export const getMyinfo = async ({ id }) => {
    const sql = `
        select name, 
            password, 
            zipcode, 
            address, 
            extra_address, 
            phone, 
            email, 
            gender, 
            birth,
            membership,
            type,
            addtional_address
        from customer
        where id = ?
                `;
    const [result] = await db.execute(sql, [id]);
    return result[0];
}

//마이페이지 회원정보수정 업데이트
export const updateInfo = async ({ id, colName, value }) => {
    const sql = `
       update customer    
                  set ${colName} = ?
                           where id = ? 
                `;
    const result = await db.execute(sql, [value, id]);
    return { result: result[0].changedRows };
}

//회원탈퇴
export const deleteAllMyinfo = async ({ id }) => {
    // 먼저 orders 테이블에서 관련된 데이터를 삭제
    const deleteOrdersSql = `DELETE FROM orders WHERE id = ?`;
    await db.execute(deleteOrdersSql, [id]);

    // 그 다음 customer 테이블에서 삭제
    const deleteCustomerSql = `DELETE FROM customer WHERE id = ?`;
    const result = await db.execute(deleteCustomerSql, [id]);

    return { result: result[0].affectedRows };
}

// 배송지 추가
export const addDelivery = async (id, addAddress) => {
    const sql = `
        update customer set addtional_address = json_array(?)
	where id = ?
                 `;
    const result = await db.execute(sql, [addAddress, id]);
    return { result: result[0].affectedRows };
}


// 메인배송지 업뎃
export const updateMainDelivery = async (id, data) => {
    const sql = `
        update customer
        set name = ? , phone = ?, zipcode = ?, address = ?, extra_address = ? 
        where id = ? 
        `;

    const [result] = await db.execute(sql,
        [data.name, data.phone, data.zipcode, data.address, data.extra_address, id]);
    return { 'result': result.affectedRows };
}


// 추가배송지 삭제
export const deleteDelivery = async ({ id }) => {
    const sql = `
            update customer 
                  set addtional_address = null 
                           where id = ? 
                `;

    const result = await db.execute(sql, [id]);
    return result;
}

export const getMyOrder = async ({ id }) => {
    const sql = `
        select 
            oid, 
            id, 
            pid, 
            order_number, 
            qty, 
            total_price, 
            substring(odate,1,10) as odate,
            concat('http://15.165.205.38:9000/',main_image->>'$[0]') as main_image,
            delivery_status,
            pname
        from view_myorder
        where id = ?
                `;
    const [result] = await db.execute(sql, [id]);
    return result;
}

// 위시리스트  번호 가져오기
export const getWishNumber = async ({ id }) => {
    const sql = `
        select wish            
        from customer
        where id = ?
                `;
    const [result] = await db.execute(sql, [id]);
    return result[0];
}

// 위시리스트 정보 가져오기
export const getWishInfo = async ({ pid }) => {
    const sql = `
        select pname, 
       concat('http://15.165.205.38:9000/',main_image->>'$[0]') as main_image,
        price,
        pid            
        from product
        where pid = ?
                `;
    const [result] = await db.execute(sql, [pid]);
    return result[0];
}

// 위시리스트 정보 가져오기
export const updateWishList = async ({ newWishList, id }) => {
    const sql = `
            update customer set wish = ? where id = ? `;
    const values = [JSON.stringify(newWishList), id];

    const [result] = await db.execute(sql, values);
    return result.affectedRows;
}


// 위시리스트 전체삭제
export const deleteAllWishList = async ({ id }) => {
    const sql = `update customer set wish = null where id = ? `;
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
}


export const getReview = async ({ id, type }) => {

    let sql = `
        SELECT
            pid,
            subject,
            text,
            review_image,
            view_count,
            rdate
        FROM review
        WHERE id = ?
    `;

    if (type) {
        const order = type.toLowerCase() === "desc" ? "DESC" : "ASC";
        sql += ` ORDER BY ${order}`;
    }

    const [result] = await db.execute(sql, [id]);
    return result;
};

// 리뷰 정보 가져오기
// export const getReview = async ({ id,type }) => {
//     if(type){
//         const sql = `
//         select            
//             pid, 
//             subject, 
//             text,       
//             review_image,     
//              view_count,
//              rdate
//             from review
//             where id = ?
//             order by ${type} asc
//                 `;
//     const [result] = await db.execute(sql, [id]);
//     return result;
//     }
//     else{
//         const sql = `
//         select            
//             pid, 
//             subject, 
//             text,       
//             review_image,     
//              view_count,
//              rdate
//             from review
//             where id = ?
//                 `;
//     const [result] = await db.execute(sql, [id]);
//     return result;
//     }
// }

//리뷰작성클릭시 오더테이블에서 해당주문번호로 삭제
export const deleteOrder = async ({ order_number }) => {
    // console.log(order_number);
    
    const sql = `
       delete from orders where order_number = ? 
                `;
    const result = await db.execute(sql, [order_number]);
    return { result: result[0].affectedRows };
}

