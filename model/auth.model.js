const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    userName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    otp : {
        type : String
    },

    otpExpires : {
        type : Date,
    },

    isDelete : {
        type : Boolean,
        default : false
    }

});

module.exports = mongoose.model('user',userSchema);