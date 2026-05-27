async function login(email, password) {

  const res = await fetch(`${API_URL}/users`);

  const users = await res.json();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {

    app.currentUser = user;

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

    document
      .getElementById('loginView')
      .classList.add('hidden-login');

    document
      .getElementById('dashboardView')
      .classList.remove('hidden-dashboard');

    document.getElementById('userRole')
      .textContent = user.role;

    await fetchUsers();

    await fetchTasks();
  }
}

function logout() {

  app.currentUser = null;

  localStorage.removeItem('currentUser');

  document
    .getElementById('loginView')
    .classList.remove('hidden-login');

  document
    .getElementById('dashboardView')
    .classList.add('hidden-dashboard');
}