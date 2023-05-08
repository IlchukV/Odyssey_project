const refs = {
  themeSwitcher: document.querySelector('#slider'),
  html: document.querySelector('html'),
};

let themeValue = refs.html.dataset.theme;

refs.themeSwitcher.addEventListener('click', onThemeSwitcher);

function onThemeSwitcher() {
  if (refs.html.dataset.theme === 'dark') {
    refs.html.setAttribute('data-theme', 'light');
    themeValue = refs.html.dataset.theme;
    setLocalStorageTheme(themeValue);
  } else {
    refs.html.setAttribute('data-theme', 'dark');
    themeValue = refs.html.dataset.theme;
    setLocalStorageTheme(themeValue);
  }
}

function setLocalStorageTheme(themeValue) {
  localStorage.setItem('theme', themeValue);
}

function getLocalStorageTheme() {}
