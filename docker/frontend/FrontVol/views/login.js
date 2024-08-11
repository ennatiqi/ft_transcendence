
export default class Login extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('/views/login.html')
        .then(response => response.text())
        .then(data => {
            this.innerHTML = data;

            let script = document.createElement('script');
            script.src = '../script/login.js';
            document.body.appendChild(script);
        });
    }
}

customElements.define("login-page", Login);
