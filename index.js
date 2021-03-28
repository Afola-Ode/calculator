const calculator = {
    display_value: '0',
    firstValue: null,
    waitingForSecondValue: false,
    operator: null
};

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
  const newValue = parseFloat(display_value);

  if(operator && calculator.waitingForSecondValue){
      calculator.operator = nextOperator;
      console.log(calculator);

      return;
  }

  if (firstValue === null && !isNaN(newValue)) {
    calculator.firstValue = newValue;
  } else if(operator){
      const result = calculate(firstValue, newValue, operator);
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

  function reset() {
    calculator.display_value = '0';
    calculator.firstValue = null;
    calculator.waitingForSecondValue = false;
    calculator.operator = null;
    console.log(calculator);
  }

  function display() {
    const displayValue = document.querySelector('.display_value');
    displayValue.value = calculator.display_value;
  }

  display();

  const keys = document.querySelector(".row");
  keys.addEventListener("click", (e) =>{
      const {target} = e;

      if (!target.matches('button')) {
        return;
      }      
      if (target.classList.contains('operator')) {
        handleOperator(target.value);
        display();
        return;
      }
      if (target.classList.contains('decimal')) {
        insertDecimal(target.value);
        display();
        return;
      }
      if (target.classList.contains('clear')) {
        reset();
        display();
        return;
      }
      inputValue(target.value);
      display();    
  })
  
  
  
                
