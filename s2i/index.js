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

incrementButton.addEventListener('click', function(event){
    valueToManipulate++;
    outputDiv.textContent = valueToManipulate;
});

decrementButton.addEventListener('click', function(event){
    valueToManipulate--;
    outputDiv.textContent = valueToManipulate;
});

