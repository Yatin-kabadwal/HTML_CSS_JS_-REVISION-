// function updateClock() {
//   // Get current time
//   let now = new Date();
  
//   // Extract hours, minutes, seconds
//   let hours = now.getHours();
//   let minutes = now.getMinutes();
//   let seconds = now.getSeconds();

//   // Add leading zeros if needed (e.g., 08 instead of 8)
//   hours = hours < 10 ? "0" + hours : hours;
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   // Format time as HH:MM:SS
//   let time = `${hours}:${minutes}:${seconds}`;

//   // Display in the HTML div with id="clock"
//   document.getElementById("clock").innerText = time;
// }

// // Update every second
// setInterval(updateClock, 1000);

// // Show clock immediately on page load
// updateClock();


// var a = 10;
// if(a == "10"){
//   console.log("they are equal ")
// }
 
// if (a === "10"){
// console.log("they are same");
// }
// else{
//   console.log("The type is totally different")
// }














/* -------------------------
   Simple To-Do List App
   Features:
   - Add task
   - Toggle complete
   - Delete task
   - Clear completed / Clear all
   - Persist tasks in localStorage
   ------------------------- */

/* ---------- Helper: DOM references ---------- */
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const clearAllBtn = document.getElementById('clear-all');

/* ---------- Data: tasks array ---------- */
// Each task: { id: string, text: string, completed: boolean }
let tasks = [];

/* ---------- Initialize: load saved tasks ---------- */
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    try {
      tasks = JSON.parse(saved);
    } catch (err) {
      console.error('Could not parse tasks from localStorage', err);
      tasks = [];
    }
  }
}
loadTasks();

/* ---------- Save tasks to localStorage ---------- */
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* ---------- Utility: create unique id ---------- */
function createId() {
  // Simple unique id using timestamp + random; good enough for this app
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---------- Render tasks into the DOM ---------- */
function renderTasks() {
  // Clear the current list
  taskList.innerHTML = '';

  // If no tasks, show a friendly message
  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'task-item';
    empty.innerHTML = '<div class="task-text">No tasks yet. Add your first task above ✨</div>';
    taskList.appendChild(empty);
    return;
  }

  // Create DOM nodes for each task
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id; // store id for event delegation

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Mark task complete');

    // Task text
    const span = document.createElement('div');
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.textContent = task.text;

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.setAttribute('aria-label', 'Delete task');

    // Append elements to li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    // Append li to list
    taskList.appendChild(li);
  });
}

/* ---------- Add new task ---------- */
taskForm.addEventListener('submit', function (e) {
  e.preventDefault(); // prevent form submission reload

  const text = taskInput.value.trim();
  if (!text) return; // required is set on input, but double-check

  const newTask = {
    id: createId(),
    text,
    completed: false
  };

  tasks.unshift(newTask); // add to the top
  saveTasks();
  renderTasks();

  taskForm.reset();        // clear the input
  taskInput.focus();       // keep keyboard focus on input
});

/* ---------- Event delegation on task list ---------- */
/* We listen on the parent <ul> and detect clicks on children
   This avoids adding listeners to each element separately. */
taskList.addEventListener('click', function (e) {
  const li = e.target.closest('li.task-item');
  if (!li) return; // clicked outside a task item
  const id = li.dataset.id;
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) return;

  // If delete button clicked
  if (e.target.matches('button.delete-btn')) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
    return;
  }

  // If checkbox clicked (toggle completed)
  if (e.target.matches('input[type="checkbox"]')) {
    tasks[taskIndex].completed = e.target.checked;
    saveTasks();
    renderTasks();
    return;
  }

  // Optional: clicking on text toggles completed too
  if (e.target.matches('.task-text')) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    renderTasks();
    return;
  }
});

/* ---------- Clear completed ---------- */
clearCompletedBtn.addEventListener('click', function () {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
});

/* ---------- Clear all (with confirmation) ---------- */
clearAllBtn.addEventListener('click', function () {
  if (!tasks.length) return;
  if (confirm('Clear ALL tasks? This cannot be undone.')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

/* ---------- Initial render ---------- */
renderTasks();


