const io = require('socket.io')(8000,{
    cors:{
        origin : '*',
        methods:["GET","POST"]
    }
});

const users = {};

io.on('connection',function(socket){
    socket.on('new-user-joined',function(name){
        // console.log("New User",name); 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    });

    socket.on('send',function(message){
        socket.broadcast.emit('recieve',{message : message, user : users[socket.id]})
    });

    socket.on('disconnect', function(message){
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})