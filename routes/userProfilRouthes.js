const express = require('express')
const proflieRoutes = express.Router();
const {getUserProflie, updateProfile, updateProfileForm, deleUserAccount} = require("../controllers/userController")
const {ensureAuthication} = require('../middlewares/authMid') ;
const upload=require('../config/multr')

proflieRoutes.get('/profile',ensureAuthication,getUserProflie);
proflieRoutes.get('/edit',ensureAuthication,updateProfileForm);
proflieRoutes.post('/profile',ensureAuthication,upload.single('profileimage'),updateProfile)
proflieRoutes.post('/delete',ensureAuthication,deleUserAccount)


module.exports=proflieRoutes