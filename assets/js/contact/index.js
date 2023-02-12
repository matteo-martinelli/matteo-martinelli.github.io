//Contact js file
// Functions
function getTitleRadio(radioList){
    for(i = 0; i < radioList.length; i++){
        if(radioList[i].checked){
            return radioList[i].value;
        }
        else {
            return null;
        }
    }
}

function validate(){
    let mail = config.MY_MAIL;

    let form = document.forms.emailForm;

    let title = form.elements.title;
    let name = form.elements.name;
    let surname = form.elements.surname;
    let email = form.elements.email;
    let message = form.elements.message;

    let mailHeader = name.value + " " + surname.value + " " + email.value + " " + message.value;

    if(name.value == ""){
        alert("Insert a name!");
        return false;
    }
    
    if(surname.value == ""){
        alert("Insert a surname!");
        return false;
    }

    if(email.value == ""){
        alert("Insert an email!");
        return false;
    }
    
    if(message.value == ""){
        alert("Insert a message!");
        return false;
    }

    window.location.href = "mailto:" + mail + "?subject=Mail from your website!&body=" + mailHeader;

    return true;
}