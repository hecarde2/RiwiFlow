// Configuration
const API_URL = 'http://localhost:3000';

// State Management
const app = {
  currentUser: null,
  tasks: [],
  users: [],
  filteredTasks: [],
};

// Utilities
function showElement(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideElement(id) {
  document.getElementById(id).classList.add('hidden');
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-md rounded-lg text-on-${type === 'error' ? 'error' : 'surface'} ${type === 'error' ? 'bg-error' : 'bg-primary'} z-50`;
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// API Calls
async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    app.users = await res.json();
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}

async function fetchTasks() {
  try {
    const res = await fetch(`${API_URL}/tasks`);
    app.tasks = await res.json();
    app.filteredTasks = [...app.tasks];
    renderKanban();
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
}

async function createTask(task) {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (res.ok) {
      await fetchTasks();
      showNotification('Task created successfully!');
      closeModal();
    } else {
      console.error('Error response:', res.status);
      showNotification('Error creating task', 'error');
    }
  } catch (err) {
    console.error('Error creating task:', err);
    showNotification('Error creating task: ' + err.message, 'error');
  }
}

async function updateTask(id, task) {
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (res.ok) {
      await fetchTasks();
      showNotification('Task updated successfully!');
      closeModal();
    }
  } catch (err) {
    console.error('Error updating task:', err);
    showNotification('Error updating task', 'error');
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  try {
    const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchTasks();
      showNotification('Task deleted successfully!');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
    showNotification('Error deleting task', 'error');
  }
}

// Authentication
async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      app.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      hideElement('loginView');
      showElement('dashboardView');
      document.getElementById('userRole').textContent = user.role.toUpperCase();
      await fetchUsers();
      await fetchTasks();
      return true;
    } else {
      document.getElementById('loginError').classList.remove('hidden');
      document.getElementById('loginError').textContent = 'Invalid email or password';
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    showNotification('Login error', 'error');
    return false;
  }
}

function logout() {
  app.currentUser = null;
  localStorage.removeItem('currentUser');
  showElement('loginView');
  hideElement('dashboardView');
  document.getElementById('loginForm').reset();
  document.getElementById('loginError').classList.add('hidden');
}

// Kanban Rendering
function renderKanban() {
  const statuses = ['todo', 'in_progress', 'in_review', 'done'];
  
  statuses.forEach(status => {
    const column = document.getElementById(`column-${status}`);
    const count = document.getElementById(`count-${status}`);
    const tasks = app.filteredTasks.filter(t => t.status === status);
    
    if (count) count.textContent = tasks.length;
    if (column) {
      column.innerHTML = tasks.map(task => createTaskCard(task)).join('');
    }
  });
}

function createTaskCard(task) {
  const user = app.users.find(u => u.id === task.userId);
  const canEdit = app.currentUser.role === 'admin' || task.userId === app.currentUser.id;
  
  return `
    <div class="task-card bg-surface border border-outline-variant rounded-xl p-md shadow-sm ${canEdit ? 'cursor-pointer' : ''}" ${canEdit ? `onclick="openEditModal(${task.id})"` : ''}>
      <h4 class="font-label-md text-label-md text-on-surface mb-xs">${task.title}</h4>
      <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${task.description}</p>
      <div class="mt-md flex items-center justify-between">
        <span class="text-xs text-on-surface-variant">${user?.name || 'Unassigned'}</span>
        ${app.currentUser.role === 'admin' ? `<button onclick="event.stopPropagation(); deleteTask(${task.id})" class="text-error hover:bg-error/10 p-1 rounded">✕</button>` : ''}
      </div>
    </div>
  `;
}

// Modal Management
function closeModal() {
  document.getElementById('taskModal').classList.add('hidden');
}

function openCreateModal() {
  if (app.currentUser.role !== 'admin') {
    showNotification('Only admins can create tasks', 'error');
    return;
  }
  
  document.getElementById('modalTitle').textContent = 'Create Task';
  document.getElementById('taskId').value = '';
  document.getElementById('taskForm').reset();
  document.getElementById('taskModal').classList.remove('hidden');
  populateUserSelect();
}

function openEditModal(taskId) {
  const task = app.tasks.find(t => t.id === taskId);
  if (!task) return;
  
  const canEdit = app.currentUser.role === 'admin' || task.userId === app.currentUser.id;
  
  if (!canEdit) {
    showNotification('You cannot edit this task', 'error');
    return;
  }
  
  document.getElementById('modalTitle').textContent = 'Edit Task';
  document.getElementById('taskId').value = taskId;
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskStatus').value = task.status;
  document.getElementById('taskUserId').value = task.userId;
  
  if (app.currentUser.role !== 'admin') {
    document.getElementById('taskTitle').disabled = true;
    document.getElementById('assignUserDiv').style.display = 'none';
  } else {
    document.getElementById('taskTitle').disabled = false;
    document.getElementById('assignUserDiv').style.display = 'block';
  }
  
  populateUserSelect();
  document.getElementById('taskModal').classList.remove('hidden');
}

function populateUserSelect() {
  const select = document.getElementById('taskUserId');
  if (select) {
    select.innerHTML = app.users
      .filter(u => u.role === 'coder')
      .map(u => `<option value="${u.id}">${u.name}</option>`)
      .join('');
  }
}

// Search Functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (query.trim() === '') {
        app.filteredTasks = [...app.tasks];
      } else {
        app.filteredTasks = app.tasks.filter(t =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
        );
      }
      renderKanban();
    });
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      await login(email, password);
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const taskId = document.getElementById('taskId').value;
      const task = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        status: document.getElementById('taskStatus').value,
        userId: parseInt(document.getElementById('taskUserId').value),
      };
      
      if (taskId) {
        await updateTask(taskId, task);
      } else {
        await createTask(task);
      }
    });
  }

  const taskModal = document.getElementById('taskModal');
  if (taskModal) {
    taskModal.addEventListener('click', (e) => {
      if (e.target === taskModal) {
        closeModal();
      }
    });
  }

  // Initialize App
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    app.currentUser = JSON.parse(savedUser);
    hideElement('loginView');
    showElement('dashboardView');
    document.getElementById('userRole').textContent = app.currentUser.role.toUpperCase();
    fetchUsers();
    fetchTasks();
  } else {
    showElement('loginView');
    hideElement('dashboardView');
  }

  setupSearch();
});

// Expose functions for HTML onclick handlers
window.openCreateModal = openCreateModal;
window.openEditModal = openEditModal;
window.deleteTask = deleteTask;
window.closeModal = closeModal;
