import multer from 'multer';
import path from 'path';
import fs from 'fs'; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_files/')  //이미지 저장할 경로 설정
    },  filename: function (req, file, cb) {        
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1e9);    
          cb(null, uniqueSuffix + '-' + file.originalname); 
    }
  })

const fupload = multer({storage:storage}).single('file');  

// 서버에 이미지 저장
export const fileUpload = (req,res) => {
    fupload (req,res,(err) => {
        if(err) {
            console.log(err);            
        } else {
            const oldFile = req.body.oldFile;
          if(oldFile){
            const oldFilePath = path.join('upload_files/',oldFile);
            if(fs.existsSync(oldFilePath)){
              try{
                fs.unlinkSync(oldFilePath);
              }catch(error){
                console.error('이전파일 삭제실패',error);
              }
            }
          }
            res.json({ 
                "uploadFileName" : res.req.file.path,  
                 "sourceFileName" : req.file.originalname, 
                  "oldFile": res.req.file.filename 
                   }); 
        }
    });
}