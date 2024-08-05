var messages = document.querySelector('.messages-content');
var d, h, m, i = 0;
var myuser;
var userdata;
let mydata;
fetch('http://localhost:8000/main/data/',{
    method:"get",
    credentials:"include"
})
.then(response => response.json())
.then(data => {
    mydata = data;
})

var usersDisplay = document.querySelector(".users-display");

var users = [];

var searchInput = document.querySelector('.search');
var originalUsers = [];

searchInput.addEventListener('input', function() {
    while (usersDisplay.firstChild) {
        usersDisplay.removeChild(usersDisplay.firstChild);
    }

    if (searchInput.value) {
        users = originalUsers.filter(function(user) {
            return user.name.startsWith(searchInput.value);
        });
    } else {
        users = [...originalUsers];
    }

    users.forEach(function(user) {
        var userComponent = createUserComponent(user);
        
        usersDisplay.appendChild(userComponent);
    });
});








fetch('http://localhost:8000/chat/users/')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    data.forEach(user => {
        if (user.id != mydata.id)
            originalUsers.push(user);
    });
    users = [...originalUsers];
    users.forEach(function(user) {
        var userComponent = createUserComponent(user);


        fetch(`http://localhost:8000/chat/chat/?myId=${mydata.id}&clickedId=${users[0].id}`)
        .then(response => response.json())
        .then(data => {
            var messagesContent = document.querySelector('.messages-content');
            data.forEach(message => {
                var newMessage = document.createElement('div');
                newMessage.textContent = message.content;
                            
                if (message.sender === mydata.id) {
                    newMessage.classList.add('message', 'my-messages', 'new');
                } else {
                    newMessage.classList.add('message', 'your-messages', 'new');
                }

                messagesContent.appendChild(newMessage);

                insertTime(message.time)
                
            });
            messagesContent.scrollTop = messagesContent.scrollHeight;
    
        });


        userComponent.addEventListener('click', function() {
            userdata = user.id;
            fetch(`http://localhost:8000/chat/chat/?myId=${mydata.id}&clickedId=${userdata}`)
            .then(response => response.json())
            .then(data => {
                var messagesContent = document.querySelector('.messages-content');
                data.forEach(message => {
                    var newMessage = document.createElement('div');
                    newMessage.textContent = message.content;
                                
                    if (message.sender === mydata.id) {
                        newMessage.classList.add('message', 'my-messages', 'new');
                    } else {
                        newMessage.classList.add('message', 'your-messages', 'new');
                    }

                    messagesContent.appendChild(newMessage);

                    insertTime(message.time)
                    
                });
                messagesContent.scrollTop = messagesContent.scrollHeight;
        
    });
        });
        
        usersDisplay.appendChild(userComponent);
    });
})
.catch(error => {
    console.log('There was a problem with the fetch operation: ' + error.message);
});

var usersDisplay = document.querySelector('.users-display');
var searchDiv = document.getElementById('search');

// usersDisplay.addEventListener('scroll', function() {
    // if (usersDisplay.scrollTop === 0) {
        searchDiv.style.display = 'flex';
    // } else {
    //     searchDiv.style.display = 'none';
    // }
// });


function insertMessage() {
    var container = document.querySelector('.message-input');
    console.log(container.value);
    var newMessage = document.createElement('div');
    newMessage.innerHTML = container.value;


    let url = 'http://localhost:8000/chat/chat/';

    let data = {
        sender: mydata.id,
        receiver: userdata,
        content: container.value,
        time: new Date().toISOString()
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    newMessage.classList.add('message', 'my-messages', 'new');
    if (messages && newMessage && container.value) {
        messages.appendChild(newMessage);
    }
    insertTime(new Date());

    var chatBox = document.querySelector('.messages-content');
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.querySelector('.message-submit').addEventListener('click', function() {
    insertMessage();
    document.querySelector('.message-input').value = '';

});

document.querySelector('.message-submit').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
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
    var userslist = document.querySelectorAll('.user');
    if(userslist.length > 0) {
        userslist[0].classList.add('activeuser');
    }
    userDiv.addEventListener('click', function() {
        responcivefun();
        

        if (this.classList.contains('activeuser')) {
            return;
        }
        var messagesContent = document.querySelector('.messages-content');

        while (messagesContent.firstChild) {
            messagesContent.removeChild(messagesContent.firstChild);
        }


        var userslist = document.querySelectorAll('.user');
        userslist.forEach(function(user) {
            user.classList.remove('activeuser');
        });

        this.classList.add('activeuser');

    });

    
    var img = document.createElement("img");
    img.src = "../images/users/happy-1.svg";
    img.alt = "";
    userDiv.appendChild(img);

    // var userStatusDiv = document.createElement("div");
    // userStatusDiv.className = "user-status active";
    // userDiv.appendChild(userStatusDiv);


    //todo check if user in gane or not
    var userInGameDiv = document.createElement("div");
    userInGameDiv.className = "user-ingame active";
    var p = document.createElement("p");
    p.textContent = "in Game";
    userInGameDiv.appendChild(p);
    userDiv.appendChild(userInGameDiv);


    var usernameDiv = document.createElement("div");
    usernameDiv.className = "username";
    var h1 = document.createElement("h1");
    h1.textContent = user.name;
    usernameDiv.appendChild(h1);
    var p = document.createElement("p");
    p.textContent = "+2 new messages";
    usernameDiv.appendChild(p);
    userDiv.appendChild(usernameDiv);

    return userDiv;
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
