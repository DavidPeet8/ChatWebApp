//client

//TODO
// scrolling past messages window
// some method of different rooms and room keys
// room Authentication and passwords 
// reusal of rooms?
// scale for mobile

let socket = io.connect();
let messageForm = document.getElementById('messageForm');
let message = document.getElementById('message');
let chat = document.getElementById('pastMessages');

let userForm = document.getElementById('userForm');
let username = document.getElementById('username');
let signInArea = document.getElementById('signIn');
let loggedInArea = document.getElementById('loggedIn');
let name;

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('sendMessage', message.value, name);
    message.value = "";
    console.log('Submitted');
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    name = username.value;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    socket.emit('userGiven', name);
    username.value = "";
    console.log('Submitted Name');
});

socket.on('newMessage', (data) => {
    li = document.createElement('li');
    li.appendChild(document.createTextNode(data.usr + " :  " + data.msg));
    chat.appendChild(li);
});

socket.on('badUser', (data) => {
    console.log('bad user :(');
    document.getElementById('badUser').style.display = 'grid';
    document.getElementById('signIn').style.display = 'grid';
    document.getElementById('loggedIn').style.display = 'none';
    setTimeout(() => {
        document.getElementById('badUser').style.display = 'none';
    }, 3000); // performs function after 3s
});

socket.on('goodUser', () => {
    console.log('good user :)');
    document.getElementById('badUser').style.display = 'none';
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('loggedIn').style.display = 'grid';
});

socket.on('newUser', (arUsers) => {
    for (let i in arUsers) {
        li = document.createElement('li');
        li.appendChild(document.createTextNode(arUsers[i]));
        ul = document.getElementById('users');
        ul.appendChild(li);
    }
})

