 const multer = require("multer");

 //1.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;


 //2.
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${Date.now()}-${originalname}`);
//   },
// });

// const upload = multer({ storage });


//3..
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, generateUniqueFileName(file)); // Generating unique filename
//   },
// });

// // Function to generate unique filename
// function generateUniqueFileName(file) {
// const fileN = `${Date.now()}-${file}`;
// return fileN
// console.log(fileN, 'fffff');

// }

// // Initialize Multer
// let upload
// const temp =()=>(
// upload = multer({
//   storage: storage,
// })
// )

// // Common function for handling image upload
// function uploadImage(req, res, next) {
//   upload.single("image")(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     next();
//   });
// }

// module.exports = temp;

