var messages = document.querySelector('.messages-content');
var d, h, m, i = 0;


function insertTime() {
    d = new Date();
    m = d.getMinutes();
    var timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = d.getHours() + ':' + m;
    var lastMessage = document.querySelector('.message:last-child');
    lastMessage.appendChild(timestamp);

}

var j = 0;

function insertMessage() {
    var container = document.querySelector('.message-input');
    var newMessage = document.createElement('div');
    newMessage.innerHTML = container.value;
    if (j % 2 == 0)
        newMessage.classList.add('message', 'your-messages', 'new');
    else
        newMessage.classList.add('message', 'my-messages', 'new');
    j++;
    if (messages && newMessage && container.value) {
        messages.appendChild(newMessage);
    }
    insertTime();

    var chatBox = document.querySelector('.messages-content');
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.querySelector('.message-submit').addEventListener('click', function() {
    insertMessage();
    document.querySelector('.message-input').value = '';

});

document.querySelector('.message-submit').addEventListener('keydown', function(e) {
    if (e.key === 13) { // If the key pressed was 'Enter' (Return key)
        insertMessage();
        document.querySelector('.message-input').value = '';
    }
});


function createUserComponent(user) {
    var userDiv = document.createElement("div");
    userDiv.className = "user";

    userDiv.addEventListener('click', function() {
        var users = document.querySelectorAll('.user');
        users.forEach(function(user) {
            user.classList.remove('activeuser');
        });
    
        this.classList.add('activeuser');
        // var textChat = document.getElementsByClassName('messages-content')[0];
        // textChat.textContent = 'asdfadsfdf'; // Replace with the content you want
    
        changeContent();
    });

    
    var img = document.createElement("img");
    img.src = "./images/users/happy-1.svg";
    img.alt = "";
    userDiv.appendChild(img);

    // var userStatusDiv = document.createElement("div");
    // userStatusDiv.className = "user-status active";
    // userDiv.appendChild(userStatusDiv);

    var userInGameDiv = document.createElement("div");
    userInGameDiv.className = "user-ingame active";
    var p = document.createElement("p");
    p.textContent = "in Game";
    userInGameDiv.appendChild(p);
    userDiv.appendChild(userInGameDiv);

    var usernameDiv = document.createElement("div");
    usernameDiv.className = "username";
    var h1 = document.createElement("h1");
    h1.textContent = user.username;
    usernameDiv.appendChild(h1);
    var p = document.createElement("p");
    p.textContent = user.newMessages + " new messages";
    usernameDiv.appendChild(p);
    userDiv.appendChild(usernameDiv);

    return userDiv;
}


var usersDisplay = document.querySelector(".users-display");

var users = [];

getUsers();

async function getUsers() {
    fetch('./script/user.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            users.push(user);
        });
        users.forEach(function(user) {
            var userComponent = createUserComponent(user);
            usersDisplay.appendChild(userComponent);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




// var users = [
    //     {username: "rachid", newMessages: 4},
    //     {username: "user", newMessages: 2},
    //     // Add more users here
    // ];

getMessages();

async function getMessages() {
    fetch('./script/chatdata.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}

async function changeContent()
{
    var textChat = document.getElementsByClassName('messages-content')[0];
    textChat.textContent = 'holla'; // Replace with the content you want
}