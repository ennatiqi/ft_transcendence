
export default class Dashboard extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
                <head>
                    <link rel="stylesheet" href="../style/dashboard.css">
                </head>
        <div class="container" id="dashboardid">
            <div class="side-panel">
                 <img src="../images/Logo.svg" class="logo">
                <div class="nav-options" >
                    <a href="/dashboard" class="btn-option flex-center btn-simple btn-highlight nav__link"  data-link>
                        <img src="../images/Home.svg">
                    </a>
                
                    <a href="/dashboard/game" class="btn-option flex-center btn-simple  nav__link"  data-link>
                        <img  src="../images/Users.svg">
                    </a>
                    <a href="/dashboard/chat" class="btn-option flex-center btn-simple  nav__link" data-link>
                        <img src="../images/Sms.svg">
                    </a>
                    <a href="/dashboard/settings" class="btn-option flex-center btn-simple  nav__link" data-link>
                        <img src="../images/Sms.svg">
                    </a>
                </div> 
                <a href="/" data-link  class="nav__link logout flex-center">
                    <img src="../images/Logout.svg">
                </a>
            </div>
            <div class="main">
                <div class="header-bar">
                    <div class="header-name">
                        <h2 >Hi, </h2>
                        <h2 id="user_name"></h2>
                    </div>
                    <input class="header-search" type="text" placeholder="Search For Friends">
                    <div class="header-notifications">
                        <div class="notifications-widget"></div>
                        <div class="notifications-widget"></div>
                    </div>
                </div>
                <div class="center-console" id="dashscripte">
                


                </div>
            </div>
            <div class="right-side-panel">
                 <div class="upper-section">
                    <div class="profile-photo">
                        <img src="../images/image_42.png">
                    </div>
                    <img class="upper-section-icone" src="../images/Vector.svg">
                    <div class="users-display overflow-style flex-col">
                        <div class="side-user" style="background-color:#D9D9D9;">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status-side active "></div>
                            <div class="user-ingame-side active"><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#F7C5BF;">
                            <img src="../images/users/happy-2.svg" alt="">
                            <div class="user-status-side active "></div>
                            <div class="user-ingame-side active"><p>in Game</p></div>
                            
                        </div>
                        <div class="side-user" style="background-color:#FF8A8A;">
                            <img src="../images/users/happy-3.svg" alt="">
                            <div class="user-status-side active "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                            
                        </div>
                        <div class="side-user" style="background-color:#FFBEB8;">
                            <img src="../images/users/happy-6.svg" alt="">
                            <div class="user-status-side active "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#C5C6C6;">
                            <img src="../images/users/happy-5.svg" alt="">
                            <div class="user-status-side "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#CEC3FF;">
                            <img src="../images/users/happy-4.svg" alt="">
                            <div class="user-status-side "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#D9D9D9;">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status-side "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#F7C5BF;">
                            <img src="../images/users/happy-2.svg" alt="">
                            <div class="user-status-side "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                        <div class="side-user" style="background-color:#D9D9D9;">
                            <img src="../images/users/happy-1.svg" alt="">
                            <div class="user-status-side "></div>
                            <div class="user-ingame-side "><p>in Game</p></div>
                        </div>
                    </div>

                </div>
                <div class="lower-section">
                        <div class="lower-section-header-img flex-center">
                            <img  src="../images/Chat.svg">
                        </div>
                        <div class="friends-list overflow-style">
                            <div class="friend" style="background-color: #D9D9D9;">
                                <img src="../images/users/1_men.svg">
                                <div class="user-status-side active"></div>
                            </div>
                            <div class="friend" style="background-color: #D9D9D9;">
                                <img src="../images/users/2_men.svg">
                                <div class="user-status-side"></div>
                            </div>
                            <div class="friend" style="background-color: #D9D9D9;">
                                <img src="../images/users/3_men.svg">
                                <div class="user-status-side"></div>
                            </div>
                        </div>
                </div> 
            </div>
        </div>
        <script src="../script/dashboard.js"></script>
        
        `;

    

// changing the highligth of buttons
var buttons = document.querySelectorAll(".btn-option");
buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
        buttons.forEach(function(btn_rem){
            btn_rem.classList.remove("btn-highlight");
            btn_rem.classList.add('btn-simple');
        });
        this.classList.remove('btn-simple')
        this.classList.add("btn-highlight");
    });
});



function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}

function logout_post()
{

    var csrfToken = getCookie("csrf-token");
    fetch("http://localhost:8000/api/logout/", {
        method: 'post',
        credentials: 'include',
        headers:{
			'X-CSRFToken':csrfToken
		}
    })
    .then(() =>{
        window.location.href = "/login";
    })
    .catch(error => console.log("error", error));
}

fetch('http://localhost:8000/main/data/',{
    method:"get",
    credentials:"include"
})
.then(response => response.json())
.then(data => {
        document.getElementById('user_name').innerHTML = data.user_name;
})




async function fetchCsrfToken() {
	const response = await fetch('/api/csrf-token/', {
		credentials: 'include'
	});
	const data = await response.json();
	return data.csrfToken;
}

fetchCsrfToken().then(csrfToken => {
	document.querySelector('meta[name="csrf-token"]').setAttribute('content', csrfToken);
});
    }
}

customElements.define("dashboard-page", Dashboard);
