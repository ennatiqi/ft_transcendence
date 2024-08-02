

export default class E404 extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/404.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("e404-page", E404);
