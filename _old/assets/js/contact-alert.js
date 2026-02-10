// Index js file

// console.log('Contact alert script loaded. Waiting for the click to display the alert.')

const MAIL = "matteo.martinelli.1991@gmail.com";

try {
    const contactNavButton = document.querySelector("#contacts-page");
    contactNavButton.addEventListener('click', function(event){
        alert('Write me at ' + MAIL + "!");
    })
} catch(error) {
    console.log('An error occured at the selection of the "contacts-page" id.');
    console.log(error);
}