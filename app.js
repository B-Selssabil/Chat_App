const express = require('express')
const http = require('http')
const layoutExpress = require('express-ejs-layouts')
const socketio = require('socket.io')
const mongoose = require('mongoose');
var message = require('./models/message');
const router = require('./routes/index')
const moment = require('moment')
const URL = "mongodb://0.0.0.0:27017/AppData";


const app = express()
app.set('view engine', 'ejs');
app.use(layoutExpress)


//Connecting data base
mongoose.connect(URL, {useNewUrlParser:true});
const con = mongoose.connection
con.on('open', ()=>{

    console.log('Database connected ..');

})

app.use(express.urlencoded({extended:false}));

app.use('/', router);


const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket=>{

    socket.emit('message', 'Welcome to our chat');

    socket.on('message2', data=>[

        socket.broadcast.emit('message', data + ' has joined the chat')

    ])

    socket.on('disconnect', data=>{

        io.emit('message', 'A user has  left the chat');

    })

    socket.on('new_message', data=>{
        const newMsg = new message({room : currentRoom , message: data.msg, sender:data.sender, time:moment().format() });
        newMsg.save();
        io.emit('new_message',data)

    })


})

server.listen(3000, (req,res)=>{

    console.log('Server running ...');

})

