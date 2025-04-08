// Load existing tasks from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTask(task.text, task.completed));
  
    // Load theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
  
  // Function to save all tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
      tasks.push({
        text: li.firstChild.textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Function to add a new task
  function addTask(taskText = null, completed = false) {
    const input = document.getElementById("taskInput");
    const text = taskText || input.value.trim();
    if (text === "") return;
  
    const li = document.createElement("li");
    li.textContent = text;
  
    if (completed) {
      li.classList.add("completed");
    }
  
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };
    li.appendChild(deleteBtn);
  
    document.getElementById("taskList").appendChild(li);
    input.value = "";
    saveTasks();
  }
  
  // Dark mode toggle
  const darkToggle = document.getElementById("darkModeToggle");
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
  