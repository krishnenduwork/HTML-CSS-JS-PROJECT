  const display = document.getElementById('display');
  const angleMode = document.getElementById('angleMode');
  const historyList = document.getElementById('historyList');
  let isDegree = true;
  let history = [];

  function appendValue(val) {
    display.value += val;
  }

  function appendFunc(func) {
    if (func === 'fact') {
      display.value += 'fact(';
    } else {
      display.value += func + '(';
    }
  }

  function clearDisplay() {
    display.value = '';
  }

  function backspace() {
    display.value = display.value.slice(0, -1);
  }

  function toggleMode() {
    document.body.classList.toggle('light');
  }

  function toggleAngleMode() {
    isDegree = !isDegree;
    angleMode.textContent = isDegree ? 'DEG' : 'RAD';
  }

  function degToRad(x) {
    return `(${x}) * Math.PI / 180`;
  }

  function fact(n) {
    n = Math.floor(Number(n));
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * fact(n - 1);
  }

  function calculate() {
    try {
      let expression = display.value;

      if (isDegree) {
        expression = expression
          .replace(/sin\(([^)]+)\)/g, (_, x) => `Math.sin(${degToRad(x)})`)
          .replace(/cos\(([^)]+)\)/g, (_, x) => `Math.cos(${degToRad(x)})`)
          .replace(/tan\(([^)]+)\)/g, (_, x) => `Math.tan(${degToRad(x)})`);
      } else {
        expression = expression
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(');
      }

      expression = expression
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log(')
        .replace(/fact\(([^)]+)\)/g, (_, n) => `fact(${n})`);

      const result = eval(expression);
      history.unshift(`${display.value} = ${result}`);
      history = history.slice(0, 5);
      updateHistory();
      display.value = result;
    } catch (e) {
      display.value = 'Error';
    }
  }

  function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      historyList.appendChild(li);
    });
  }

  document.addEventListener('keydown', function (e) {
    const key = e.key;
    if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
      appendValue(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === 'Escape') {
      clearDisplay();
    }
  });
