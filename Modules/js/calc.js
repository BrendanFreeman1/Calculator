//#region Operation Class
class Operation 
{
  constructor(firstOperator, secondOperator, firstNum, secondNum) 
  {
    this.firstOperator = firstOperator;
    this.secondOperator = secondOperator;
    this.firstNum = firstNum;
    this.secondNum = secondNum;
  }

  Calculate() 
  {
    let answer;
    let num1 = parseFloat(this.firstNum);
    let num2 = parseFloat(this.secondNum);

    if (this.firstOperator === "+") answer = this.Add(num1, num2);
    if (this.firstOperator === "−") answer = this.Subtract(num1, num2);
    if (this.firstOperator === "×") answer = this.Multiply(num1, num2);
    if (this.firstOperator === "÷") answer = this.Divide(num1, num2);
    if (this.firstOperator === "%") answer = this.Percentage(num1, num2);
    if (this.firstOperator === "𝑥²") answer = this.Square(num1);
    if (this.firstOperator === "²√𝑥") answer = this.SquareRoot(num1);

    return answer;
  }

  Add(num1, num2) 
  {
    return num1 + num2;
  }

  Subtract(num1, num2) 
  {
    return num1 - num2;
  }

  Multiply(num1, num2) 
  {
    return num1 * num2;
  }

  Divide(num1, num2) 
  {
    if (num2 === 0) { endEquation = true; }

    return num1 / num2;
  }

  Percentage(num, percentage) 
  {
    return num * (percentage / 100);
  }

  Square(num)
  {
    return num * num;
  }

  SquareRoot(num) 
  {
    return Math.sqrt(num);
  }

  ClearAll()
  {
    this.firstOperator = "";
    this.secondOperator = "";
    this.firstNum = "0";
    this.secondNum = "";
  }
}
//#endregion

//#region Initialise variables
const equationText = document.querySelector(".equationText");
const currentNum = document.querySelector(".currentNum");
const numBtn = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");
const editScreenBtn = document.querySelectorAll(".editScreenBtn");

let currentEquation = new Operation();

numBtn.forEach((button) => button.addEventListener("click", () => NumberClicked(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));
editScreenBtn.forEach((button) => button.addEventListener("click", () => EditScreenClicked(button.textContent)));
//window.addEventListener("keydown", handleKeyboardInput);
document.body.onload = ClearAll();

//#endregion

function NumberClicked(character)
{
  if(currentEquation.firstOperator === "")
  {
    PopulateFirstNum(character)
    return;
  }

    PopulateSecondNum(character);
}

function OperatorClicked(character)
{
  if (currentEquation.firstOperator === "") //Set first operator
  {
    currentEquation.firstOperator = character;
    SetCurrentNum(currentEquation.secondNum);
  } 
  else //Set Second Operator
  {
    //Don't set the second operator until there is a second number
    if (currentEquation.secondNum !== "0") currentEquation.secondOperator = character;
  }

  //If the second operator is undefined, do nothing
  if(currentEquation.secondOperator !== "")
  {
    let answer = currentEquation.Calculate();

    SetCurrentNum(answer);
    currentEquation.ClearAll();
    currentEquation.firstNum = answer;

    if (character !== "=") 
    {
      currentEquation.firstOperator = character;
    } 
  }

  if(character === "𝑥²" || character === "²√𝑥") Square(character);
}

function EditScreenClicked(character)
{
  if (character === "AC") { ClearAll();  return; }
  if (character === "⌫") { BackSpace(); return; }
  if (character === "+/−") { PlusMinus(); return; }
}

function Square(character)
{
  //If the user has set the first operator to a different operator 
  //But then pressed square or square root, calculate anyway.
  currentEquation.firstOperator = character;
  let answer = currentEquation.Calculate();

  SetCurrentNum(answer);

  if (character === "𝑥²") { equationText.textContent = currentEquation.firstNum + "²"; }
  if (character === "²√𝑥") { equationText.textContent = "√" + currentEquation.firstNum; }

  currentEquation.firstNum = answer;
  currentEquation.firstOperator = "";
}

function PopulateFirstNum(character) 
{
  //Only alow one period
  if(character === ".")
  {
    if (currentEquation.firstNum.includes(".")) return;
  }  

  if (currentEquation.firstNum === "0" && character !== ".") currentEquation.firstNum = "";
  currentEquation.firstNum += character;
  SetCurrentNum(currentEquation.firstNum);

  currentEquation.secondNum = "0"
}

function PopulateSecondNum(character) 
{
  //Only alow one period
  if (character === ".") {
    if (currentEquation.secondNum.includes(".")) return;
  }

  if (currentEquation.secondNum === "0" && character !== ".") currentEquation.secondNum = "";
  currentEquation.secondNum += character;
  SetCurrentNum(currentEquation.secondNum);
}

//#region Edit Calculator Screen

function SetCurrentNum(number)
{
  numString = number.toString();
  if (numString.length > 12) number = parseInt(numString.slice(0, 12));

  currentNum.textContent = (Math.round(number * 10000) / 10000).toString();

  SetEquationText();
}

function SetEquationText()
{
  if(currentEquation.secondNum === "0")
  {
    equationText.textContent = currentEquation.firstNum + " " + currentEquation.firstOperator;
  } else {
    equationText.textContent = currentEquation.firstNum + " " + currentEquation.firstOperator + " " + currentEquation.secondNum + " " + currentEquation.secondOperator;
  }
}

function ClearAll()
{
  currentEquation.ClearAll();
  SetCurrentNum(currentEquation.firstNum);
  SetEquationText();
}

function BackSpace()
{
  if(currentNum.textContent === "0") return;

  if(currentEquation.firstOperator === "") 
  {
    currentEquation.firstNum = currentEquation.firstNum.toString().slice(0, -1);
    if(currentEquation.firstNum.length <= 0) currentEquation.firstNum = "0";
    SetCurrentNum(currentEquation.firstNum);
  }
  else 
  {
    currentEquation.secondNum = currentEquation.secondNum.slice(0, -1);
    if (currentEquation.secondNum.length <= 0) currentEquation.secondNum = "0";
    SetCurrentNum(currentEquation.secondNum);
  }
}

function PlusMinus()
{
  if(currentEquation.firstOperator === "") 
  {
    currentEquation.firstNum = currentEquation.firstNum * -1
    SetCurrentNum(currentEquation.firstNum);
  }else{
    currentEquation.secondNum = currentEquation.secondNum * -1;
    SetCurrentNum(currentEquation.secondNum);
  }
}

//#endregion


function handleKeyboardInput(e) 
{
  if (e.key >= 0 && e.key <= 9) NumberClicked(e.key);
  if (e.key === ".") NumberClicked(e.key);
  if (e.key === "Backspace") BackSpace(currentNum.textContent);
  if (e.key === "Escape") ClearAll(currentEquation);
  if (e.key === "=" || e.key === "Enter") OperatorClicked("=");
  if (e.key === "+") OperatorClicked("+");
  if (e.key === "-") OperatorClicked("−");
  if (e.key === "*") OperatorClicked("×");
  if (e.key === "/") OperatorClicked("÷");
}