// Index js file

const MAIL = "matteo.martinelli.1991@gmail.com";
const contactMenuButton = document.querySelector("#contacts-page");

contactMenuButton.addEventListener('click', function(event){
    alert('Write me at ' + MAIL + "!");
})