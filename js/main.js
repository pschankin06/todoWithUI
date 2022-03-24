'use strict';
import {
    UI_ELEMENTS,
} from './view.js';

const STATUSES = {
    TO_DO: 'To Do',
    DONE: 'Done',
}

const PRIORITY = {
    LOW: 'Low',
    HIGH: 'High'
}

const DEFAULT = {
    STATUS: STATUSES.TO_DO,
    PRIORITY: PRIORITY.LOW
}

const list = [{
        name: 'Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.',
        status: STATUSES.TO_DO,
        priority: PRIORITY.HIGH
    }, {
        name: 'Сверстать этот TODO list',
        status: STATUSES.TO_DO,
        priority: PRIORITY.HIGH
    }, {
        name: 'Начать делать задачу',
        status: STATUSES.DONE,
        priority: PRIORITY.HIGH
    },
    {
        name: 'Посмотреть ютубчик',
        status: STATUSES.TO_DO,
        priority: PRIORITY.LOW
    }
]

export function addTaskToList() {
    try {
        const inputValue = this.children[0].children[0].value;
        if (!inputValue) {
            throw new Error('This field cannot be empty');
        }
        list.push({
            name: inputValue,
            status: DEFAULT.STATUS,
            priority: inputValue === UI_ELEMENTS.INPUT_HIGH ? PRIORITY.HIGH : DEFAULT.PRIORITY
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

export function changeStatus() {
    try {
        const isDone = this.classList.contains("task__checkbox--done");
        const taskName = this.nextElementSibling;
        let index = list.findIndex(item => item.name === taskName.textContent);
        !!isDone ? list[index].status = DEFAULT.STATUS : list[index].status = STATUSES.DONE;
    } catch (error) {
        alert(error);
    }

}

export function deleteTaskFromList() {
    try {
        const taskName = this.previousElementSibling;
        let index = list.findIndex(item => item.name === taskName.textContent);
        if (index >= 0) {
            list.splice(index, 1);
        }
    } catch (error) {
        alert(error);
    }
}