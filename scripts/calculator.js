
const display = document.getElementById('display');
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;

// This will append number or decimal
function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

// It will set the operation
function setOperation(operation) {
  if (currentOperation !== null) evaluate();
  firstOperand = parseFloat(display.textContent);
  currentOperation = operation;
  shouldResetDisplay = true;
}

// This will do the calculation
function evaluate() {
  if (currentOperation === null || shouldResetDisplay) return;

  secondOperand = parseFloat(display.textContent);
  let result;

  switch (currentOperation) {
    case 'add':
      result = firstOperand + secondOperand;
      break;
    case 'subtract':
      result = firstOperand - secondOperand;
      break;
    case 'multiply':
      result = firstOperand * secondOperand;
      break;
    case 'divide':
      result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
      break;
    default:
      return;
  }


  display.textContent = result;
  currentOperation = null;
}

// Thsi will Clear everything on it
function clearDisplay() {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperation = null;
  shouldResetDisplay = false;
}

// this handles the toggle of positive/negative
function toggleSign() {
  display.textContent = (parseFloat(display.textContent) * -1).toString();
}

// This will convert to percentage
function percent() {
  display.textContent = (parseFloat(display.textContent) / 100).toString();
}

// This is for to handle the button clicking for operations
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.textContent;

    if (!action) {
      appendNumber(value);
    } else if (action === 'clear') {
      clearDisplay();
    } else if (action === 'sign') {
      toggleSign();
    } else if (action === 'percent') {
      percent();
    } else if (action === 'equals') {
      evaluate();
    } else {
      setOperation(action);
    }
  });
});


window.addEventListener('keydown', e => {
  if (!isNaN(e.key)) {
    appendNumber(e.key);
  } else if (e.key === '.') {
    appendNumber('.');
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    const keyMap = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide'
    };
    setOperation(keyMap[e.key]);
  } else if (e.key === 'Enter' || e.key === '=') {
    evaluate();
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

