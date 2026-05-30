// Script exécuté AVANT l'hydratation : applique le thème stocké
// pour éviter un flash de couleur au chargement. Doit rester sans
// dépendances et auto-exécutable (stringifié dans le layout).
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('yentec-theme');
    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;
