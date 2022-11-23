const mongoose = require('mongoose');
const express = require('express');

const messageSchema = mongoose.Schema({

    sender :{

        type:String,
        required:true
    },
    message:{
 
        type:String,
        required:true

    },
    time:{
        type:Date,
        required:false
    },
    room:{
        type:String,
        required:true
    }

})



const msg = mongoose.model('Message', messageSchema);
module.exports = msg;
