const { invoke } = window.__TAURI__.core;

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('btn-generate');
  const result = document.getElementById('result');
  
  generateBtn.addEventListener('click', async () => {
    const fullYear = document.getElementById('chk-year').checked;
    const reverseOrder = document.getElementById('chk-order').checked;
    const includeLeftZeros = document.getElementById('chk-left-zeros').checked;
    const separator = document.getElementById('inp-separator').value;
  
    result.innerText = await invoke('calculate_date', {
      fullYear: fullYear,
      separator: separator,
      reverseOrder: reverseOrder,
      leftZero: includeLeftZeros
    });
  });
});
