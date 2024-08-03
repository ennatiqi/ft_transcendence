var messages = document.querySelector('.messages-content');
var d, h, m, i = 0;

var username = "rachid";


var usersDisplay = document.querySelector('.users-display');
var searchDiv = document.getElementById('search');

usersDisplay.addEventListener('scroll', function() {
    if (usersDisplay.scrollTop === 0) {
        searchDiv.style.display = 'flex';
    } else {
        searchDiv.style.display = 'none';
    }
});

var j = 0;

function insertMessage() {
    var container = document.querySelector('.message-input');
    var newMessage = document.createElement('div');
    newMessage.innerHTML = container.value;

    //container insert it to databases here


    if (j % 2 == 0)
        newMessage.classList.add('message', 'your-messages', 'new');
    else
        newMessage.classList.add('message', 'my-messages', 'new');
    j++;
    if (messages && newMessage && container.value) {
        messages.appendChild(newMessage);
    }

    var chatBox = document.querySelector('.messages-content');
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.querySelector('.message-submit').addEventListener('click', function() {
    insertMessage();
    document.querySelector('.message-input').value = '';

});

document.querySelector('.message-submit').addEventListener('keydown', function(e) {
    if (e.key === 13) {
        insertMessage();
        document.querySelector('.message-input').value = '';
    }
});

function responcivefun(){
    var textChat = document.querySelector('.text-chat');
    var Chat = document.querySelector('.chat');
    if (window.matchMedia("(max-width: 375px)").matches) {
        textChat.style.display = 'flex';
        Chat.style.display = 'none';
        var userDiv = document.createElement("div");
        userDiv.className = "return";
        userDiv.addEventListener('click', function() {
            userDiv.removeChild(userDiv.firstChild);
            textChat.style.display = 'none';
            Chat.style.display = 'flex';
        });

        var img = document.createElement("img");
        img.src = "../images/backtochat2.svg";
        img.alt = "";
        userDiv.appendChild(img);

        var retur = document.querySelector(".text-chat");
        retur.prepend(userDiv);
    }
}

function createUserComponent(user) {
    var userDiv = document.createElement("div");
    userDiv.className = "user";

    userDiv.addEventListener('click', function() {
        responcivefun();
        

        if (this.classList.contains('activeuser')) {
            return;
        }
        var messagesContent = document.querySelector('.messages-content');

        // Remove all child elements
        while (messagesContent.firstChild) {
            messagesContent.removeChild(messagesContent.firstChild);
        }

        // Add new elements here

        var users = document.querySelectorAll('.user');
        users.forEach(function(user) {
            user.classList.remove('activeuser');
        });

        this.classList.add('activeuser');

        changeContent();
    });

    
    var img = document.createElement("img");
    img.src = "../images/users/happy-1.svg";
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
    fetch('../script/user.json')
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

async function changeContent()
{
    fetch('../script/chatdata.json')
    .then(response => response.json())
    .then(data => {
        var messagesContent = document.querySelector('.messages-content');
        data.forEach(message => {
            var newMessage = document.createElement('div');
            newMessage.textContent = message.content;

            if (message.sender === username) {
                newMessage.classList.add('message', 'my-messages', 'new');
            } else {
                newMessage.classList.add('message', 'your-messages', 'new');
            }

            messagesContent.appendChild(newMessage);

            insertTime(message.time)
            
        });
        messagesContent.scrollTop = messagesContent.scrollHeight;
        
    });
}


function insertTime(time) {

    var timestamp = document.createElement('div');
    timestamp.className = 'timestamp';

    var messageTime = new Date(time);
    var currentTime = new Date();

    var differenceInMinutes = (currentTime - messageTime) / (1000 * 60);

    if (differenceInMinutes < 1) {
        timestamp.textContent = "Just now";
    } else {
        timestamp.textContent = messageTime.toLocaleTimeString();
    }

    var lastMessage = document.querySelector('.message:last-child');
    lastMessage.appendChild(timestamp);

}