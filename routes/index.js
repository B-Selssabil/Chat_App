const express = require('express')
const message = require('../models/message')
const router = express.Router()

global.currentRoom;


router.get('/', (req,res) => {

    res.render('welcome')

})

router.get('/home/:id', (req,res) => {

    if(req.params.id != 'chat.js'){
        var temp =  req.params.id.split(' ');
        var username = temp[0];
        currentRoom = temp[1];

       

        var messages = message.find({'room': currentRoom})
        .then(r=>{

            res.render('home', {'username': username, 'room':currentRoom, 'messages':r});

        })


    }

})

router.post('/welcome', (req,res) => {

    const user = req.body.username;
    const room = req.body.room;
    const url = 'home/' + user +' '+room
    res.redirect(url);

})



module.exports = router
