const mongoose=require('mongoose');

const fileSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true,
       
    },
    piblic_id:{
        type:String,
        required:true,
        
    },
    
    uploadBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
  
    
},
{timestamps:true,})

const File=mongoose.model('File',fileSchema);

module.exports=File