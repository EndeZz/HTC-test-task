window.onload = function () {
  const buttonMovies = document.querySelector('.button__movies');
  const buttonTV = document.querySelector('.button__tv');
  const tabsContent = document.querySelectorAll('.tabs__content');

  function tvMode(event) {
    if (event.target.classList.contains('button__tabs_active') !== null) {
      buttonMovies.classList.add('button__tabs_active');
      buttonTV.classList.remove('button__tabs_active');
      tabsContent.forEach((key) => {
        key.classList.toggle('hidden');
      });
    }
  }

  function moviesMode(event) {
    if (event.target.classList.contains('button__tabs_active') !== null) {
      buttonMovies.classList.remove('button__tabs_active');
      buttonTV.classList.add('button__tabs_active');
      tabsContent.forEach((key) => {
        key.classList.toggle('hidden');
      });
    }
  }

  buttonMovies.addEventListener('click', tvMode);
  buttonTV.addEventListener('click', moviesMode);
};
