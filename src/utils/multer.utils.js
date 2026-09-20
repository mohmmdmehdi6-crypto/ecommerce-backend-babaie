import multer from "multer";
import path from "path";

const productStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads/products");
  },

  filename: (request, file, callback) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now();

    callback(null, uniqueName + ext);
  },
});

const userStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "uploads/users");
  },

  filename: (request, file, callback) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now();

    callback(null, uniqueName + ext);
  },
});

const upload = multer({
  storage: productStorage,
});

const uploadUser = multer({
  storage: userStorage,
});

export { upload, uploadUser };
