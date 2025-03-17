
import User from "../models/User.js";
import  Dhash from  'bcryptjs'
import passport from "passport";
import asyncHandler from "express-async-handler";

export const getlogin = asyncHandler((req,res)=>{
  res.render('login',{
    title:'Login',
    user:req.user,
    error:''
  })
})

export const login=asyncHandler(async(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err){
      return next(err)
    }
    if(!user){
      return res.render('login',{
        title:'login',
        user:req.user,
        error:info.message
      })
    }
    req.login(user,(err)=>{
      if(err){
        return next(err)
      }
      return res.redirect('/user/profile');
    })
    
  })(req,res,next)
  })

export const getRegister= asyncHandler((req,res)=>{
    
  res.render('register',
    {
      title:'Register',
      user:req.user,
      error:'',
    })
  
})
export const register=asyncHandler(async(req,res)=>{
  const {username,email,password}=req.body;
 
  try {
    const user=await User.findOne({email})
    console.log(user);
    
    if(user){
      return res.render('register',{
      title: 'Register',
      user:req.user,
      error:'User already exists',
     })      
    }else{
      const hashPassword  = await Dhash.hash(password,10)
      const newUser= new User({username,email,password:hashPassword})
      const userdata =await newUser.save();
     
      res.redirect('/auth/login')
    }
 
  } catch (error) {
    res.render('register',{
      title: 'Register',
      user:req.user,
      error:error.message,
     })
     
     
  } 
 })
export const logout =asyncHandler( (req,res,next)=>{
  res.clearCookie('connect.sid')
  req.logout((err)=>{
    if(err){
      return next(err)
      }
    res.redirect('/auth/login')
    })
    
  })

