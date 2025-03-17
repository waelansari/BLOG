const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
       
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'post'
        
    },
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
  
    
},
{timestamps:true,})

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment