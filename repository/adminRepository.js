import {db} from './db.js';

export const registerProduct = async(formData) => {    
      console.log(formData.upload_file);
      console.log(formData.upload_file[0]);
      
    const sql = `
                 insert into product(
                    category_id, 
                    sub_category_id,
                     pname,
                     price, 
                       discount_rate,
                         main_image,
                         main_origin_image,
                        slide_image, 
                        slide_origin_image,                        
                         pdate  
                          )
                          values(?,?,?,?,?,json_array(?),json_array(?),?,?,now())                     
                `;
    const values = [
        formData.category,
        formData.sub_category,
        formData.productName,
        formData.productPrice || 0,
        formData.sale,
        formData.upload_file[0]  || null,
        formData.source_file[0] || null,
        formData.upload_file  || null,
        formData.source_file  || null,
    ];
    
    const [result] = await db.execute(sql,values);   
    return {"result_rows":result.affectedRows};
}


export const registerProductDesc = async(formData) => {   
  const sql = `
   update product    
         set desc_image = ? , 
         desc_origin_image = ?
            where pid = ?
              `;
  const [result] = await db.execute(sql,[formData.upload_file,formData.source_file,formData.pid]);
  return {"result_rows":result.affectedRows};
}


export const getLastPid = async() => {   
  const sql = `
 select * from product order by pid desc limit 1;
              `;
  const [result] = await db.execute(sql);
  // console.log('dddd',result[0].pid);
  
  return {"lastPid":result[0].pid};
}