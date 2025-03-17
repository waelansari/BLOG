const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        url:{
            type:String,
           
        },
        public_id:{
            type:String,
         
        },
    },
    bio:{
        type:String
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],  
},
{timestamps:true,})

const User=mongoose.model('User',userSchema);

module.exports=User