const calculator = {
    display_value: '0',
    firstValue: null,
    waitingForSecondValue: false,
    operator: null
};
  function display() {
    const display = document.querySelector('.display_value');
    display.value = calculator.displayValue;
  }
  display();
  const keys = document.querySelectorAll("button");
  keys.addEventListener("click", (e) =>{
      const {target} = e;

      if (!target.contains('digit')) {
        return;
      }      
      if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
      }
      if (target.classList.contains('decimal')) {
        insertDecimal(target.value);
        display();
        return;
      }
      if (target.classList.contains('cancel')) {
        reset();
        display();
        return;
      }
      inputValue(target.value);
      display();    
  })

  function inputValue(number) {
    const { display_value, waitingForSecondValue } = calculator;
  
    if (waitingForSecondValue === true) {
      calculator.display_value = number;
      calculator.waitingForSecondValue = false;
    } else {
      calculator.display_value = display_value === '0' ? number : display_value + number;
    }
    console.log(calculator);
  }
  
  function insertDecimal(decimal){
      if(calculator.waitingForSecondOperand === true){
          calculator.display_value = '0.';
          calculator.waitingForSecondOperand = false;
          return;
      }
      if(!calculator.display_value.includes(decimal)){
          calculator.display_value += decimal;
      }
  }
  function handleOperator(nextOperator) {
    const { firstValue, display_value, operator } = calculator;
    const value = parseFloat(display_value);

    if(operator && calculator.waitingForSecondValue){
        calculator.operator = nextOperator;
        console.log(calculator);
  
        return;
    }

    if (firstValue === null && !isNaN(value)) {
      calculator.firstValue = value;
    } else if(operator){
        const result = calculate(firstValue, value, operator);
        calculator.display_value = String(result);
        calculator.firstValue = result;
    }
    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  function calculate(firstValue, secondValue, operator) {
    if (operator === '+') {
      return firstValue + secondValue;
    } else if (operator === '-') {
      return firstValue - secondValue;
    } else if (operator === '*') {
      return firstValue * secondValue;
    } else if (operator === '/') {
      return firstValue / secondValue;
    }
  
    return secondValue;
  }    
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  function reset() {
    calculator.display_value = '0';
    calculator.firstValue = null;
    calculator.waitingForSecondValue = false;
    calculator.operator = null;
    console.log(calculator);
  }

//   keys.addEventListener('click', event => {
//     const { target } = event;
//     const { value } = target;
//     if (!target.matches('button')) {
//       return;
//     }
  
//     switch (value) {
//       case '+':
//       case '-':
//       case '*':
//       case '/':
//       case '=':
//         handleOperator(value);
//         break;
//       case '.':
//         inputDecimal(value);
//         break;
//       case 'all-clear':
//         resetCalculator();
//         break;
//       default:
        // check if the key is an integer
//         if (Number.isInteger(parseFloat(value))) {
//           inputDigit(value);
//         }
//     }
  
//     updateDisplay();
//   });
//   calculator.displayValue = String(result);
//   calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
//   0.30000000000000004.toFixed(7) // 0.3000000
//   parseFloat(0.30000000000000004.toFixed(7)) // 0.3
                