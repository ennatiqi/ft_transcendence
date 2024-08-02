
export default class Dashboard extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/dashboard.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("dashboard-page", Dashboard);
