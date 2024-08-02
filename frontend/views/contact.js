

export default class Contact extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/contact.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("contact-page", Contact);
