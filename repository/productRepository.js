/************************ * 
 * 작성자 : 정서령
 ***************************/
import { db } from './db.js';
/************************ 
    전체상품 리스트 조회
**************************/
export const getList = async (category_id) => {
    let sql = `
        SELECT pid, pname, category_id, price, discount_rate,
               CONCAT('http://15.165.205.38:9000/', main_image->>'$[0]') AS image,
               main_image, pdate
        FROM product
    `;

    const params = [];

    if (category_id) {
        sql += ' WHERE category_id = ?'; // ✅ 조건 추가
        params.push(category_id);
    }
    const [result] = await db.execute(sql, params);
    return result;
};

/************************ 
    상품 상세 정보 조회
    
**************************/
export const getProduct = async (pid) => {

    const sql = `
    select 
            p.pid as pid,
            p.pname as pname,
            p.price as price,
            p.discount_rate as discount_rate,
            p.pdate as pdate,
                concat('http://15.165.205.38:9000/', p.main_image->>'$[0]') as mainImg,
                (
                    select json_arrayagg(concat('http://15.165.205.38:9000/', s.slideCol))
                    from json_table(p.slide_image, '$[*]' columns(slideCol varchar(100) path '$')) as s
                ) as SlideImgList,
                (
                    select json_arrayagg(concat('http://15.165.205.38:9000/', d.descCol))
                    from json_table(p.desc_image, '$[*]' columns(descCol varchar(100) path '$')) as d
                ) as descImgList

            from product p
            where p.pid = ?;
        `;

    const [result] = await db.execute(sql, [pid]);
    return result[0];
}

/************************ 
    위시리스트 추가
**************************/
export const setWishList = async ({ id, wishList }) => {
    const sql = `UPDATE customer SET wish = ? WHERE id = ?`;
    const values = [JSON.stringify(wishList), id]; // 
    const [result] = await db.execute(sql, values);
    return result.affectedRows;
};
/************************ 
    위시리스트 불러오기
**************************/
export const getWishList = async ({ id }) => {
    const sql = `SELECT wish FROM customer WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);

    const wish = rows[0]?.wish;

    // null, "null", 빈 문자열 처리
    if (!wish || wish === "null" || wish === "") {
        return JSON.stringify([]);
    }
    return typeof wish === "string" ? wish : JSON.stringify(wish);
};

/************************ 
    리뷰 불러오기
**************************/
export const getReview = async (pid) => {
    const sql = `
        SELECT 
        rid,
        id,
        subject,
        text,
        review_image,
        DATE_FORMAT(rdate, '%Y-%m-%d %H:%i:%s') AS rdate
        FROM review
        WHERE pid = ?
        ORDER BY rdate ASC;
    `;
    const [result] = await db.execute(sql, [pid]);
    return result;
};

/************************ 
    리뷰 Form 업로드
**************************/
export const reviewUp = async (formData) => {
    const sql = `
        insert into review(id, pid, subject, text, review_image, org_review_img, view_count, rdate)
             values(?, ?, ?, ?, ?, ?, ?, now())
    `;
    const values = [
        formData.id,
        formData.pid,
        formData.reviewSubject,
        formData.reviewContent,
        JSON.stringify(formData.uploadFileName || []),
        JSON.stringify(formData.orgFileName || []),
        0
    ];

    const [result] = await db.execute(sql, values);
    return { "result_rows": result.affectedRows };
}
/************************ 
    리뷰 삭제
**************************/
export const DeleteReview = async ({ pid, id }) => {
    const sql = `DELETE FROM review WHERE pid = ? AND id = ?`;
    const [result] = await db.execute(sql, [pid, id]);
    return result;
};

/************************ 
    서브 카테고리 아이템 호출
**************************/
export const getSUbCateItems = async (category) => {
    const id = category.category;

    const sql = `
    SELECT pid, pname, sub_category_id, price, discount_rate,
            CONCAT('http://15.165.205.38:9000/', main_image->>'$[0]') AS image,
            main_image, pdate
    FROM product
    WHERE sub_category_id = ?
    `;

    const [result] = await db.execute(sql, [id]);
    return result;
}