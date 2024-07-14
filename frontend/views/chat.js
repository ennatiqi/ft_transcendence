

export default class Chat extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `

    
            <link rel="stylesheet" href="../style/chat.css">
        

            <div class="container">
                <div class="chat">
                    <h1 class="chattext">Chat</h1>
                    <div class="users-display overflow-style flex-col">
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="backgrounda"></div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame ">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame ">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
                        <div class="user">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status active "></div>
                            <div class="user-ingame active">
                                <p>in Game</p>
                            </div>
                            <div class="username">
                                <h1>rachid</h1>
                                <p>4+ new messages</p>
                            </div>
                        </div>
        
                    </div>
                </div>
                <div class="text-chat ">
                    
                    <div class="messages">
                        <div class="messages-content"></div>
                    </div>
                    <div class="message-box">
                        <textarea type="text" class="message-input"></textarea>
                        <button type="submit" class="message-submit">
                            <img src="../images/send-2.svg" alt="">
                        </button>
                    </div>
        
                </div>
            </div>
            <script src="../script/chat.js"></script>

        `;
    }
}

customElements.define("chat-page", Chat);
