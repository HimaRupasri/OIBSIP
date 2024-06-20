let tasks = [];
let completedTasks = [];
let taskIdCounter = 1;

// DOM elements
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');

// Event listeners
todoForm.addEventListener('submit', addTask);

// Functions
function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: taskIdCounter++,
            text: taskText,
            completed: false,
            datetimeAdded: new Date()
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="complete" onclick="completeTask(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'completed';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="delete" onclick="deleteCompletedTask(${task.id})">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(li);
    });
}

function completeTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        const completedTask = tasks.splice(taskIndex, 1)[0];
        completedTasks.push(completedTask);
        renderTasks();
    }
}

function editTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        const editedText = prompt('Edit Task:', tasks[taskIndex].text);
        if (editedText !== null && editedText.trim() !== '') {
            tasks[taskIndex].text = editedText.trim();
            renderTasks();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function deleteCompletedTask(id) {
    completedTasks = completedTasks.filter(task => task.id !== id);
    renderTasks();
}

renderTasks();
