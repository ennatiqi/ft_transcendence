export default class Login extends HTMLElement {
    constructor() {super()}

    connectedCallback() {
        fetch('views/login.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("login-page", Login);
