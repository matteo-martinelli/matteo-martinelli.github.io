// Functions
//Get the desired cookie field
function getCookie(fieldName) {
    let name = fieldName + "=";
    let cookieArray = document.cookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
}


// Script body
//Connection to the frontend elements
const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const outputDiv = document.querySelector('#show-number');
const outputText = outputDiv.textContent;

//Setting of the value to be displayed starting from the cookie setting
let valueToManipulate;

if(getCookie("lastCounter") == null){
    valueToManipulate = 0;
}
else {
    valueToManipulate = parseInt(getCookie("lastCounter"));    
}

outputDiv.textContent = valueToManipulate;

console.log(valueToManipulate);
console.log(typeof(valueToManipulate));

//Setting the cookie expiration time (about one day)
const dateTime = new Date();
const nowTimeStamp = dateTime.getTime(); 
const expireDateTimeStamp = nowTimeStamp + 3600*24*1000;
const expireDate = new Date(expireDateTimeStamp).toUTCString();  

//Event listener for value increase
incrementButton.addEventListener('click', function(event){
    valueToManipulate++;
    outputDiv.textContent = valueToManipulate;
    
    let cookieContent = "lastCounter=" + valueToManipulate;
    document.cookie = cookieContent;
    cookieContent = "expires=" + expireDate;
    document.cookie = cookieContent;
    
    console.log(document.cookie);   
});

//Event listener for value decrease
decrementButton.addEventListener('click', function(event){
    valueToManipulate--;
    outputDiv.textContent = valueToManipulate;
    
    let cookieContent = "lastCounter=" + valueToManipulate;
    document.cookie = cookieContent;
    cookieContent = "expires=" + expireDate;
    document.cookie = cookieContent;
    
    console.log(document.cookie);   
});
