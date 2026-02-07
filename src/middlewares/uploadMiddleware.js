import multer from "multer";
import path from "path";

// save path and file name setting
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    // create uniq name for avoid from duplicating image name
    const ext = path.extname(file.originalname);
    const uniqueName = `post-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

// filter: just image allowed
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
