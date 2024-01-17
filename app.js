// app.js

const tasks = [];

function addTask() {
    const taskInput = document.getElementById('task');
    const prioritySelect = document.getElementById('priority');

    const task = {
        text: taskInput.value,
        priority: prioritySelect.value,
        completed: false,
    };

    tasks.push(task);
    displayTasks();
    taskInput.value = ''; // 입력 필드 비우기
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = getPriorityLabel(task.priority);

        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.addEventListener('click', () => editTask(index));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(document.createTextNode(task.text));
        taskElement.appendChild(priorityLabel);
        taskElement.appendChild(editButton);
        taskList.appendChild(taskElement);
    });
}

function getPriorityLabel(priorityValue) {
    switch (priorityValue) {
        case 'high':
            return ' [아주 높음]';
        case 'medium':
            return ' [높음]';
        case 'low':
            return ' [보통]';
        case 'very-low':
            return ' [낮음]';
        default:
            return '';
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function editTask(index) {
    const newText = prompt('수정할 내용을 입력하세요:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        displayTasks();
    }
}

function showAll() {
    displayTasks();
}

function showCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    displayFilteredTasks(completedTasks);
}

function showUncompleted() {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    displayFilteredTasks(uncompletedTasks);
}

function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        const priorityLabel = document.createElement('label');
        priorityLabel.textContent = getPriorityLabel(task.priority);

        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.addEventListener('click', () => editTask(index));

        taskElement.appendChild(checkbox);
        taskElement.appendChild(document.createTextNode(task.text));
        taskElement.appendChild(priorityLabel);
        taskElement.appendChild(editButton);
        taskList.appendChild(taskElement);
    });
}

function toggleSort() {
    tasks.sort((a, b) => {
        return a.priority.localeCompare(b.priority);
    });

    displayTasks();
}
