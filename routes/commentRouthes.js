const express = require('express');
const CommentRouthes = express.Router();
const {ensureAuthication} = require('../middlewares/authMid') ;
const { addComment, editComment, updateComment, deleteComment } = require('../controllers/commentController');

CommentRouthes.post('/posts/:id/comments',ensureAuthication,addComment);
CommentRouthes.get('/comments/:id/edit', editComment)
CommentRouthes.put('/comments/:id/',ensureAuthication, updateComment)
CommentRouthes.delete('/comments/:id/',ensureAuthication, deleteComment)



module.exports=CommentRouthes; 