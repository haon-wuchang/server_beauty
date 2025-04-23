import { db } from './db.js';

export const getAllProduct = async() => {
    const sql = `
        select p.pid,
            s.sub_category_name,
            p.pname,
            format(p.price, 0) as price,
            p.discount_rate,
            ifnull(format(round(p.price - (p.price / NULLIF(p.discount_rate, 0)), -3), 0), format(p.price, 0)) as discount_price,
            p.main_image
        from product p, sub_category s
            where p.sub_category_id = s.sub_category_id
            order by pid
    `;

    const [result] = await db.execute(sql);
    return result;
}