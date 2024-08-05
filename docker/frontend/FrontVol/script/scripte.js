
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	console.log("signup");
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});



// function getCsrfTokenFromCookie() {
// 	let cookieValue = null;
// 	let name = 'csrfToken';  // Replace this with the name of your CSRF token cookie
// 	if (document.cookie && document.cookie !== '') {
// 		let cookies = document.cookie.split(';');
// 		for (let i = 0; i < cookies.length; i++) {
// 			let cookie = cookies[i].trim();
// 			// Does this cookie string begin with the name we want?
// 			if (cookie.substring(0, name.length + 1) === (name + '=')) {
// 				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// 				break;
// 			}
// 		}
// 	}
// 	return cookieValue;
// }



document.getElementById('signInForm').addEventListener('submit', function(event) {
	console.log("submit form checked in!");
	// Prevent the default form submission
	event.preventDefault();
	
	// Get the form data
	var formData = new FormData(event.target);
	const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	
	// Send the form data using fetch
	fetch('http://localhost:8000/api/login/', {
		method: 'POST',
		body: formData,
		credentials: 'include',
		headers:{
			'X-CSRFToken':csrfToken
		}
	})
	.then(response => response.json())  // Parse the JSON from the response
	.then(data => {
		// Handle the data from the response
		showMessage(data.detail, "signInMessage");

		console.log(data);
	})
	.catch(error => console.error('Error:', error));
});

function check_password(){
	let pass1 = document.getElementById("register_pass_1");
	let pass2 = document.getElementById("register_pass_2");
	console.log(pass1, "-------", pass2);
	if(pass1.value === pass2.value)
		return 1;
	else
		return 0;
}

function showMessage(message, id)
{
	var elem = document.getElementById(id);
	elem.innerHTML = message;

	setTimeout(() => {
		elem.innerHTML = '';
	}, 3000);
}


document.getElementById('signUpForm').addEventListener('submit', function(event) {
	// Prevent the default form submission
	event.preventDefault();

	// Get the form data
	var formData = new FormData(event.target);
	const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	console.log("check password: ", check_password());
	if(check_password())
	{
		// Send the form data using fetch
		fetch('http://localhost:8000/api/register/', {
			method: 'POST',
			body: formData,
			credentials: 'include',
			headers:{
				'X-CSRFToken':csrfToken
			}
		})
		.then(response => response.json())  // Parse the JSON from the response
		.then(data => {
			// Handle the data from the response
			if (data.detail){
				showMessage(data.detail, "signUpMessage");
			}else{
				let errorMessages = [];
				for (let field in data) {
					data[field].forEach(errorMessage => {
						errorMessages.push(`<h3>${field}: ${errorMessage}</h3>`);
					});
				}
				document.getElementById('errorContainerSignUp').innerHTML = errorMessages.join('');
			}
			
			console.log(data);
		})
		.catch(error => console.error('Error:', error));
	}
	else
	{
		showMessage("passwords not matched", 'signUpMessage');
	}

});



async function fetchCsrfToken() {
	const response = await fetch('http://localhost:8000/api/csrf-token/', {
		credentials: 'include'
	});
	const data = await response.json();
	return data.csrfToken;
}

fetchCsrfToken().then(csrfToken => {
	

	document.querySelector('meta[name="csrf-token"]').setAttribute('content', csrfToken);

	console.log(csrfToken);
});