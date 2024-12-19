
const ftList = document.getElementById('ft_list');
const newButton = document.getElementById('new');

// Load tasks from cookies on page load
window.onload = function () {
    const savedTasks = getCookie('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(task => addTask(task));
    }
};

// Add a new task
newButton.addEventListener('click', () => {
    const task = prompt('Enter a new task:');
    if (task) {
        addTask(task);
        saveTasksToCookies();
    }
});

// Add task to the DOM
function addTask(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'todo';
    taskDiv.textContent = taskText;
    taskDiv.addEventListener('click', () => removeTask(taskDiv));
    ftList.prepend(taskDiv);
}

// Remove a task
function removeTask(taskDiv) {
    const confirmDelete = confirm('Do you want to remove this task?');
    if (confirmDelete) {
        taskDiv.remove();
        saveTasksToCookies();
    }
}

// Save tasks to cookies
function saveTasksToCookies() {
    const tasks = Array.from(ftList.children).map(task => task.textContent);
    document.cookie = `tasks=${JSON.stringify(tasks)};path=/;`; // Save as JSON
}

// Get cookies
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
