const mongoose = require('mongoose');
let projectSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true   
    },
    projectLanguage:{
        type:String,
        required:true,
        Enum:['JavaScript','Python','Java','C++','Ruby','Go','PHP','C#','TypeScript']
    },
    code:{
        type:String,
        required:true,
        

    },
    date:{
        type:Date,
        default:Date.now    
    },
    createdBy:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('Project',projectSchema);  
  
