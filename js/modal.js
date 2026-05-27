function closeModal() {

  document
    .getElementById('taskModal')
    .classList.add('hidden');
}

function openCreateModal() {

  if (app.currentUser.role !== 'admin') {
    alert('Solo admin');
    return;
  }

  document
    .getElementById('taskModal')
    .classList.remove('hidden');
}

function openEditModal(taskId) {

  const task = app.tasks.find(
    t => t.id === taskId
  );

  if (!task) return;

  document.getElementById('taskTitle')
    .value = task.title;

  document
    .getElementById('taskModal')
    .classList.remove('hidden');
}