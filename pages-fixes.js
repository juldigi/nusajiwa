'use strict';
(function () {
  const scene = document.getElementById('nj35');
  if (!scene) return;
  const returnButton = document.getElementById('nj35Return');
  const style = document.createElement('style');
  style.textContent = '#nj35[hidden]{display:none!important}#nj35Return[hidden]{display:none!important}';
  document.head.append(style);
  scene.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button || (button.id !== 'nj35Legacy' && !button.dataset.njarchive)) return;
    event.stopImmediatePropagation();
    scene.hidden = true;
    document.body.classList.remove('nj35-playing');
    if (returnButton) returnButton.hidden = false;
    if (typeof render === 'function') render();
  }, true);
})();
