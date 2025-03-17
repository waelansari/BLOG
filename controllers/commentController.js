const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const Comment = require('../models/comment');


exports.addComment=asyncHandler(async(req,res)=>{
    const {content} = req.body;
    const post =await Post.findById(req.params.id);

    if(!post){
        return req.render('postDetails',{
            title:'Post',
            post,
            user:req.user,
            error:'Post not found',
            sucess:'',
        })
    }
    if(!content){
        return req.render('postDetails',{
            title:'Post',
            post,
            user:req.user,
            error:'Comment connot be empty',
            sucess:'',
        })
    }
    const comment = new Comment(
       {
        content,
        post:req.params.id,
        author:req.user.id,
        select:'username'
       } 
    )
    await comment.save();
    post.comment.push(comment._id);
    await post.save();
    res.redirect(`/posts/${req.params.id}`);

    })

exports.editComment=asyncHandler(async(req,res)=>{
    const comment= await Comment.findById(req.params.id);
    if(!comment){
        return res.render('postById',{
            title:'Post',
            comment,
            user:req.user,
            error:'Post not fount',
            success:""
        })}
    res.render('editComment',{
        title:'comment',
        comment,
        user:req.user,
        error:'',
        success:'',
    })
})

exports.updateComment=asyncHandler(async(req,res)=>{
    const {content}= req.body;
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        return res.render('postById',{
            title:'Post',
            comment,
            user:req.user,
            error:'comment not fount',
            success:""
        })}
    if(comment.author.toString()!==req.user._id.toString()){
        return res.render('postById',{
            title:'Post',
            comment,
            user:req.user,
            error:'your not authemticated to edit this post',
            success:""})
    
        }

    comment.content = content || comment.content;
    await comment.save();
    res.redirect(`/posts/${comment.post}`);

})
exports.deleteComment=asyncHandler(async (req,res) => {
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        return res.render('postById',{
            title:'Post',
            comment,
            user:req.user,
            error:'comment not fount',
            success:""
        })}
    if(comment.author.toString()!==req.user._id.toString()){
        return res.render('postById',{
            title:'Post',
            comment,
            user:req.user,
            error:'your not authemticated to edit this post',
            success:""})
    
        }
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/posts/${comment.post}`)

})