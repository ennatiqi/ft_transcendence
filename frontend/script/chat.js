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