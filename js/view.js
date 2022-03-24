import {
    changeStatus,
    addTaskToList,
    deleteTaskFromList
} from './main.js';

export const UI_ELEMENTS = {
    EXISTING_TASKS: document.querySelectorAll('.task__wrapper'),
    DELETE_BUTTONS: document.getElementsByClassName('delete-button'),
    CHECK_OUT_BUTTONS: document.getElementsByClassName('task__checkbox'),
    FORMS: document.getElementsByClassName('form'),
    INPUT_HIGH: document.querySelector('.main__new-task--high'),
    INPUT_LOW: document.querySelector('.main__new-task--low')
}

for (let button of UI_ELEMENTS.DELETE_BUTTONS) {
    button.addEventListener('click', deleteTaskFromList)
    button.addEventListener('click', deleteTask);
}

for (let button of UI_ELEMENTS.CHECK_OUT_BUTTONS) {
    button.addEventListener('click', changeStatus);
    button.addEventListener('click', toggleCheckOut);
}

for (let form of UI_ELEMENTS.FORMS) {
    form.addEventListener('submit', addTask);
    form.addTaskToList = addTaskToList;
    form.addTaskToUI = function () {
        try {
            const inputValue = this.children[0].children[0].value;
            if (!inputValue) {
                throw new Error('This field cannot be empty');
            }
            const newTask = document.querySelector('.template').cloneNode(true);
            newTask.classList.remove('template');
            newTask.children[0].addEventListener('click', changeStatus);
            newTask.children[0].addEventListener('click', toggleCheckOut);
            newTask.children[1].textContent = inputValue;
            newTask.children[2].addEventListener('click', deleteTaskFromList);
            newTask.children[2].addEventListener('click', deleteTask);
            this.append(newTask);
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    }
    form.resetInputValue = function () {
        this.children[0].children[0].value = '';
    }
}

function deleteTask() {
    this.closest('.task__wrapper').remove();
}

function toggleCheckOut() {
    this.classList.toggle('task__checkbox--done');
    this.parentElement.classList.toggle('task__wrapper--done');
}

function addTask() {
    this.addTaskToList();
    this.addTaskToUI();
    this.resetInputValue();
}