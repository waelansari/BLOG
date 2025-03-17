
const { model } = require('mongoose')
const  cloudinary  = require('../config/cloudinaryConfg')

const File = require('../models/file')
const Post = require('../models/post')
const { post } = require('../routes/authRouthes')
const { login } = require('./authControllers')
const asyncHandler = require('express-async-handler')

exports.getPostFrom=asyncHandler(async(req,res) => {
    res.render('newPost',{
        title:'Create Post',
        user:req.user,
        error:'',
        success:'',
    })
})
 
exports.Addpost=asyncHandler(async (req,res) => {
    const {title,content} =req.body;

   
    const images = await Promise.all(
        req.files.map(async (file) => {
            const newfile=new File({
                url:file.path,
                piblic_id:file.filename,
                uploadBy:req.user._id,
            })
            await newfile.save();
            return{
                url:newfile.url,
                public_id:newfile.piblic_id
            }
        })
       )

    
    
    const newpost = new Post({
        title,
        content,
        author:req.user._id,
        images,
    })
    await newpost.save();
    res.render('newPost',{
        title:'Create Post',
        user:req.user,
        success:'post created successfully',
        error:''
    })
})

exports.getposts=asyncHandler(async(req,res)=>{
  
    const posts = await Post.find().populate('author', 'username profilepicture');

    
    res.render('post',{
            title:'posts',
            posts,
            user:req.user,
            success:'',
            error:""
        })

   
})
exports.getpostDetails=asyncHandler(async(req,res)=>{
  
    const posts = await Post.findById(req.params.id).populate('author','username').populate({
        path:'comment',
        populate:{
            path:'author',
            model:'User'
        }
    });

    res.render('postById',{
            title:'post',
            posts,
            user:req.user,
            success:'',
            error:""
        })

   
})

exports.getEditeFrom = asyncHandler(async(req,res)=>{
 const posts = await Post.findById(req.params.id);
if(!post){
    return res.render('postById',{
        title:'post',
        posts,
        use:req.user,
        error:'Post not found',
        success:"",
    })
}

 res.render('editPost',{
    title:'Edit Post',
    posts,
    user:req.user,
    error:'',
    success:'',
 })

})

exports.updatePost=asyncHandler(async(req,res)=>{
    const {title,content} = req.body;
    const posts =await Post.findById(req.params.id);
    if(!posts){
        return res.render('postById',{
            title:'Post',
            posts,
            user:req.user,
            error:'Post not fount',
            success:""
        })
    }
    if(posts.author.toString()!==req.user._id.toString()){
        return res.render('postById',{
            title:'Post',
            posts,
            user:req.user,
            error:'your not authemticated to edit this post',
            success:""})

    }
    posts.title = title || posts.title;
    posts.content = content || posts.content;
    await posts.save()
    if(req.files){
        await Promise.all(
            posts.images.map(async(image)=>{
                await cloudinary.uploader.destroy(image.public_id)
            })
        )
    };
    posts.images = await Promise.all(
        req.files.map(async(file)=>{
            const newFile = new File({
                url:file.path,
                piblic_id:file.filename,
                uploadBy:req.user._id,
            })
            await newFile.save()
            return{
                url:newFile.url,
                public_id:newFile.piblic_id,
            }
        })
    ) 
    await posts.save();
    res.redirect(`/posts/${req.params.id}`);



})

exports.deletePost= asyncHandler(async (req,res) => {
    const posts = await Post.findById(req.params.id);
    if(!posts){
        return res.render('postById',{
            title:'Post',
            posts,
            user:req.user,
            error:'Post not fount',
            success:""
        })}
        if(posts.author.toString()!==req.user._id.toString()){
            return res.render('postById',{
                title:'Post',
                posts,
                user:req.user,
                error:'your not authemticated to edit this post',
                success:""})
    
        }
        if(req.files){
            await Promise.all(
                posts.images.map(async(image)=>{
                    await cloudinary.uploader.destroy(image.public_id)
                })
            )
        };
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
})
