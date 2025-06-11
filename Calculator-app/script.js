const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const backspace = document.getElementById('backspace');

let expression = '';

function updateDisplay() {
  display.textContent = expression || '0';
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const val = button.textContent;
    if (val === '=') return;
    if (val === 'C') return;
    if (val === '⌫') return;
    if (val === '×') expression += '*';
    else if (val === '÷') expression += '/';
    else if (val === '^') expression += '**';
    else expression += val;
    updateDisplay();
  });
});

clear.addEventListener('click', () => {
  expression = '';
  updateDisplay();
});

equals.addEventListener('click', () => {
  try {
    if (expression){
      expression = eval(expression).toString();
    }
  } catch {
    expression = 'Error';
  }
  updateDisplay();
});

backspace.addEventListener('click', () => {
  expression = expression.slice(0, -1);
  updateDisplay();
});

// Bonus: Keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9+\-*/.^%]/.test(key)) {
    expression += key === '^' ? '**' : key;
    updateDisplay();
  } else if (key === 'Enter') {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = 'Error';
    }
    updateDisplay();
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (key === 'Escape') {
    expression = '';
    updateDisplay();
  }
});
