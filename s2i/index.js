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
    const par = document.createElement('p');
    par.textContent = 'the number is ' + result;
    par.style.fontSize = '10px';
    div.appendChild(par);
}

// Script body
const number = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', ()=>{
    if(isEven(number.value)){
        alert('The number is even');
        writeReply('even');
    } 
    else {
        alert('The number is uneven');
        writeReply('uneven');
    }
});