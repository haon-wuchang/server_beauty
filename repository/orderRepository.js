import { db } from "./db.js"

/********************************************
    장바구니 목록 전체 조회(전체상품주문)
    사용처 : payment
    작성자 : 김유나
********************************************/
export const getCartAll = async({id}) => {
    const sql = `
                    select *
                    from view_payment_list
                    where id = ?
                `;
    const [result] = await db.execute(sql, [id]);
    return result;
}


/********************************************
    장바구니 선택 목록 조회(선택상품주문)
    사용처 : payment
    작성자 : 김유나
 ********************************************/
export const getSelectItems = async(formData) => {
    const id = formData.id;
    const cids = formData.cids;

    const sql = `
                    select *
                    from view_payment_list
                    where id = ?
                        and cid in (${cids})
                `;
                
    const [result] = await db.execute(sql, [id]);
    return result;
}


/********************************************
    결제 페이지 배송지 수정
    사용처 : payment
    작성자 : 김유나
********************************************/
export const updateDelivery = async(formData) => {
    const sql = `
        update customer
        set name = ?,
            phone = ?,
            email = ?,
            zipcode = ?,
            address = ?,
            extra_address = ?
        where id = ?
    `;

    const values = [
        formData.name,
        formData.phone,
        formData.email,
        formData.zipcode,
        formData.address,
        formData.extra,
        formData.id
    ];

    const [result] = await db.execute(sql, values);

    return {"result_rows": result.affectedRows}
}


/********************************************
    구매 상품 주문 테이블에 저장
    사용처 : Payment
    작성자 : 김유나
********************************************/
export const saveToOrder = async(formData) => {
    const result = await Promise.all(
        formData.orderList.map(async(item) => {
            const values = [
                formData.id,
                item.pid,
                formData.orderNumber,
                item.qty,
                item.discount_price * item.qty
            ];

            const sql = `
                insert into orders(id, pid, order_number, qty, total_price, odate)
                    values(?, ?, ?, ?, ?, now());
            `;

            const [result] = await db.execute(sql, values);
            
            return {"result_rows": result.affectedRows};
        })
    )
    return {"result_rows": result[0].result_rows};
}

/********************************************
    선택 주문 완료 후 장바구니 테이블에서 삭제
    사용처 : Payment
    작성자 : 김유나
********************************************/
export const deleteItems = async(data) => {
    const cids = data.cids;
    const sql = `
        delete from cart where cid in (${cids})
    `;

    const [result] = await db.execute(sql);

    return {"result_rows": result.affectedRows};
}



/********************************************
    주문 완료 후 주문 번호로 주문 내역 호출
    사용처 : payment success
    작성자 : 김유나
********************************************/
export const getBill = async(formData) => {
    const id = formData.id;
    const orderNumber = formData.orderNumber;
    
    const sql = `
    select *
    from view_bill_list
    where id = ?
        and order_number = '${orderNumber}'
    `;
    
    const [result] = await db.execute(sql, [id]);
    return result;
}

