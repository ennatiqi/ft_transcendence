
export default class Home extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/home.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("home-page", Home);
