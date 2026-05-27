function renderKanban() {

  const statuses = [
    'todo',
    'in_progress',
    'in_review',
    'done'
  ];

  statuses.forEach(status => {

    const column = document.getElementById(
      `column-${status}`
    );

    const tasks = app.filteredTasks.filter(
      t => t.status === status
    );

    column.innerHTML = tasks
      .map(task => createTaskCard(task))
      .join('');
  });
}

function createTaskCard(task) {

  const user = app.users.find(
    u => u.id === task.userId
  );

  const canEdit =
    app.currentUser.role === 'admin'
    ||
    task.userId === app.currentUser.id;

  return `
    <div
      class="task-card"
      ${canEdit ? `onclick="openEditModal(${task.id})"` : ''}
    >

      <h3>${task.title}</h3>

      <p>${task.description}</p>

      <small>${user?.name}</small>

    </div>
  `;
}