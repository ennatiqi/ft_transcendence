

export default class Dash extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/dash.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("dash-page", Dash);
