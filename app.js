require('dotenv').config();
const express = require('express');
const app=express();
const mongoose = require('mongoose');
const methodOverwrite = require('method-override');
const User =require('./models/User')
const userRoutes = require('./routes/authRouthes');
const passportConfig = require('./config/passport');
const passport = require("passport");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const { title } = require('process');
const postRouthes = require('./routes/postRouthes');
const errorHandler = require('./middlewares/errorHandleMid');
const CommentRouthes = require('./routes/commentRouthes');
const proflieRoutes=require('./routes/userProfilRouthes')


const PORT = process.env.PORT||3000;
app.use(express.urlencoded({extended:true}))

app.use(
    session({
        secret:'keybord cat',
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({mongoUrl:process.env.MongodbURL})
    })
)

passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverwrite('_method'))



app.set('view engine','ejs')

// routes
app.use('/auth',userRoutes);
app.use('/user',proflieRoutes)
app.use('/posts',postRouthes)
app.use('/',CommentRouthes)
app.use(errorHandler)

// fKlfubi3pBdXio9i

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Home',
        err:'',
        user:req.user
    })
})

mongoose.connect(process.env.MongodbURL)
.then(()=>{
    console.log('DB conneted')
    app.listen(PORT,console.log(`server is runing of ${PORT}`));
}).catch((error)=>{
    console.log(`Database connnetion failed ${error}`);
    
})

