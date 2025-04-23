import * as repository from '../repository/productRepository.js'
import multer from 'multer';
import fs from 'fs';
import path from 'path';
/************************ 
    전체상품 리스트 조회
**************************/
export const getList = async(req, res) => {
    const category_id = req.body.category_id;
    const result = await repository.getList(category_id);
    res.json(result);
    res.end();
}
/************************ 
    상품 상세 정보 조회
**************************/
export const getProduct = async(req, res) => {
    const result = await repository.getProduct(req.body.pid);
    res.json(result);                                       
    res.end();
}; 

/************************ 
    위시리스트 추가
**************************/
export const setWishList = async(req, res) => {
    const result = await repository.setWishList(req.body);
    res.json(result);                                       
    res.end();
}; 

/************************ 
    위시리스트 가져오기
**************************/
export const getWishList = async(req, res) => {
    const result = await repository.getWishList(req.body);
    res.json(result);                                       
    res.end();
}; 

/************************ 
    리뷰 Form 업로드
**************************/
export const reviewUp = async(req, res) => {    
    const result = await repository.reviewUp(req.body);
    res.json(result);                                       
    res.end();
}; 

/************************ 
    리뷰 불러오기 
**************************/
export const getReview = async (req, res) => {
    const result = await repository.getReview(req.body.pid);
    res.json(result);
    res.end();
};

/************************ 
    리뷰 사진 업로드
**************************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload_review_photos/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e4)
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
})


export const reviewPhotosUp = (req, res) => {
    const maxFiles = parseInt(req.query.maxFiles);
    const upload = multer({ storage: storage }).array("files", maxFiles);

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            const oldFileArray = req.body.oldFile.split(',');

            //이전파일 있을 때 삭제
            for (const oldFile of oldFileArray) {
                if (oldFile) {
                    //oldFile 존재 시 업로드 폴더에서 삭제
                    const oldFilePath = path.join("upload_review_photos/", oldFile);
                    if (fs.existsSync(oldFilePath)) {
                        try {
                            fs.unlinkSync(oldFilePath);
                            console.log('이전 파일 삭제 완료', oldFilePath);
                        } catch (error) {
                            console.log(' 이전 파일 삭제 실패', error);
                        }
                    }
                } // if
            }  // for

            // req => 배열로 만들기
            let uploadFileName = []
            let sourceFileName = []
            let oldFile = []

            //req.files 배열의 파일 정보
            for (const file of req.files) {
                uploadFileName.push(file.filename);;
                sourceFileName.push(file.originalname);
                oldFile.push(file.filename)
            }

            res.json({
                "uploadFileName": uploadFileName,
                "sourceFileName": sourceFileName,
                "oldFile": oldFile
            });
        }
    });
}

/************************ 
    리뷰 삭제
**************************/
export const DeleteReview = async (req, res) => {
    const result = await repository.DeleteReview(req.body);
    res.json(result);
    res.end();
};

/************************ 
    서브 카테고리 아이템 호출
**************************/
export const getSUbCateItems = async(req, res) => {
    const result = await repository.getSUbCateItems(req.body);
    res.json(result);
    res.end();
}