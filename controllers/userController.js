const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const User = require('../models/User');
const { use } = require('passport');
const cloudinary = require('../config/cloudinaryConfg');
const File = require('../models/file');
const Comment = require('../models/comment');




exports.getUserProflie=asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.user._id).select('-password');

    if(!user){
        return res.render('login',{
            title:'Login',
            user:req.user,
            error:'User not found'
        })

    }
    const posts = await Post.find({author:req.user._id}).sort({
        createdAt:-1
    })
    
    
    res.render('profile',{
        title:'Profile',
        user,
        posts,
        error:'',
        postCount:posts.length,
        sucess:'',

    })

})

exports.updateProfileForm=asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    if(!user){
        return res.render('login',{
            title:'Login',
            user:req.user,
            error:'User not found'

        })

    }
    res.render('editProfile',{
        ttile:'Edit Profile',
        user,
        error:'',
        success:''
    })
    
})

exports.updateProfile=asyncHandler(async (req,res) => {
    const {username,email,bio} =req.body;
    const user = await User.findById(req.user._id).select('-password');
    if(!user){
        return res.render('login',{
            title:'Login',
            user:req.user,
            error:'User not found'
        })

    }
    user.username=username||user.username;
    user.email=email||user.email;
    user.bio=bio||user.bio;
    await user.save();
    if(req.file){
        if(user.profilePicture && user.profilePicture.public_id){
            await cloudinary.uploader.destroy(user.profilePicture.public_id);
        }
        const file = await File ({
            url:req.file.path,
            piblic_id:req.file.filename,
            uploadBy:req.user._id,
        })
        await file.save();
        user.profilePicture = {
            url:file.url,
            public_id:file.piblic_id,
        };
        await user.save();
        
        res.render('editProfile',{
            title:"Edit Profile",
            user,
            error:'',
            sucess:'Profile Updated Sucessfully'
        })
    
    }else{
        return res.render('editprofile',{
            title:"Edit Profile",
            user,
            error:'',
            sucess:'Profile Updated Sucessfully'
        })
    }
    
    
})

exports.deleUserAccount=asyncHandler(async (req,res) => {
    const user= await User.findById(req.user._id);
    if(!user){
        return res.render('login',{
            title:'Login',
            user:req.user,
            error:'User not found'
        })  
}
if(user.profilePicture && user.profilePicture.public_id){
    await cloudinary.uploader.destroy(user.profilePicture.public_id);
}

const posts = await Post.find({author:req.user._id});
for(const post of  posts){
    for(const image of post.images){
        await cloudinary.uploader.destroy(image.public_id);
    }
    await Comment.deleteMany({post:post._id});
    await post.findByIdAndDelete(post._id)
    }
    await Comment.deleteMany({author:req.user._id});
    const files = await File.find({uploadBy:req.user._id});
    for(const file of files ){
        await cloudinary.uploader.destroy(file.piblic_id);
    }
    await User.findByIdAndDelete(req.user._id);
    res.redirect('/auth/register')
    }

)

