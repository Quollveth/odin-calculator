//dom elements
let buttons = document.querySelectorAll('.btn');
let operationDisplay = document.querySelector('.operation');
let resultDisplay = document.querySelector('.result');

//variables
let currentNumber = ''; //number currently on display, string that gets parsed later
let isDecimal = false; //does the current number have a decimal place?

// handle the different buttons
function handleNumbers(id){
    if(isDecimal == false){
        currentNumber += id!='decimal'?id:currentNumber==''?'0.':'.'; 
        //append the current number to the end of currentNumber to build the number as buttons are pressed, if decimal is pressed add a decimal point, if the decimal is the first one add a leading zero
        if(id == 'decimal'){
            isDecimal = true; //so you can only add one decimal point
        }
    } else if(id != 'decimal'){
        currentNumber += id;
    }
    resultDisplay.value = currentNumber;
}

function handleOperator(id){

}

function clearDisplay(){
    //reset everything
    operationDisplay.value = '';
    resultDisplay.value = '';
    currentNumber = '';
    isDecimal = false;
}

function backspace(){
    if(currentNumber.charAt(currentNumber.length - 1) == '.'){
        isDecimal = false //if the decimal point is removed allow it to be placed again
    }
    currentNumber = currentNumber.slice(0,-1); //remove last number
    resultDisplay.value = currentNumber;
}

function equal(){

}

//event handler on all buttons
function handleButtons(id){
    if(id == '+' ||id == '-' ||id == '*' ||id == '/'){
        handleOperator(id);
    } else {
        switch(id){
            case 'clear':
                clearDisplay();
                break;
            case 'backspace':
                backspace();
                break;
            case 'equal':
                equal();
                break;
            default:
                //numbers or decimal point
                handleNumbers(id);
        }
    }
}

//initialize the code

operationDisplay.value = '';
resultDisplay.value = '';

buttons.forEach((element) => {
    element.addEventListener('click', function() {
        handleButtons(element.id);
    });
});