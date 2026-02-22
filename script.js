let tasks = [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const progressPercent = document.getElementById("progress-percent");

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  progressText.textContent = `${completed} of ${total} completed`;
  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function renderTasks() {
  taskList.innerHTML = "";
  emptyState.classList.toggle("hidden", tasks.length > 0);

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task-item flex items-center gap-3 p-3 rounded-xl bg-gray-100 ${
      task.completed ? "completed" : ""
    }`;

    div.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""} />
      <span class="task-text flex-1">${task.text}</span>
      <button class="delete-btn">✕</button>
    `;

    div.querySelector("input").onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    div.querySelector(".delete-btn").onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    taskList.appendChild(div);
  });

  updateProgress();
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({ text, completed: false });
  taskInput.value = "";
  renderTasks();
});
