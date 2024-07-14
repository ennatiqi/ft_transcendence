
export default class Login extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
        <head>
        <link rel="stylesheet" type="text/css" href="../style/login.css">
        
    </head>
    <body>
        
    <div class="container" id="container">
        <div class="left-side form-container sign-in-container ">
            <form>

                    
                    
                <input type="text" placeholder="Username" name="username" required />
                
                <input type="password" placeholder="Password" name="password" required />
                <div class="centerfor">
                    <div class="remember">

                        <input type="checkbox" id="checkbox" name="remember">
                        <label for="checkbox">Remember Me</label><br>
                    </div>
                    <a href="">Forgot Password ?</a><br>
                </div>
                
                <button type="submit"  href="/Dashboard" class="nav__link" data-link class="login-btn">  Login</button>
                <div class="orline">
                    <div class="line"></div>
                    <div class="or">or</div>
                    <div class="line"></div>
                </div>
                <div class="loginwith">

                        <a href="https://www.google.com/" >
                            <img src="../images/google.svg" >
                        </a>
                        <a href="https://profile.intra.42.fr/">
                            <img src="../images/42.svg" >
                        </a>
                </div>
            </form>
            <div class="overlay-panel overlay-right">
                <button class="ghost" id="signUp">Create Account</button>
            </div>
        </div>
        <div class="form-container sign-up-container">
            <div class="left-side">
                <form>
                    
                    
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="email" placeholder="Email" name="email" required />
                    
                    <input type="password" placeholder="Password" name="password" required />
                    <input type="password" placeholder="Confirme Password" name="password" required />
                    
                    <button type="submit" class="login-btn">Sign Up</button>
                    <div class="orline">
                        <div class="line"></div>
                        <div class="or">or</div>
                        <div class="line"></div>
                    </div>
                    <div class="loginwith">

                            <a href="https://www.google.com/" >
                                <img src="../images/google.svg" >
                            </a>
                            <a href="https://profile.intra.42.fr/">
                                <img src="../images/42.svg" >
                            </a>
                    </div>
                </form>
                
                <div class="overlay-panel overlay-left">
                    <button class="ghost" id="signIn">Login</button>
                </div>
            </div>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <!-- <div class="overlay-panel overlay-left">
                    <button class="ghost" id="signIn">login</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <button class="ghost" id="signUp">Sign up</button>
                </div> -->
            </div>
        </div>
    </div>
    <script src="../script/scripte.js"></script>
    </body>
        `;
    }
}

customElements.define("login-page", Login);
