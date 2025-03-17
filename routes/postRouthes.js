const express=require('express');
const { getPostFrom, Addpost, getposts, getpostDetails, getEditeFrom, updatePost, deletePost } = require('../controllers/postControllers');
const { model } = require('mongoose');
const postRouthes=express.Router();
const upload = require('../config/multr')
const { ensureAuthication } = require('../middlewares/authMid');
const e = require('method-override');

postRouthes.get('/add',getPostFrom)
postRouthes.post('/add',ensureAuthication,upload.array("image",5),Addpost)
postRouthes.get('/',getposts);
postRouthes.get('/:id',getpostDetails);
postRouthes.get('/:id/edit',getEditeFrom);
postRouthes.put('/:id',ensureAuthication,upload.array("image",5),updatePost);
postRouthes.delete('/:id',ensureAuthication,deletePost)


module.exports=postRouthes