export default class Login extends HTMLElement {
  constructor() {
	super();
	this.innerHTML = `<loading-page></loading-page>`;
  }

  	async fetchCsrfToken() {
	const response = await fetch('/api/csrf-token/', {
		credentials: 'include'
	});
	const data = await response.json();
	return data.csrfToken;
	}
  connectedCallback() {

	this.innerHTML = `
		
		<div class="container" id="container">
		<div class="left-side form-container sign-in-container ">
			<form id="signInForm">
				<h3 id="signInMessage"></h3>
				<div id="errorContainerSignIn"></div>
				<input type="email"    id="register_pass_1" placeholder="Email" name="email" required />
				<input type="password" id="register_pass_2" placeholder="Password" name="password" required />
	
				<div class="centerfor">
					<div class="remember">
	
						<input type="checkbox" id="checkbox" name="remember">
						<label for="checkbox">Remember Me</label><br>
					</div>
					<a id="forgetpassword">Forgot Password ?</a><br>
				</div>
				
				<button type="submit" class="nav__link" class="login-btn">  Login</button>
				<div class="orline">
					<div class="line"></div>
					<div class="or">or</div>
					<div class="line"></div>
				</div>
				<div class="loginwith">
						<a href="https://accounts.google.com/o/oauth2/auth?client_id=36859905646-l3ad3gji2poscl1u0r2osg2qmnehq405.apps.googleusercontent.com&redirect_uri=https://localhost/accounts/google/login/callback/&response_type=code&scope=profile email" >
							<img src="../images/google.svg" >
						</a>
						<a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6f00f915a8502d3af9d46351766176e32619718d006f2088cc14307c7efbbb8e&redirect_uri=https%3A%2F%2Flocalhost%2Fapi%2F42%2Fcallback%2F&response_type=code">
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
				<form id="signUpForm">
					
					<h3 id="signUpMessage"></h3>
					<div id="errorContainerSignUp"></div>
					<input type="email" placeholder="Email" name="email" required />
					<input type="text" placeholder="Username" name="username" required />
					<input type="password" class="signup-password" placeholder="Password" name="password" required />
					<input type="password" class="signup-password-confirm" placeholder="Confirme Password" name="password" required />
	
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
							<a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6f00f915a8502d3af9d46351766176e32619718d006f2088cc14307c7efbbb8e&redirect_uri=https%3A%2F%2Flocalhost%2Fapi%2F42%2Fcallback%2F&response_type=code">
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
	
		`;


	const signUpButton = document.getElementById("signUp");
	const signInButton = document.getElementById("signIn");
	const container = document.getElementById("container");
	this.fetchCsrfToken();
	signUpButton.addEventListener("click", () => {
	  console.log("signup");
	  container.classList.add("right-panel-active");
	});

	signInButton.addEventListener("click", () => {
	  container.classList.remove("right-panel-active");
	});


	function getCookie(name) {
	  var cookieArr = document.cookie.split(";");

	  for (var i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");

		if (name == cookiePair[0].trim()) {
		  return decodeURIComponent(cookiePair[1]);
		}
	  }

	  return null;
	}

	document
	  .getElementById("signInForm")
	  .addEventListener("submit", function (event) {
		console.log("submit form checked in!");
		// Prevent the default form submission
		event.preventDefault();

		// Get the form data
		var formData = new FormData(event.target);
		const csrfToken = getCookie("csrf-token");

		// Send the form data using fetch
		fetch("/api/login/", {
		  method: "POST",
		  body: formData,
		  credentials: "include",
		  headers: {
			"X-CSRFToken": csrfToken,
		  },
		})
		  .then((response) => {
			if (response.redirected) {
			  window.location.href = response.url;
			}
			return response.json();
		  })
		  .then((data) => {
			showMessage(data.detail, "signInMessage");
			console.log(data);
		  })
		  .catch((error) => console.error("Error:", error));
	  });

	function check_password() {
	  let pass1 = document.querySelector(".signup-password");
	  let pass2 = document.querySelector(".signup-password-confirm");
	  console.log(pass1.value, "-------", pass2.value);
	  if (pass1.value === pass2.value) return 1;
	  else return 0;
	}

	function showMessage(message, id) {
	  var elem = document.getElementById(id);
	  elem.innerHTML = message;

	  setTimeout(() => {
		elem.innerHTML = "";
	  }, 3000);
	}

	document
	  .getElementById("signUpForm")
	  .addEventListener("submit", function (event) {
		// Prevent the default form submission
		event.preventDefault();

		// Get the form data
		var formData = new FormData(event.target);
		const csrfToken = getCookie("csrf-token");
		console.log("check password: ", check_password());
		if (check_password()) {
		  // Send the form data using fetch
		  fetch("/api/register/", {
			method: "POST",
			body: formData,
			credentials: "include",
			headers: {
			  "X-CSRFToken": csrfToken,
			},
		  })
			.then((response) => response.json()) // Parse the JSON from the response
			.then((data) => {
			  // Handle the data from the response
			  if (data.detail) {
				showMessage(data.detail, "signUpMessage");
			  } else {
				let errorMessages = [];
				for (let field in data) {
				  data[field].forEach((errorMessage) => {
					errorMessages.push(`<h3>${field}: ${errorMessage}</h3>`);
				  });
				}
				document.getElementById("errorContainerSignUp").innerHTML =
				  errorMessages.join("");
			  }

			  console.log(data);
			})
			.catch((error) => console.error("Error:", error));
		} else {
		  showMessage("passwords not matched", "signUpMessage");
		}
	  });


	const exchangeCodeForToken = async (authCode) => {
	  try {
		const response = await fetch(
		  "https://yourdomain.com/api/auth/google/",
		  {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({ code: authCode }),
		  }
		);

		if (response.ok) {
		  const data = await response.json();
		  const token = data.token; // Assuming your backend responds with a JWT
		  localStorage.setItem("jwt", token); // Store the JWT in local storage or wherever you manage tokens
		} else {
		  console.error("Failed to exchange code for token");
		}
	  } catch (error) {
		console.error("Error exchanging code for token:", error);
	  }
	};

	const urlParams = new URLSearchParams(window.location.search);
	const authCode = urlParams.get("code");
	if (authCode) {
	  exchangeCodeForToken(authCode);
	}




	document.getElementById('forgetpassword').addEventListener('click', function() {
		document.getElementById('container').innerHTML = '';
		document.getElementById('container').appendChild(document.createElement('forget-password'));	
	});
  }
}


