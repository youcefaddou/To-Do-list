const taskInput = document.querySelector('#task-input')
const addTaskButton = document.querySelector('#add-task-button')
const taskList = document.querySelector('#task-list')

// Fonction pour ajouter une tâche à la liste
function addTask() {
    if (taskInput.value.trim() !== "") { // On vérifie si l'utilisateur a saisi une tâche non vide (.trim() efface tous les espaces blancs aux deux extremités)
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
        taskDiv.innerHTML = `
            <p class="task-content">${taskInput.value}</p>
            <div class="task-buttons">
                <button class="edit-button">Modifier</button>
                <button class="delete-button">Supprimer</button>
            </div>
        `
        taskList.appendChild(taskDiv) // On ajoute la div créée plus tôt au parent taskList
        taskInput.value = ''
        taskInput.focus() // .focus() permet de surligner la zone de texte

        // Attache l'événement supprimer au bouton supprimer
        taskDiv.querySelector('.delete-button').addEventListener('click', () => {
            taskDiv.remove()
        })

        // Attache l'événement modifier au bouton modifier
        taskDiv.querySelector('.edit-button').addEventListener('click', () => {
            editTask(taskDiv)
        })
    }
}

// Fonction pour attacher l'événement de suppression aux boutons existants
function attachDeleteEvent() {
    const deleteButtons = document.querySelectorAll('.delete-button')
    // Parcourt chaque bouton et lui attache un écouteur d'événement click qui supprimera le parent <div class="task"> du bouton lorsqu'il est cliqué
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.parentElement.remove()
        })
    })
}

// Fonction pour modifier une tâche
function editTask(taskDiv) {
    const taskContent = taskDiv.querySelector('.task-content')
    const newTaskContent = prompt('Modifiez votre tâche:', taskContent.textContent)
    if (newTaskContent !== null && newTaskContent.trim() !== '') {
        taskContent.textContent = newTaskContent
    }
}

document.addEventListener('DOMContentLoaded', attachDeleteEvent) // Attacher les événements de suppression pour les tâches initiales

addTaskButton.addEventListener('click', addTask)

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask()
    }
})
