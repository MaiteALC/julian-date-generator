const { invoke } = window.__TAURI__.core;

function hideGenerationMenu() {
  document.getElementById('generate-date-menu').classList.add('is-hidden');
  
  const result = document.querySelector('#generation-result .result')
  result.innerText = '---';
  result.style.color = '#54e059';

  document.getElementById('inp-separator').value = '';
}

function hideReversionMenu() {
  document.getElementById('revert-date-menu').classList.add('is-hidden');
  
  const result = document.querySelector('#reversion-result .result');
  result.innerText = '---';
  result.style.color = '#54e059';

  document.getElementById('inp-julian-date').value = '';
  document.getElementById('inp-year').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const openGenerationMenuBtn = document.getElementById('btn-generation-menu');
  const openReversionMenuBtn = document.getElementById('btn-reversion-menu');
  
  const generationMenu = document.getElementById('generate-date-menu');
  const revertionMenu = document.getElementById('revert-date-menu');

  const generateBtn = document.getElementById('btn-generate');
  const revertBtn = document.getElementById('btn-revert');
  
  const closeGenerationMenuBtn = document.querySelector('#generate-date-menu .btn-close');
  const closeReversionMenuBtn = document.querySelector('#revert-date-menu .btn-close');
  
  openGenerationMenuBtn.addEventListener('click', () => {
    generationMenu.classList.remove('is-hidden');
    hideReversionMenu();
  });

  openReversionMenuBtn.addEventListener('click', () => {
    revertionMenu.classList.remove('is-hidden');
    hideGenerationMenu();
  });

  closeGenerationMenuBtn.addEventListener('click', hideGenerationMenu);

  closeReversionMenuBtn.addEventListener('click', hideReversionMenu);

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

      result.innerText = originalDate;

    } catch (e) {
      result.style.color = 'red';

      result.innerText = `Erro: ${e}
      Valores fornecidos: Ano = ${year} Dia = ${julianDay}`;
    }
  });
});
