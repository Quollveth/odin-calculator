const resultField = document.querySelector('.result');
const operationField = document.querySelector('.operation');

let value1;
let value2;
let operator;
let number = '';
let result;
resultField.value = number;
operationField.value = '';

function buttonPress(id,isOperator){
    if(id == 'equal'){
        value2 = parseFloat(number);
        result = evaluate(value1,value2,operator);
        resultField.value = result;
        operationField.value = `${value1} ${operator} ${value2}`;
        value1 = result;
        number = `${result}`;
    } else if(!isOperator){ //not an operator
        switch(id){
            case 'clear':
                //
                number = '';
                operationField.value = '';
                value1 = null;
                value2 = null;
                break;
            case 'backspace':
                //
                number = number.slice(0,-1);
                break;
            case 'decimal':
                //
                if(number == ''){
                    number = '0.';
                } else{
                    number += '.';
                }
                break;
            default:
                //number
                number += id;
                break;
        }
        resultField.value = number;
    } else {
        operator = id;
        value1 = parseFloat(number);
        operationField.value = `${value1} ${operator}`;
        number = '';
        resultField.value = number;
    }
}

function evaluate(value1,value2,operator){
    switch(operator){
        case '+':
            return value1 + value2;
            break;
        case '-':
            return value1 - value2;
            break;
        case '*':
            return value1 * value2;
            break;
        case '/':
            return value1 / value2;
            break;
    }
}