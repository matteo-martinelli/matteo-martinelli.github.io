// Index js file

const MAIL = "matteo.martinelli.1991@gmail.com";

try {
    const contactMenuButton = document.querySelector("#contact-form-link");
    contactMenuButton.addEventListener('click', function(event){
        alert('Write me at ' + MAIL + "!");
    })
} catch(error) {
    console.log('An error occured at the selection of the "contact-form-link" id.');
    console.log(error);
}

try {
    const contactNavButton = document.querySelector("#contacts-page");
    contactNavButton.addEventListener('click', function(event){
        alert('Write me at ' + MAIL + "!");
    })
} catch(error) {
    console.log('An error occured at the selection of the "contacts-page" id.');
    console.log(error);
}