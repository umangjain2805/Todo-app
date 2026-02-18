let tasks = [];

const button = document.getElementById("button");
const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".task-list");
const progress = document.getElementById("progress");
const number = document.getElementById("number");

/* ADD TASK */
const addTask = () => {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";
    updateTaskList();
};

/* UPDATE TASK LIST */
const updateTaskList = () => {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <p class="taskText ${task.completed ? "done" : ""}">
                    ${task.text}
                </p>
            </div>

            <div class="icons">
                <span class="material-symbols-outlined edit">
                    edit_document
                </span>
                <span class="material-symbols-outlined delete">
                    delete
                </span>
            </div>
        </div>
        `;

        /* TOGGLE COMPLETE */
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            updateTaskList();
        });


        /* EDIT TASK */
const editBtn = listItem.querySelector(".edit");
editBtn.addEventListener("click", () => {
    const taskTextEl = listItem.querySelector(".taskText");

    // If already editing, save
    if (taskTextEl.isContentEditable) {
        taskTextEl.contentEditable = "false";
        tasks[index].text = taskTextEl.innerText.trim();
        updateTaskList();
    } 
    // Start editing
    else {
        taskTextEl.contentEditable = "true";
        taskTextEl.focus();
    }
});


        /* DELETE TASK */
        const deleteBtn = listItem.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            updateTaskList();
        });

        taskList.appendChild(listItem);
    });

    updateStats();
};

/* UPDATE PROGRESS */
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    number.innerText = `${completedTasks} / ${totalTasks}`;

    const progressPercent =
        totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progress.style.width = `${progressPercent}%`;
};

/* BUTTON CLICK */
button.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});l