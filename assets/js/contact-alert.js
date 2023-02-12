// Index js file

let mail = config.MY_MAIL;
const contactMenuButton = document.querySelector("#contacts-page");

contactMenuButton.addEventListener('click', function(event){
    alert('Write me at ' + mail + "!");
})