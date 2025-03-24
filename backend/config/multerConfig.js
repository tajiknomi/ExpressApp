const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Define the allowed fields based on your schema
const allowedFields = [
    'nameOfApplicant', 'guardianName', 'cnic', 'dateOfBirth', 'religion', 'domicile', 'passportNo',
    'mailingAddress', 'permanentAddress', 'city', 'district', 'country', 'email', 'phoneNoRes', 'officeNo',
    'mobileNo', 'nextOfKinName', 'nextOfKinRelation', 'nextOfKinCnic', 'nextOfKinDateOfBirth', 'nextOfKinPassport',
    'plotSize', 'attachments'
  ];

// Set up multer for image uploading with file validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const cnic = req.body.cnic;
      if (!cnic) {
        return cb(new Error("CNIC is required"));
      } 
      const dir = path.join(__dirname, "../uploads", cnic); 
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          return cb(new Error("Error creating directory"));
        }
        cb(null, dir);
      });
    },
    filename: (req, file, cb) => {
      const cnic = req.body.cnic;
      if (!cnic) {
        return cb(new Error("CNIC is required"));
      }
      const randomString = crypto.randomBytes(9).toString('hex');
      const md5Hash = crypto.createHash('md5').update(randomString).digest('hex');
      const timestamp = Date.now();
      const fileExt = path.extname(file.originalname);
      const filename = `${cnic}_${timestamp}_${md5Hash}${fileExt}`;
      cb(null, filename);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // Limit file size to 20 MB
  });
  

module.exports = { allowedFields, upload };