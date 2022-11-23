
const chat = document.getElementById('chat-form');

const msg = $("#msg");

const socket = io();

socket.on('message', (data)=>{

    console.log("We recived ", data)

})



socket.on('new_message', data=>{

    msg.append('<p>'+ data + '<p/>');


})




chat.addEventListener('submit', e=>{
 
     e.preventDefault();
     const msg = e.target.elements.message.value;
     console.log(msg)
     socket.emit('new_message', msg);
    
})
