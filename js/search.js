function setupSearch() {

  const searchInput =
    document.getElementById('searchInput');

  searchInput.addEventListener('input', e => {

    const query =
      e.target.value.toLowerCase();

    app.filteredTasks = app.tasks.filter(task =>

      task.title.toLowerCase().includes(query)

    );

    renderKanban();
  });
}