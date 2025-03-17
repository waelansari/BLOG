const multer = require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const cloudinary =require('./cloudinaryConfg')

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'Blog-posts',
        allowedFormats:['jpg','png']
    }
});

const upload = multer({storage});
module.exports=upload;