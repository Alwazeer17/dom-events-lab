/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let currentInput = '';
let previousInput = '';
let operator = null;

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const calculator = document.querySelector('#calculator');

/*----------------------------- Event Listeners -----------------------------*/
calculator.addEventListener('click', handleClick);

/*-------------------------------- Functions --------------------------------*/
function handleClick(event) {
  const target = event.target;
  const value = target.textContent;

  if (!target.classList.contains('button')) return;

  if (target.classList.contains('number')) {
    currentInput += value;
    updateDisplay();
    return;
  }

  if (target.classList.contains('operator')) {
    if (value === 'C') {
      clearCalculator();
      return;
    }

    if (currentInput === '') return;

    if (previousInput !== '') {
      compute();
    }

    operator = value;
    previousInput = currentInput;
    currentInput = '';
    return;
  }

  if (target.classList.contains('equals')) {
    if (currentInput !== '' && previousInput !== '') {
      compute();
      updateDisplay();
    }
  }
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = '';
  operator = null;
}

updateDisplay();
