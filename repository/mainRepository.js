import { db } from './db.js';

/* 메인 베스트 상품 리스트 호출 */
export const getMainBestItem = async() => {
    const sql = `
        select pid, 
            pname,
            format(price, 0) as price,
            discount_rate,
            ifnull(format(round(price - (price / NULLIF(discount_rate, 0)), -3), 0), format(price, 0)) as discount_price,
            main_image
        from product
        where pid between 20 and 33
    `;

    const [result] = await db.execute(sql);
    return result;
}

/* 메인 선케어 상품 리스트 호출 */
export const getMainSunItem = async() => {
    const sql = `
        select 
            pid,
            pname,
            format(price, 0) as price,
            discount_rate,
            ifnull(format(round(price - (price / NULLIF(discount_rate, 0)), -3), 0), format(price, 0)) as discount_price,
            main_image
        from product
        where sub_category_id = '001'
            and pid in (3, 25, 32, 33)
    `;

    const [result] = await db.execute(sql);
    return result;
}