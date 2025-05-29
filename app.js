let currentInput = '';
let previousInput = '';
let operator = null;

const display = document.querySelector('.display');
const calculator = document.querySelector('#calculator');

function updateDisplay() {
  display.textContent = currentInput || '0';
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

calculator.addEventListener('click', (event) => {
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
      currentInput = '';
      previousInput = '';
      operator = null;
      updateDisplay();
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
});

updateDisplay();
