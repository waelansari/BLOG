const express = require('express')
const userRoutes = express.Router();
const {getlogin,login,getRegister,register, logout} = require('../controllers/authControllers')



userRoutes.get('/login',getlogin)

userRoutes.post('/login',login)

userRoutes.get('/register',getRegister)
userRoutes.post('/register',register)
userRoutes.get("/logout",logout)

module.exports=userRoutes