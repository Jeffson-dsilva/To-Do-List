document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  const showAllButton = document.getElementById('show-all');
  const showCompletedButton = document.getElementById('show-completed');
  const showIncompleteButton = document.getElementById('show-incomplete');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const renderTasks = (filter) => {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    if (filter === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.text;
      taskItem.className = task.completed ? 'completed' : '';

      const toggleButton = document.createElement('button');
      toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
      toggleButton.addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        renderTasks(filter);
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        saveTasksToLocalStorage();
        renderTasks(filter);
      });


       const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
        const newTaskText = prompt('Edit your task:', task.text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
          task.text = newTaskText.trim();
          saveTasksToLocalStorage();
          renderTasks(filter);
        }
      });

      
      taskItem.appendChild(toggleButton);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      
      taskList.appendChild(taskItem);
    });
  };

  showAllButton.addEventListener('click', () => renderTasks('all'));
  showCompletedButton.addEventListener('click', () => renderTasks('completed'));
  showIncompleteButton.addEventListener('click', () => renderTasks('incomplete'));

  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = '';
      saveTasksToLocalStorage();
      renderTasks('all');
    }
  };

  addTaskButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  const updateClock = () => {
    const clock = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedHours = hours.toString().padStart(2, '0');

    clock.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  setInterval(updateClock, 1000);
  updateClock();

  renderTasks('all');
});

  
