const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        
    },
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
  
    images:[{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        },
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],  
},
{timestamps:true,})

const Post=mongoose.model('Post',postschema);

module.exports=Post