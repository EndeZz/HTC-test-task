window.onload = function () {
  // Modal
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

  // Login form with localStorage

  const form = document.getElementById('form');
  const userName = form.querySelector('#user-name');
  const userPass = form.querySelector('#user-password');
  const errorField = form.querySelector('.errorField');
  const userAuth = document.getElementById('user-auth');
  const buttonSignOut = document.getElementById('btn_sign-out');
  const checkbox = document.getElementById('auth-remember');

  /*
  Прошу прощения за приведенный ниже код, 
  но по другому без данного "костыля" не работает
  */

  function load() {
    checkbox.checked = localStorage.getItem('checkbox') === 'true' ? true : false;
    // console.log('Checkbox прожат:', checkbox.checked);
    // console.log('Состояние:', sessionStorage.getItem('reloaded'));

    if (checkbox.checked && sessionStorage.getItem('reloaded') === 'true') {
      buttonOpenSignIn.classList.add('hidden');
      userAuth.classList.remove('hidden');
      buttonSignOut.classList.remove('hidden');
      userAuth.value = localStorage.getItem('user');
    }
    buttonSignOut.addEventListener('click', signOut);
  }

  function signOut() {
    sessionStorage.setItem('reloaded', false);
    window.localStorage.clear();
    window.location.reload();
  }

  load();

  const submitForm = (e) => {
    const isName = userName.value;
    const isPass = userPass.value;
    e.preventDefault();

    if (isName.length >= 3 && isPass.length >= 3) {
      sessionStorage.setItem('reloaded', true);
      localStorage.setItem('user', isName);
      localStorage.setItem('checkbox', checkbox.checked);
      hideOverlay(e);
      buttonOpenSignIn.classList.add('hidden');
      buttonSignOut.classList.remove('hidden');
      userAuth.classList.remove('hidden');
      // load();
      userAuth.value = localStorage.getItem('user');
    } else {
      errorField.textContent = 'Неправильно введенные данные';
    }
  };

  const loginChange = () => {
    localStorage.setItem('user', userAuth.value);
  };

  form.addEventListener('submit', submitForm);
  userAuth.addEventListener('change', loginChange);
};
