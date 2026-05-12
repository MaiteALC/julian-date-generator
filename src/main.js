const { invoke } = window.__TAURI__.core;
const defaultResultColor = '#54e059';

function hideMenu(menuElement) {
  menuElement.classList.add('is-hidden');
  
  const result = menuElement.querySelector('.result');
  result.innerText = '---';
  result.style.color = defaultResultColor;
  
  menuElement.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => input.value = '');
}

function showMenu(menuElement) {
  menuElement.classList.remove('is-hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const openGenerationMenuBtn = document.getElementById('btn-generation-menu');
  const openReversionMenuBtn = document.getElementById('btn-reversion-menu');
  
  const generationMenu = document.getElementById('generate-date-menu');
  const reversionMenu = document.getElementById('revert-date-menu');

  const generateBtn = document.getElementById('btn-generate');
  const revertBtn = document.getElementById('btn-revert');
  
  const closeGenerationMenuBtn = document.querySelector('#generate-date-menu .btn-close');
  const closeReversionMenuBtn = document.querySelector('#revert-date-menu .btn-close');
  
  openGenerationMenuBtn.addEventListener('click', () => { 
    hideMenu(reversionMenu); 
    showMenu(generationMenu);
  });
  
  openReversionMenuBtn.addEventListener('click', () => { 
    hideMenu(generationMenu); 
    showMenu(reversionMenu);
  });
  
  closeGenerationMenuBtn.addEventListener('click', () => { 
    hideMenu(generationMenu);
  });

  closeReversionMenuBtn.addEventListener('click', () => { 
    hideMenu(reversionMenu); 
  });

  generateBtn.addEventListener('click', async () => {
    const fullYear = document.getElementById('chk-year').checked;
    const reverseOrder = document.getElementById('chk-order').checked;
    const includeLeadingZeros = document.getElementById('chk-leading-zeros').checked;
    const separator = document.getElementById('inp-separator').value;
    const result = document.querySelector('#generation-result .result');
    
    try {
      const generatedDate = await invoke('calculate_date', {
        fullYear: fullYear,
        separator: separator,
        reverseOrder: reverseOrder,
        leadingZeros: includeLeadingZeros
      });

      result.style.color = defaultResultColor;
      result.innerText = generatedDate;

    } catch (e) {
      result.style.color = 'red';

      result.innerText = `Erro: ${e}
      Valores fornecidos: Ano Completo = ${fullYear} Separador = "${separator}" 
      Ordem Reversa = ${reverseOrder} Zeros à Esquerda: ${includeLeadingZeros}`;
    }
  });
  
  revertBtn.addEventListener('click', async () => {
    const julianDay = Number(document.getElementById('inp-julian-date').value);
    const year = Number(document.getElementById('inp-year').value);
    const result = document.querySelector('#reversion-result .result');

    try {
      const originalDate = await invoke('revert_julian_date', {year: year, julianDay: julianDay});

      result.style.color = defaultResultColor;
      result.innerText = originalDate;

    } catch (e) {
      result.style.color = 'red';

      result.innerText = `Erro: ${e}
      Valores fornecidos: Ano = ${year} Dia = ${julianDay}`;
    }
  });
});
