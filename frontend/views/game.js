


export default class Game extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('views/game.html')
            .then(response => response.text())
            .then(data => {
                this.innerHTML = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

customElements.define("game-page", Game);
