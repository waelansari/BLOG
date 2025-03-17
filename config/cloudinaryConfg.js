require('dotenv').config()
const cloudinary= require('cloudinary').v2;

// module.exports  = cloudinary.config({
//     cloud_name:process.env.Cloudinary_Name,
//     api_key:process.env.Cloudinary_Api_Key,
//     api_secret:process.env.Cloudinary_Secret,
// })
cloudinary.config({
    cloud_name:process.env.Cloudinary_Name,
    api_key:process.env.Cloudinary_Api_Key,
    api_secret:process.env.Cloudinary_Secret,
})
module.exports= cloudinary