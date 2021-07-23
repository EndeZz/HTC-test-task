window.onload = function () {
  // Modal
  const buttonSignIn = document.getElementById('btn_sign-in');
  const buttonOpenSignIn = document.getElementById('btn_open-sign-in');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const body = document.querySelector('body');

  const showModal = (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
  };

  const hideModal = () => {
    modal.classList.add('hidden');
  };

  const showOverlay = (e) => {
    e.preventDefault();
    overlay.classList.remove('hidden');
    body.style.overflow = 'hidden';
    showModal(e);
  };

  const hideOverlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    overlay.classList.add('hidden');
    body.style.overflow = 'visible';
    hideModal(e);
  };

  const hideOverlayByKeydown = (e) => {
    e = e || window.event;
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      hideOverlay(e);
    }
  };

  buttonOpenSignIn.addEventListener('click', showOverlay);
  overlay.addEventListener('click', hideOverlay);
  document.addEventListener('keydown', hideOverlayByKeydown);

  // Tabs toggle
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
