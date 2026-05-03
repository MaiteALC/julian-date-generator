const { invoke } = window.__TAURI__.core;

function hideGenerationMenu() {
  document.getElementById('generate-date-menu').classList.add('is-hidden');
  
  document.querySelector('#generation-result .result').innerText = '';
  document.getElementById('inp-separator').value = '';
}

function hideReversionMenu() {
  document.getElementById('revert-date-menu').classList.add('is-hidden');
  
  document.querySelector('#reversion-result .result').innerText = '';

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
    
    result.innerText = await invoke('calculate_date', {
      fullYear: fullYear,
      separator: separator,
      reverseOrder: reverseOrder,
      leadingZeros: includeLeadingZeros
    });
  });
  
  revertBtn.addEventListener('click', () => {
    const julianDay = Number(document.getElementById('inp-julian-date').value);
    const year = Number(document.getElementById('inp-year').value);
    const result = document.querySelector('#reversion-result .result');

    invoke('revert_julian_date', {year: year, julianDay: julianDay})
      .then((date) => {
        result.innerText = date;
      })
      .catch((error) => {
        result.innerText = `Erro: ${error}
        Valores fornecidos: Ano: ${year} Dia: ${julianDay}`;
      });
  });
});