class ForgetPassword extends HTMLElement{
	// add simple form to foget password
	constructor(){
		super();
	}

	connectedCallback(){
		this.innerHTML = /*html*/`
	
		<div class="left-side form-container sign-in-container ">
		<form id="forgetPasswordForm">
		<div id="sendemailstatus" style="color:red;"></div>
				<h3 id="forgetPasswordMessage"></h3>
				<div id="errorContainerForgetPassword"></div>
				<input type="email"    id="register_pass_1" placeholder="Email" name="email" required />
				<button type="submit" class="nav__link" class="login-btn">  Send Email</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				
			</div>
		`;

		
		document.querySelector('#forgetPasswordForm').addEventListener('submit', function(event){
			event.preventDefault();
			var emailsend = document.querySelector('#register_pass_1').value;
			if (!emailsend) {
				return;
			}
			const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
			var data = {
				email: emailsend,
			  };
		  
			  var jsonString = JSON.stringify(data);
			fetch("/api/send-mail/", {
				method: "POST",
				body: jsonString,
				credentials: "include",
				headers: {
				  "X-CSRFToken": csrftoken,
				},
			  }).then((response) => {
				  return response.json();
				})
				.then((data) => {
					var sendstatus = document.getElementById("sendemailstatus");
					if (data.message === 'sucess') {
						document.getElementById('container').innerHTML = '';
						document.getElementById('container').appendChild(document.createElement('Set-new-password'));	
					}
					else if (data.message === 'email not found') {
						sendstatus.innerHTML = " Email not found";
					  console.log("error" , data);
					}
					else {
						sendstatus.innerHTML = "Email sent error";
					  console.log("error" , data);
					}
					setTimeout(() => {
						if (sendstatus) {
							sendstatus.innerHTML = "";
						}
					}, 2000);
				})
				.catch((error) => console.error("Error:", error));
		});
	}


}

class Setnewpassword extends HTMLElement{
	// add simple form to foget password
	constructor(){
		super();
	}

	connectedCallback(){
		this.innerHTML = /*html*/`

		<div class="left-side form-container sign-in-container ">
		<form id="resetpassword">
		<div id="sendemailstatus" style="color:red;"></div>
				<h3 id="forgetPasswordMessage"></h3>
				<div id="errorContainerForgetPassword"></div>
				<input type="text"    id="codesend" placeholder="entre code" name="number" required />
				<input type="password"    id="newpassword" placeholder="password" name="password" required />
				<button type="submit" class="nav__link" class="login-btn">submet new password</button>
			</form>
		</div>
		<div class="overlay-container">
			<div class="overlay">
				
			</div>
		`;


		document.querySelector('#resetpassword').addEventListener('submit', function(event){
			event.preventDefault();
			var code = document.querySelector('#codesend').value;
			var newpassword = document.querySelector('#newpassword').value;
			const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
			var data = {
				code: code,
				new_password: newpassword,
			  };
		  
			  var jsonString = JSON.stringify(data);
			fetch("/api/change-pass/", {
				method: "POST",
				body: jsonString,
				credentials: "include",
				headers: {
				  "X-CSRFToken": csrftoken,
				  
				},
			  }).then((response) => {
				  return response.json();
				})
				.then((data) => {
					var sendstatus = document.getElementById("sendemailstatus");
					if (data.message === 'sucess') {
						
						sendstatus.innerHTML = " password sucess";
					  	console.log("sucess" , data);
						// document.innerHTML = '';
						document.body.innerHTML = '<login-page></login-page>';
					}
					else if (data.message === 'email not found') {
						sendstatus.innerHTML = " Email not found";
					  console.log("error" , data);
					}
					else {
						sendstatus.innerHTML = "Email sent error";
					  console.log("error" , data);
					}
					setTimeout(() => {
						if (sendstatus) {
							sendstatus.innerHTML = "";
						}
					}, 2000);
				})
				.catch((error) => console.error("Error:", error));
		});
	}

}

customElements.define("forget-password", ForgetPassword);
customElements.define("set-new-password", Setnewpassword);
customElements.define("login-page", Login);

