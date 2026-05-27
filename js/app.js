document.addEventListener(
  'DOMContentLoaded',
  () => {

    const loginForm =
      document.getElementById('loginForm');

    loginForm.addEventListener(
      'submit',
      async e => {

        e.preventDefault();

        const email =
          document.getElementById('email').value;

        const password =
          document.getElementById('password').value;

        await login(email, password);
      }
    );

    document
      .getElementById('logoutBtn')
      .addEventListener('click', logout);

    setupSearch();
  }
);

// Hacer funciones públicas
window.openCreateModal = openCreateModal;
window.openEditModal = openEditModal;
window.closeModal = closeModal;
window.deleteTask = deleteTask;