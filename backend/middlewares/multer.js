import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb("Invalid image format!", false);
  }
  cb(null, true);
//   console.log(file);
};

const upload = multer({ storage, fileFilter });

export default upload;
