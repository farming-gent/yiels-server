const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var siloSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    logo:{
        type:String,
        required:false,
    },
    sonicXp:{
        type:Number,
        required:true,
    },
    borrowAPR:{
        type:String,
        required:false,
    },
    depositAPR:{
        type:String,
        required:false,
    },
    utilization:{
        type:Number,
        required:false,
    },
    maxLTV:{
        type:String,
        required:false,
    },
    TVL:{
        type:String,
        required:false,
    },
    maxLT:{
        type:String,
        required:false,
    },
    liquadationFee:{
        type:String,
        required:false,
    },
    contractAddress:{
        type:String,
        required:false,
    },
    siloAddress:{
        type:String,
        required:false,
        unique : true
    },
    availableToBorrow:{
        type:String,
        required:false,
    },
});

//Export the model
module.exports = mongoose.model('Silo', siloSchema);