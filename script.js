const resultField = document.querySelector('.result');

let value1 = null;
let value2 = null;
let operator;
let number = '';
let value1saved = false;
let value2saved = false;
resultField.value = number;

function buttonPress(id,isOperator){
    if(id == 'equal'){

    } else if(!isOperator){ //not an operator
        switch(id){
            case 'clear':
                //
                number = '';
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
    } else {
        //operator
        operator = id;
        valor1 = parseFloat(number);
        resultField.value = '';
        
    }

    resultField.value = number;
}

function evaluate(value1,value2,operator){

}