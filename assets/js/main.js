window.onload = function () {
  // Modal
  const buttonOpenSignIn = document.querySelector('#btn_open-sign-in');
  const modal = document.querySelector('#modal');
  const overlay = document.querySelector('#overlay');
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
    body.style.overflowY = 'visible';
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
  const buttonTabs = document.querySelectorAll('.js-tabs');
  const tabsContent = document.querySelectorAll('.js-tabs-content');

  buttonTabs.forEach((tab, e) => {
    tabToggle(tab, e);
  });

  function tabToggle(tab, tabPost) {
    tab.addEventListener('click', function () {
      buttonTabs.forEach((e) => e.classList.remove('button__tabs_active'));
      tab.classList.add('button__tabs_active');
      tabsContent.forEach((e) => e.classList.add('hidden'));
      tabsContent[tabPost].classList.remove('hidden');
    });
  }

  // Login form with localStorage

  const form = document.querySelector('#form');
  const userName = form.querySelector('#user-name');
  const userPass = form.querySelector('#user-password');
  const errorField = form.querySelector('.modal__error');
  const checkbox = form.querySelector('#auth-remember');
  const userAuth = document.querySelector('#user-auth');
  const buttonSignOut = document.querySelector('#btn_sign-out');

  const signOut = () => {
    sessionStorage.setItem('reloaded', false);
    window.localStorage.clear();
    window.location.reload();
  };

  (function () {
    checkbox.checked = localStorage.getItem('checkbox') === 'true' ? true : false;

    if (checkbox.checked && sessionStorage.getItem('reloaded') === 'true') {
      buttonOpenSignIn.classList.add('hidden');
      userAuth.classList.remove('hidden');
      buttonSignOut.classList.remove('hidden');
      userAuth.value = localStorage.getItem('user');
    }
    buttonSignOut.addEventListener('click', signOut);
  })();

  const submitForm = (e) => {
    const isName = userName.value;
    const isPass = userPass.value;
    e.preventDefault();

    if (
      isName.trim() !== null &&
      isPass.trim() !== null &&
      isName.trim() !== '' &&
      isPass.trim() !== ''
    ) {
      sessionStorage.setItem('reloaded', true);
      localStorage.setItem('user', isName.replace(/\s+/g, ' ').trim());
      localStorage.setItem('checkbox', checkbox.checked);
      hideOverlay(e);
      buttonOpenSignIn.classList.add('hidden');
      buttonSignOut.classList.remove('hidden');
      userAuth.classList.remove('hidden');
      userAuth.value = localStorage.getItem('user');
    } else {
      errorField.classList.remove('hidden');
      errorField.textContent = 'Неправильно введены данные. Попробуйте снова.';
    }
  };

  const loginChange = () => {
    localStorage.setItem('user', userAuth.value);
  };

  form.addEventListener('submit', submitForm);
  userAuth.addEventListener('change', loginChange);
};
