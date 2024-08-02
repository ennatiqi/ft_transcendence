

export default class Chat extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/chat.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("chat-page", Chat);
