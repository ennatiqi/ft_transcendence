
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



	
	document.getElementById('myForm').addEventListener('submit', function(event) {
		console.log("submit form checked in!");
		// Prevent the default form submission
		event.preventDefault();
		
		// Get the form data
		var formData = new FormData(event.target);
		
		// Send the form data using fetch
		fetch('http://localhost:8000/api/login/', {
			method: 'POST',
			body: formData,
			credentials: 'include'
		})
		.then(response => response.json())  // Parse the JSON from the response
		.then(data => {
			// Handle the data from the response
			console.log(data);
		})
		.catch(error => console.error('Error:', error));
	});
