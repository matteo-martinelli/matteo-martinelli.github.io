// Alert for the e-mail link in the text corpus

const MAIL = "matteo.martinelli.1991@gmail.com";
const contactMeLink = document.querySelector("#contact-form-link");

contactMeLink.addEventListener('click', function(event){
    alert('Write me at ' + MAIL + "!");
})