// Select DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks in the DOM
function renderTasks() {
    taskList.innerHTML = ''; // Clear the list
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(index));

        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Function to add a new task
function addTask() {
    const newTask = taskInput.value.trim();
    if (newTask) {
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
}

// Function to edit a task
function editTask(index) {
    const updatedTask = prompt('Edit your task:', tasks[index]);
    if (updatedTask !== null) {
        tasks[index] = updatedTask.trim();
        saveTasks();
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Event Listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial Render
renderTasks();
