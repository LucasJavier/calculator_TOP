const numberButtons = Array.from(document.getElementsByClassName("number"));
const operatorButtons = Array.from(document.getElementsByClassName("operator"));
const clearButtons = Array.from(document.getElementsByClassName("clear"));
const dotButton = document.querySelector("#dot");
const maxLength = 10;
let myShowResult = document.querySelector("#showResult");
let myShowNumber = document.querySelector("#showNumber");
let itsFirstTime = true;
let numberBeenClicked = false;
let operatorBeenClicked = false;
let mustClear = false;
let canUseDot = true;
let ternaryMathArray = [];

numberButtons.forEach(button => button.addEventListener("click",(event) => {
    if(itsFirstTime) resetAll(event);
    else {
        if (myShowResult.textContent.length < maxLength) {
            myShowResult.textContent += button.textContent;
            numberBeenClicked = true;
            operatorBeenClicked = false;
        }
    }
        
}));

operatorButtons.forEach(button => button.addEventListener("click",() => {
       if(numberBeenClicked && !operatorBeenClicked){
            if(mustClear === true) mustClear = false;
            operatorBeenClicked = true;
            itsFirstTime = true;
            numberBeenClicked = false;
            ternaryMathArray.push(parseFloat(myShowResult.textContent));
            doOperators(button.id);
       }
}));

dotButton.addEventListener("click", () =>{
    if(canUseDot && myShowResult.textContent.length >= 1) {
        myShowResult.textContent += ".";
        canUseDot = false;
    }
})

clearButtons.forEach(button => button.addEventListener("click", () => {
    switch(button.id){
        case "clearAll":{
            myShowNumber.textContent = '';
            myShowResult.textContent = "_";
            itsFirstTime = true;
            numberBeenClicked = false;
            operatorBeenClicked = false;
            mustClear = false;
            canUseDot = true;
            break;
        }
        default:{
            if(myShowResult.textContent.length >= 1){
                if(myShowResult.textContent.charAt(myShowResult.textContent.length - 1) === ".") canUseDot = true;
                myShowResult.textContent = myShowResult.textContent.slice(0,-1);
            }
            break;
        }
    }
}));

function doOperators(nomOperator){
    let number = '';
    if(ternaryMathArray.length === 3) {
        number = doMath();
        if(nomOperator !== "equal"){
            ternaryMathArray.length = 0;
            ternaryMathArray.push(number);
        }
    }
    switch(nomOperator){
        case "plus": {
            if(number !== '')  myShowNumber.textContent = (number).toString() + " + ";
            else  myShowNumber.textContent = myShowResult.textContent + " + ";
            ternaryMathArray.push("+");
            myShowResult.textContent = "+"; 
            break;
        }
        case "minus": {
            if(number !== '')  myShowNumber.textContent = (number).toString() + " - ";
            else myShowNumber.textContent = myShowResult.textContent + " - ";
            ternaryMathArray.push("-");
            myShowResult.textContent = "-"; 
            break;
        }
        case "multiplier": {
            if(number !== '') myShowNumber.textContent = (number).toString() + " x ";
            else  myShowNumber.textContent = myShowResult.textContent + " x "; 
            ternaryMathArray.push("x");
            myShowResult.textContent = "x"; 
            break;
        }
        case "divider": {
            if(number !== '')  myShowNumber.textContent = (number).toString() + " / ";
            else myShowNumber.textContent = myShowResult.textContent + " / "; 
            ternaryMathArray.push("/");
            myShowResult.textContent = "/"; 
            break;
        }
        case "porcentage":{
            if(number !== '') myShowNumber.textContent = (number).toString() + " % ";
            else myShowNumber.textContent = myShowResult.textContent + " % "; 
            ternaryMathArray.push("%");
            myShowResult.textContent = "%"; 
            break;
        }
        default:{
            if(ternaryMathArray.length === 3) {
                operatorBeenClicked = false;
                numberBeenClicked = true;
                mustClear = true;
                myShowNumber.textContent = (ternaryMathArray[0]).toString() + ternaryMathArray[1] +
                                            (ternaryMathArray[2].toString()) + " = " + (number).toString();
                myShowResult.textContent = (number).toString();
                ternaryMathArray.length = 0;
            }
            break;
        }
    }
}

function doMath(){
    let number = '';
    const operatorInArray = ternaryMathArray[1];
    switch(operatorInArray){
        case "+": {number = 1 * (ternaryMathArray[0] + ternaryMathArray[2]).toFixed(2); break;}
        case "-": {number = 1 * (ternaryMathArray[0] - ternaryMathArray[2]).toFixed(2); break;}
        case "x": {number = 1 * (ternaryMathArray[0] * ternaryMathArray[2]).toFixed(2); break;}
        case "/": {
            if(ternaryMathArray[2] === 0){
                myShowNumber.textContent = "0 / number  = ERROR";
                myShowResult.textContent = "ERROR"
            }
            else number = 1 * (ternaryMathArray[0] / ternaryMathArray[2]).toFixed(2); 
            break;
        }
        default: {number = 1 * ((ternaryMathArray[0] * ternaryMathArray[2])/100).toFixed(2); break;}
    }
    return number;
}

function resetAll(event){
    if(mustClear) {
        myShowNumber.textContent = '';
        mustClear = false;
    }
    myShowResult.textContent = event.target.textContent;
    itsFirstTime = false;
    numberBeenClicked = true;
    operatorBeenClicked = false;
    canUseDot = true;
}