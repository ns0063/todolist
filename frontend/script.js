const API_URL = "http://localhost:8082/todos";


// FETCH ALL TASKS
async function fetchTasks() {

    const response = await fetch(API_URL);

    const todos = await response.json();

    const pendingList = document.getElementById("pendingList");

    const completedList = document.getElementById("completedList");

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    todos.forEach(todo => {

        const li = document.createElement("li");


        li.innerHTML = `

            <span class="${todo.completed ? 'completed-task' : ''}">
                ${todo.task}
            </span>

            <div class="task-buttons">

                <button class="complete-btn"
                onclick="toggleTask(${todo.id}, ${todo.completed}, '${todo.task}')">

                    ${todo.completed ? "Undo" : "Complete"}

                </button>

                <button class="edit-btn"
                onclick="editTask(${todo.id}, '${todo.task}', ${todo.completed})">

                    Edit

                </button>

                <button class="delete-btn"
                onclick="deleteTask(${todo.id})">

                    Delete

                </button>

            </div>
        `;


        if(todo.completed){

            completedList.appendChild(li);

        }
        else{

            pendingList.appendChild(li);

        }

    });

}



// ADD TASK
async function addTask(){

    const taskInput = document.getElementById("taskInput");

    const task = taskInput.value;


    if(task === ""){

        alert("Please enter a task");

        return;
    }


    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            task: task,

            completed: false

        })

    });


    taskInput.value = "";

    fetchTasks();
}



// DELETE TASK
async function deleteTask(id){

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    fetchTasks();
}



// COMPLETE / UNDO TASK
async function toggleTask(id, completed, task){

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            task: task,

            completed: !completed

        })

    });

    fetchTasks();
}



// EDIT TASK
async function editTask(id, oldTask, completed){

    const updatedTask = prompt("Edit Task", oldTask);


    if(updatedTask == null || updatedTask === ""){

        return;
    }


    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            task: updatedTask,

            completed: completed

        })

    });

    fetchTasks();
}



// LOAD TASKS WHEN PAGE LOADS
fetchTasks();