export default class Settings extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        fetch('/views//settings.html')
        .then(response => response.text())
        .then(data => {
            this.innerHTML = data;



            let script = document.createElement('script');
            script.src = "../script/settings.js";
            document.body.appendChild(script);
        });
    }
}


class Settings_security extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
            <form id="registration-form" onsubmit="return checkPasswordMatch();">
                <label class="general-form" for="password">Current Password:</label><br>
                <input class="general-form" type="password" id="password" name="password"><br>
                <label class="general-form" for="password">New Password:</label><br>
                <input class="general-form" type="password" id="password" name="password"><br>
                <label class="general-form" for="confirm-password">Confirm Password:</label><br>
                <input class="general-form" type="password" id="confirm-password" name="confirm-password"><br>
                <input class="general-form-submit" type="submit" value="Save Changes">
            </form>
            <script>
                function checkPasswordMatch() {
                    var password = document.getElementById("password").value;
                    var confirmPassword = document.getElementById("confirm-password").value;
                    if (password != confirmPassword) {
                        alert("Passwords do not match (MOOMI YAAA).");
                        return false;
                    }
                    return true;
                }
            </script>
        `;
        let script = document.createElement('script');
        script.src = "../script/settings.js";
        document.body.appendChild(script);
    }
}

class Settings_language extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
            <form id="language-form">
                <label for="language-select">Choose a language:</label>
                <select class="language-select" name="language">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                </select>
                <button class="language-submit" type="submit">Change Language</button>
            </form>
        `;
        let script = document.createElement('script');
        script.src = "../script/settings.js";
        document.body.appendChild(script);
    }
}

class Settings_default extends HTMLElement {
    constructor() {super()}
    connectedCallback() {
        this.innerHTML = `
            <form id="registration-form" onsubmit="return checkPasswordMatch();">
                <label class="general-form" for="first-name">First Name:</label><br>
                <input class="general-form" type="text" id="firstname" name="first-name"><br>
                <label class="general-form" for="last-name">Last Name:</label><br>
                <input class="general-form" type="text" id="lastname" name="last-name"><br>
                <label class="general-form" for="last-name">User Name:</label><br>
                <input class="general-form" type="text" id="username" name="last-name"><br>
                
                <label class="general-form" for="avatar">Select an Avatar:</label><br>
                <div class="svg-avatar-selection">
                    
                   
                    
                    
                   
               
                </div>
                
                
                <input class="general-form-submit" type="submit" value="Save Changes">
            </form>
            <script>
                    // Get all avatar options
                    const avatars = document.querySelectorAll('.avatar-option');
                    
                    // Add click event listener to each avatar
                    avatars.forEach(avatar => {
                        avatar.addEventListener('click', function() {
                            // Remove 'selected' class from all avatars
                            avatars.forEach(av => av.classList.remove('selected'));
                            
                            // Add 'selected' class to clicked avatar
                            this.classList.add('selected');
                        });
                    });
                    
            </script>
        `;

        let script = document.createElement('script');
        script.src = "../script/settings.js";
        document.body.appendChild(script);
    }
}

customElements.define("settings-page", Settings);
customElements.define("settings-default", Settings_default);
customElements.define("settings-security", Settings_security);
customElements.define("settings-language", Settings_language);






