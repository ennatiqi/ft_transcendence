//main page

var links = document.querySelectorAll('.settings-btn');

function handleClick(e) {
    e.preventDefault();

    var mainContent = document.querySelector('.settings-main');

    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild);
    }

    var newElementName = 'settings-' + this.classList[1];

    var newElement = document.createElement(newElementName);
    mainContent.appendChild(newElement);
}

links.forEach(function(link) {
    link.addEventListener('click', handleClick);
});

//defoult page

var images = ['1_men.svg', '2_men.svg', '3_men.svg', '4_men.svg', '5_men.svg', '6_men.svg', 'happy-1.svg', 'happy-2.svg', 'happy-3.svg', 'happy-4.svg', 'happy-5.svg', 'happy-6.svg'];

// Function to generate HTML for an image
function generateHTML(image, index) {
    var id = 'avatar' + (index + 1);
    var alt = 'Avatar ' + (index + 1);
    return `
        <div class="avatar-option">
            <input type="radio" id="${id}" name="avatar" value="${image}" hidden>
            <label for="${id}"><img src="../images/users/${image}" alt="${alt}" class="avatar-image"></label>
        </div>
    `;
}

// Generate HTML for all images
var avatar_images = images.map(generateHTML).join('\n');

// Insert the HTML into the document
document.querySelector('.svg-avatar-selection').innerHTML = avatar_images;
