// Conceptual interface only. No network, wallet, execution or crediting code.
const observedSources = new Set();
const list = document.querySelector('#observations');
function observe(source) {
  const repeated = observedSources.has(source);
  const alreadyKnown = observedSources.size > 0;
  observedSources.add(source);
  document.querySelector('#unique').textContent = '1';
  document.querySelector('#sources').textContent = String(observedSources.size);
  document.querySelector('#feedback').textContent = repeated
    ? 'Repeated observation: the same fixture remains one unique action. Zero XP issued.'
    : alreadyKnown
      ? 'Cross-route duplicate: provenance retained; no additional economic action or XP.'
      : 'Synthetic execution recorded once. Eligibility is not assessed; zero XP issued.';
  const item = document.createElement('li');
  item.textContent = `${source}: fixture:execution-alpha · ${alreadyKnown ? 'existing economic identity' : 'new synthetic identity'}`;
  list.prepend(item);
  while (list.children.length > 4) list.lastElementChild.remove();
}
document.querySelector('#observe-nado').addEventListener('click', () => observe('NADO'));
document.querySelector('#observe-route').addEventListener('click', () => observe('Otomate'));
document.querySelector('#reset').addEventListener('click', () => {
  observedSources.clear(); list.replaceChildren();
  document.querySelector('#unique').textContent = '0';
  document.querySelector('#sources').textContent = '0';
  document.querySelector('#feedback').textContent = 'Choose a route to inspect the synthetic execution.';
});
