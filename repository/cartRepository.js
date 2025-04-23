import { db } from "./db.js";
/********************************************
                장바구니 전체 리스트 조회 
            작성자 : 정서령
********************************************/
export const getItems = async({id}) => {
    const sql = `
        select * from view_cart_list
        where id = ?
    `;
    const [result] =  await db.execute(sql, [id]);
    return result; 
}

/********************************************
        장바구니 새로운 아이템 저장
        사용처 : ProductDetail
        작성자 : 정서령
********************************************/
export const addCart = async ({ id, cartList }) => {
    let result_rows = 0; // [1,1,1] 결과 누적
    const result = await Promise.all(

        cartList.map(async (item) => {
            const values = [id, item.pid, item.qty];

            const sql = `
                insert into cart(id, pid, qty)
                    values(?,?,?)
            `;
            const [result] = await db.execute(sql, values);
            return result.affectedRows; // 성공시 1 실패시 0 반환
        })
    )
    // 추가 행수 계산 [1,1,1] => 3
    result_rows = result.reduce((acc, cur) => acc + cur, 0)

    // result_rows -> 컨트롤러에 추가된 행의 갯수 전달
    return { 'result_rows': result_rows };
}

/********************************************
        장바구니 아이템 수량 업데이트
        사용처 : ProductDetail, Cart
        작성자 : 정서령
********************************************/
// 수량을 여러번 추가할 수 있게 하기 위해 qty 값도 같이 받아와서 추가하는 로직임

export const updateQty = async ({ cid, type, qty }) => {
    const qtyChange = type === "increase" ? `qty=qty+${qty}` : `qty=qty-${qty}`
    const sql = `
        update cart
            set ${qtyChange}
            where cid = ?
    `;

    const [result] = await db.execute(sql, [cid]);
    return { "result_rows": result.affectedRows };
}

/********************************************
        장바구니 아이템 삭제
        사용처 : Cart
        작성자 : 김유나
********************************************/
export const deleteCartItem = async({cid}) => {
    const sql = `
        delete from cart where cid = ${cid}
    `;

    const [result] = await db.execute(sql);
    return {"result_rows": result.affectedRows};
}

/********************************************
        장바구니 아이템 전체 삭제
        사용처 : Cart
        작성자 : 김유나
********************************************/
export const clearCart = async() => {
    const sql = `
        truncate table cart;
    `;

    const [result] = await db.execute(sql);
    return {"result_rows": result.affectedRows};
}

/********************************************
        장바구니에서 선택한 상품의 가격만 계산
        사용처 : Cart
        작성자 : 김유나
********************************************/
export const getSelectItemPrice = async({cids}) => {
    const arr = cids.map(item => item.cid).join(",");

    const sql = `
        select cid, discount_price, qty 
        from view_cart_list 
        where cid in (${arr});
    `;

    const [result] = await db.execute(sql);
    return result;
}