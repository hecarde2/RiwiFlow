async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    app.users = await res.json();
  } catch (err) {
    console.error(err);
  }
}

async function fetchTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    app.tasks = await res.json();

    app.filteredTasks = [...app.tasks];

    renderKanban();
  } catch (err) {
    console.error(err);
  }
}

async function createTask(task) {
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  fetchTasks();
}

async function updateTask(id, task) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });

  fetchTasks();
}