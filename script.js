const socket = io('http://localhost:8000');

const messageInput = document.getElementById('messageInput');
const form = document.getElementById('send-container');
const messageContainer = document.querySelector('.container');

const userName = prompt("Enter your name to join"); 
var audio  = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

socket.emit('new-user-joined', userName);

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right');
});

socket.on('recieve',(data) => {
    append(`${data.user} : ${data.message}`,'left')
})

socket.on('left',(name) => {
    append(`${name} left the chat`,'right')
})

