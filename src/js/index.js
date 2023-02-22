window.onload = () => {
    initialUISetup();
}

const initialUISetup = () => {
    document.getElementById('search').addEventListener('mouseover', () => addClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('mouseout', () => removeClassWithTimeout('searchLabel', 'hovered', 500));
    document.getElementById('search').addEventListener('keyup', (event) => searchInputHandler(event));
    document.getElementById('addTaskInput').addEventListener('keyup', (event) => validateField(event));
    document.getElementById('addButton').addEventListener('click', addNewTask);
    radioHandlerSetup();
}

const addClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.add(className)
    }, timeout)
}
const removeClassWithTimeout = (id, className, timeout) => {
    setTimeout(() => {
        document.getElementById(id).classList.remove(className)
    }, timeout)
}

const addClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.add(className)
}
const removeClassWithoutTimeout = (id, className) => {
    document.getElementById(id).classList.remove(className)
}

const validateField = (event) => {
    if (event.target.value.length > 0) {
        enableAddTaskButton();
    } else {
        disableAddTaskButton();
    }
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTask();
    }
}

const disableAddTaskButton = () => {
    const button = document.getElementById('addButton');
    removeClassWithoutTimeout('addButton', 'valid');
    button.setAttribute('disabled', '');
}

const enableAddTaskButton = () => {
    const button = document.getElementById('addButton');
    addClassWithoutTimeout('addButton', 'valid');
    button.removeAttribute('disabled');
}

const addNewTask = () => {
    const inputElement = document.getElementById('addTaskInput');
    const taskWrapper = document.createElement('div');
    const id = generateId(10);
    taskWrapper.innerHTML = getTaskTemplate(inputElement.value, id).trim();
    document.getElementById('taskList').append(taskWrapper.firstChild);
    inputElement.value = '';
    disableAddTaskButton();
    document.getElementById(id).addEventListener('click', (event) => onRadioClick(event));
}

const changeTaskStatus = (id) => {
    const taskElement = document.getElementById(id);
    taskElement.remove();
    document.getElementById('doneTaskList').append(taskElement);

}

const getTaskTemplate = (value, id) => {
    return `<div class ="task plainTask" id="${id}">
                <div class ="taskName">
                    <div class ="radio leftElement"><img width ='15' src="src/images/check.png"></div>
                    <span class ="taskTitle">${value}</span>
                </div>
            </div> `
}

const generateId = (idLength) => {
    let result = '';
    const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789';
    for (let i = 0; i < idLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
}

const onRadioClick = (event) => {
    const taskElement = event.target.closest('.task.plainTask');
    if (taskElement) {
        changeTaskStatus(taskElement.getAttribute('id'));
    }
}

const radioHandlerSetup = () => {
    const radioButtons = document.getElementsByClassName('radio');
    for (const radio of radioButtons) {
        radio.removeEventListener('click', (event) => onRadioClick(event));
        radio.addEventListener('click', (event) => onRadioClick(event));
    }
}

const searchInputHandler = (event) => {
    if (event.target.value.length > 0) {
        filterTasks(event.target.value);
    } else {
        clearFiltration();
    }
}

const filterTasks = (text) => {
    const taskElementsList = document.getElementsByClassName('task');
    for (const taskElement of taskElementsList) {
        const taskTitle = taskElement.getElementsByClassName('taskTitle')[0];
        if (!taskTitle || !taskTitle.innerHTML.includes(text)) {
            taskElement.classList.add('hidden');
        }
    }
}

const clearFiltration = () => {
    const taskElementsList = document.getElementsByClassName('task');
    for (const taskElement of taskElementsList) {
        taskElement.classList.remove('hidden');
    }
}