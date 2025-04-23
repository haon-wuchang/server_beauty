/*
    1. DB 연동 라이브러리 호출(mysql2) => DB서버주소, USER , PASSWORD, PORT 
*/
import mysql from 'mysql2';


const pool = mysql.createPool({
    host: 'shoppy-redux.ct6mky2ksrs7.ap-northeast-2.rds.amazonaws.com', 
    port: 3306,
    user: 'admin', // mysql 설치시 준 이름 
    password: 'swamp213!!',
    database: 'beautydb',
    })


export const db = pool.promise();