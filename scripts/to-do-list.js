// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Listen for the Enter key press in the task input field
document.getElementById("task").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask(); // Calls addTask() when Enter is pressed
  }
});

// Function to add a new task to the list
function addTask() {
  let taskInput = document.getElementById("task"); // Get task input field
  let dateInput = document.getElementById("date"); // Get date input field
  let message = document.getElementById("message"); // Get the message elelment
  let taskText = taskInput.value.trim(); // Get task text and remove extra spaces
  let taskDate = dateInput.value; // Get the selected date

  // Validation: Ensure task and date are provided
  if (taskText === "") {
    message.textContent = "Please enter a task.";
    return;
  }
  if (taskDate === "") {
    message.textContent = "Please select a date.";
    return;
  }

  saveTasks(); // Save updated tasks to the localStorage

  // Clear any previous error messages
  message.textContent = "";

  let taskList = document.getElementById("taskList"); // Get task list
  let li = document.createElement("li"); // Create a new list item

  // Add task text and date, with a delete button
  li.innerHTML = `${taskText} (${taskDate})<button class='delete' onclick='removeTask(this)'>X</button>`;
  taskList.appendChild(li); // Append the new task to the list

  saveTasks(); // Save updated tasks to localStorage
  
  // Clear input fields after adding task 
  taskInput.value = "";
  dateInput.value = "";
}

// Function to delete a task when the delete button is clicked
function removeTask(element) {
  element.parentElement.remove(); // Remove the corresponding list item
  saveTasks(); // Save updated tasks to localStorage
}

// Function to save tasks in localStorage
function saveTasks() {
  let tasks = []; // Array to store task list items
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push(li.textContent.replace("X", "").trim()); // Store task text (excluding 'X' button)
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
}

// Function to load tasks from localStorage on page load
function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get stored tasks or an empty array
  let taskList = document.getElementById("taskList"); // Get task list element

  // Add saved tasks to the list
  savedTasks.forEach(task => {
    let li = document.createElement("li"); // Create a new list item
    li.innerHTML = `${task} <button class='delete' onclick='removeTask(this)'>X</button>`; // Restore task
    taskList.appendChild(li); // Append task to the list
  });
}


