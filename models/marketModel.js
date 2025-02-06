const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var marketSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
      
    },
    protocolFee:{
        type:String,
        required:false,
    },
    deployerFee:{
        type:String,
        required:false,
    },
    deployerAddress:{
        type:String,
        required:false,
    },
    silo0:{
        type: mongoose.Schema.ObjectId,
         ref : "Silo",
        required:false,
        
    },
    silo1:{
        type: mongoose.Schema.ObjectId,
        ref : "Silo",
       required:false,
       
    },
});


module.exports = mongoose.model('Market', marketSchema);