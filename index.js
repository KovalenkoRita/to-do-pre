let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const submitButton = formElement.querySelector(".to-do__submit");
submitButton.addEventListener('click', addTask);

function addTask(evt) {
	evt.preventDefault(); 
	let inputValue = inputElement.value; 
	listElement.prepend(createItem(inputValue)); 
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
}

function loadTasks() {
	if (localStorage.length > 0) {
		const tasks = localStorage.getItem("tasks");
		return JSON.parse(tasks)
	}
	return items
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;
	deleteButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	});

	editButton.addEventListener('click', function() {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	})

	textElement.addEventListener('blur', function() {
		textElement.setAttribute("contenteditable", "false");
		const tasks = getTasksFromDOM();
		saveTasks(tasks);
	})
	
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	let tasks = [];
	itemsNamesElements.forEach((item) => {tasks.push(item.textContent);})
	return tasks;
}

function saveTasks(tasks) {
	const jsonTasks = JSON.stringify(tasks);
	localStorage.setItem("tasks", jsonTasks);
}

items = loadTasks();
items.forEach((item) => {listElement.append(createItem(item));})