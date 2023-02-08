// Functions
function isEven(number){
    if(number % 2 === 0){
        return true;
    }
    else {
        return false;
    }
}

function writeReply(result){
    const div = document.querySelector('#exercise');
    const par = document.createElement('p');    //change in even-uneven-response
    par.textContent = 'the number is ' + result;
    par.style.fontSize = '10px';
    div.appendChild(par);
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


// Script body
const numberField = document.querySelector('#number-field');
const calculateButton = document.querySelector('#calculate');

calculateButton.addEventListener('click', ()=>{
    if(isEven(numberField.value)){
        alert('The number is even');
        writeReply('even');
    } 
    else {
        alert('The number is uneven');
        writeReply('uneven');
    }
});

const incrementButton = document.querySelector('#increment');
const decrementButton = document.querySelector('#decrement');
const outputDiv = document.querySelector('.show-number');
const outputText = outputDiv.textContent;
let valueToManipulate = outputText;

const dateTime = new Date();
const nowTimeStamp = dateTime.getTime(); 
const expireDateTimeStamp = nowTimeStamp + 3600*24*1000;
const expireDate = new Date(expireDateTimeStamp).toUTCString();  

incrementButton.addEventListener('click', function(event){
    valueToManipulate++;
    outputDiv.textContent = valueToManipulate;
    
    let cookieContent = "lastCounter=" + valueToManipulate;
    document.cookie = cookieContent;
    cookieContent = "expires=" + expireDate;
    document.cookie = cookieContent;
    
    console.log(document.cookie);   
});

decrementButton.addEventListener('click', function(event){
    valueToManipulate--;
    outputDiv.textContent = valueToManipulate;
    
    let cookieContent = "lastCounter=" + valueToManipulate;
    document.cookie = cookieContent;
    cookieContent = "expires=" + expireDate;
    document.cookie = cookieContent;
    
    console.log(document.cookie);   
});

console.log("final: " + document.cookie);

let decodedCookie = decodeURIComponent(document.cookie);
console.log("decoded: " + decodedCookie);

console.log(getCookie("lastCounter"));