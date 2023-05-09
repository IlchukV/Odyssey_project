const rootElement = document.documentElement;
if (localStorage.getItem('theme')) {
  rootElement.setAttribute('data-theme', localStorage.getItem('theme'));
}

const themSwitcherFunction = () => {
  let dataAtribute = rootElement.getAttribute('data-theme');
  let newTheme = dataAtribute === 'light' ? 'dark' : 'light';
  rootElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};
document
  .querySelector('.theme-switcher')
  .addEventListener('click', themSwitcherFunction);
