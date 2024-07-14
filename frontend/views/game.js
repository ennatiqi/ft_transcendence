


export default class Game extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
        <head>
        <link rel="stylesheet" href="../style/game.css">
    </head>
    <body>
        <div class="parent">
            <div class="top-bar">
                <div class="user-1">
                        <img class="tb-user-1-logo" src="../images/users/happy-2.svg" alt="#"> 
                    <h2 class="user-1-name">Rachid</h2>
                </div>
                <div class="user-1-score"><h2>0</h2></div>
                <div class="time"><h2>01:53</h2></div>
                <div class="user-2-score"><h2>0</h2></div>
                <div class="user-2">
                    <h2 class="user-2-name">Aymane</h2>
                    <img class="tb-user-2-logo" src="../images/users/1_men.svg" alt="#">
                </div>
            </div>
            <div class="game-board">
                <div class="board">
                    <div class="left-racket"><img src="../images/racket.svg" alt=""></div>
                    <div class="middle-part">
                        <div class="start-game start-game-first"><h2>Start</h2></div>
                        <div class="game-over"><h2>Game-over</h2></div>
                        <div class="middle-line"><img src="../images/middle-line.svg" alt="#"></div>
                        <div class="start-game start-game-second"><h2>Game</h2></div>
                    </div>
                    <div class="right-racket"><img src="../images/racket.svg" alt=""></div>
                    <div class="ball"></div>
                </div>
            </div>
        <script src="../script/game.js"></script>
    </body>
    </html>
        `;
    }
}

customElements.define("game-page", Game);
