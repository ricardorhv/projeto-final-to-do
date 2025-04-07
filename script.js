const tasks = []

const btnCreateTask = document.getElementById('btn-create-task')

function showTasksListContainer() {
  const emptyTasksElement = document.getElementById('empty-tasks')
  const tasksListElement = document.getElementById('tasks-list')

  tasksListElement.classList.remove('hidden')
  emptyTasksElement.classList.add('hidden')
}

function showEmptyTasksContainer() {
  const emptyTasksElement = document.getElementById('empty-tasks')
  const tasksListElement = document.getElementById('tasks-list')

  tasksListElement.classList.add('hidden')
  emptyTasksElement.classList.remove('hidden')
}

function loadTasksContainer() {
  const isTasksEmpty = tasks.length === 0

  if (isTasksEmpty) {
    showEmptyTasksContainer()
  } else {
    showTasksListContainer()
  }
}

function setCreatedTasksQuantity() {
  const createdTasksQuantityElement = document.getElementById('created-tasks-quantity')
  createdTasksQuantityElement.textContent = tasks.length
}

function setCompletedTasksQuantity() {}

function verifyIfTaskDescriptionIsEmpty(taskDescription) {
  const isTaskDescriptionEmpty = taskDescription.trim().length === 0
  return isTaskDescriptionEmpty
}

function createTaskItemElement({ description, isCompleted }) {
  const tasksListElement = document.getElementById('tasks-list')

  const taskItemContainerElement = document.createElement('div')
  taskItemContainerElement.classList.add('task-item')
  taskItemContainerElement.innerHTML = `
    <input ${isCompleted && 'checked'} type="checkbox" id="ck-task">

    <p>${description}</p>

    <button>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3D3D3D">
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </button>
  `

  tasksListElement.appendChild(taskItemContainerElement)
}

function addTask(taskDescription) {
  const taskId = Math.random().toString(16).substring(2)

  const task = {
    id: taskId,
    description: taskDescription,
    isCompleted: false
  }
  tasks.push(task)
  
  createTaskItemElement(task)
}

function clearInputDescription() {
  const taskDescriptionElement = document.getElementById('task-description')
  taskDescriptionElement.value = ''

  taskDescriptionElement.focus()
}

function handleAddTask() {
  const taskDescriptionElement = document.getElementById('task-description')
  const taskDescription = taskDescriptionElement.value

  const isTasksEmpty = tasks.length === 0

  if (verifyIfTaskDescriptionIsEmpty(taskDescription)) {
    alert("Descrição da tarefa vazia. Preencha o campo para adicionar uma tarefa!")
    taskDescriptionElement.focus()
    return
  }

  if (isTasksEmpty) showTasksListContainer()

  clearInputDescription()
  addTask(taskDescription)
  setCreatedTasksQuantity()
}

document.addEventListener('DOMContentLoaded', loadTasksContainer)

btnCreateTask.addEventListener('click', handleAddTask)