//dom elements
let buttons = document.querySelectorAll('.btn');
let operationDisplay = document.querySelector('.operation');
let resultDisplay = document.querySelector('.result');

//variables
let currentNumber = ''; //number currently on display
let isDecimal = false; //does the current number have a decimal place?
let value1 = null; //numbers to be evaluated
let value2 = null;
let operator = '';
let operatorSet = false; //has the operator been set?
let result = null;
let operationDone = false; //is this a typed operation done or a repeat

//MATH!
function evaluate(value1,value2,operator){
    switch(operator){
        case '+':
            return value1+value2;
        case '-':
            return value1-value2;
        case '*':
            return value1*value2;
        case '/':
            return value1/value2;
    }
}

// handle the different buttons
function handleNumbers(id){
    if(currentNumber.length <= 10){ //character limit
        if(operationDone){ //if number is pressed after operation resets the calculator state
            clearDisplay();
        }
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
        if(operatorSet){
            value2 = parseFloat(currentNumber);
        } else{
            value1 = parseFloat(currentNumber);
        }
    }
}

function handleOperator(id){
    if(operationDone){
        operationDone = false;
    }
    if(operatorSet){ //this is the second time operator is pressed
        equal();
        operationDone = false;
    }
    operatorSet = true;
    isDecimal = false;
    operator = id;
    operationDisplay.value = `${value1} ${operator}`
    resultDisplay.value = '';
    currentNumber = '';
}

function clearDisplay(){
    //reset everything
    resultDisplay.value = '';
    operationDisplay.value = '';
    currentNumber = '';
    isDecimal = false;
    value1 = null;
    value2 = null;
    operator = '';
    operatorSet = false;
    result = null;
    operationDone = false;
}

function backspace(){
    if(currentNumber.charAt(currentNumber.length - 1) == '.'){
        isDecimal = false //if the decimal point is removed allow it to be placed again
    }
    currentNumber = currentNumber.slice(0,-1); //remove last number
    //update display and values
    resultDisplay.value = currentNumber;
    if(operatorSet){
        value2 = parseFloat(currentNumber);
    } else{
        value1 = parseFloat(currentNumber);
    }
}

function equal(){
    result = evaluate(value1,value2,operator);
    result = removeRightZeroes(result.toFixed(10));
    operationDisplay.value = `${value1} ${operator} ${value2}`;
    resultDisplay.value = result;
    operationDone = true;
    value1 = result;
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

function removeRightZeroes(num){
    return parseFloat(num.toString().replace(/\.?0+$/,''));
    /*
    converts number to a string
    finds any zeroes at the right of the decimal place that go to the end of the string and removes them
    parses the string back into a float and returns it
    */
}

//initialize the code

operationDisplay.value = '';
resultDisplay.value = '';

buttons.forEach((element) => {
    element.addEventListener('click', function() {
        handleButtons(element.id);
    });
});