import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as repository from '../repository/adminRepository.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload_files/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
})

export const fileUploadMultiple = (req, res) => {
  const maxFiles = parseInt(req.query.maxFiles);
  const fupload = multer({ storage: storage }).array('files', maxFiles);

  fupload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const oldFileArray = req.body.oldFiles.split(",");

      for (const oldFile of oldFileArray) {
        if (oldFile) {
          const oldFilePath = path.join('upload_files/', oldFile);
          if (fs.existsSync(oldFilePath)) {
            try {
              fs.unlinkSync(oldFilePath);
            } catch (error) {
              console.error('이전파일 삭제실패', error);
            }
          }
        } // if문 end
      }  //for 문 end
      let uploadFileName = [];
      let sourceFileName = [];
      let oldFile = [];

      for (const file of req.files) {
        // 웹에서 사용 가능한 경로로 통일
        const webPath = 'upload_files/' + file.filename; // 경로 통일
        uploadFileName.push(webPath); // ex: upload_files/1743747265618-945236041-ad1.jpeg
        sourceFileName.push(file.originalname);
        oldFile.push(file.filename);
      }

      res.json({
        uploadFileName: uploadFileName,
        sourceFileName: sourceFileName,
        oldFile: oldFile
      });
    }
  });
}


export const getLastPid = async (req, res) => {
  const result = await repository.getLastPid(req.body);
  res.json(result)
  res.end();
};


