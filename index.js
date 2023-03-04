const btnFirstPage = document.getElementById("first-window__btn");
const greetingUser = document.getElementById("greetings-user");
const newItemBtn = document.getElementById("new-task-btn");
const btnAddNewTask = document.getElementById("btn-add-new-task");
const searchInput = document.getElementById("search-input");
const btnActiveTasks = document.getElementById("btn-active-tasks");
const btnDoneTasks = document.getElementById("btn-done-tasks");
const btnAllTasks = document.getElementById("btn-all-tasks");
const containerTasks = document.getElementById("container-tasks");

let userName;

let arrayOfTasks = [];

const getUserName = () => {
  const inputFirstPage = document.getElementById("name");

  const firstWindow = document.getElementById("first-window");
  const secondWindow = document.getElementById("second-window");
  const greetings = document.getElementById("greetings-user");

  userName = inputFirstPage.value;

  firstWindow.classList.toggle("first-window__hidden");
  secondWindow.classList.toggle("second-window__hidden");
  localStorage.setItem("user", userName);
  greetings.innerHTML = `Hello, ${userName}`;
};

const checkUserName = () => {
  if (localStorage.getItem("user") !== null) {
    const greetings = document.getElementById("greetings-user");
    const firstWindow = document.getElementById("first-window");
    const secondWindow = document.getElementById("second-window");

    firstWindow.classList.toggle("first-window__hidden");
    secondWindow.classList.toggle("second-window__hidden");
    greetings.innerHTML = `Hello, ${localStorage.getItem("user")}`;
  }
};

const showInputNewTask = () => {
  // const newItemBtn = document.getElementById('new-task-btn')
  const newTaskContainer = document.getElementById("new-task-container");
  newTaskContainer.classList.toggle("new-task-container");
};

// print task
const printTask = (task) => {
  return `<div>
             <div class="item">
                <input class="item__input" type="checkbox" id="${task.name}">
                <label for="${task.name}">
                <span class="item__box"></span>
                <span class="item__subject">${task.name}</span>
                </label>
            </div>
            </div>`;
};

// render arrayOfTasks
const renderArrayOfTasks = () => {
  const containerTasks = document.getElementById("container-tasks");
  containerTasks.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    containerTasks.innerHTML += printTask(task);
  });
};

// add new Task
const addNewTask = () => {
  const inputNewTask = document.getElementById("new-task-input");
  const newTaskContainer = document.getElementById("new-task-container");

  let newTask = {
    name: inputNewTask.value,
    status: "active",
  };

  arrayOfTasks.push(newTask);

  inputNewTask.innerHTML = "";
  newTaskContainer.classList.toggle("new-task-container");

  renderArrayOfTasks();
};

// to render tasks by search input
const renderTasksBySearchInput = () => {
  const containerTasks = document.getElementById("container-tasks");
  containerTasks.innerHTML = "";
  const newArr = arrayOfTasks.filter((task) => task.name === searchInput.value);

  if (newArr.length === 0) {
    containerTasks.innerHTML = "such task not found";
  }
  newArr.forEach((task) => {
    containerTasks.innerHTML += printTask(task);
  });
};

// to render tasks by active status
const renderActiveTasks = () => {
  const containerTasks = document.getElementById("container-tasks");
  containerTasks.innerHTML = "";
  const newArr = arrayOfTasks.filter((task) => task.status === "active");

  newArr.forEach((task) => {
    containerTasks.innerHTML += printTask(task);
  });
};

// to render tasks by done status
const renderDoneTasks = () => {
  const containerTasks = document.getElementById("container-tasks");
  containerTasks.innerHTML = "";
  const newArr = arrayOfTasks.filter((task) => task.status === "done");

  newArr.forEach((task) => {
    containerTasks.innerHTML += printTask(task);
  });
};

// to change status of the task
const changeTaskStatus = (e) => {
  let taskId = e.target.closest("input").id;

  const newArr = arrayOfTasks.map((task) =>
    task.name === taskId ? { ...task, status: "done" } : task
  );
  arrayOfTasks = newArr;
};

btnFirstPage.addEventListener("click", getUserName);

newItemBtn.addEventListener("click", showInputNewTask);

btnAddNewTask.addEventListener("click", addNewTask);

searchInput.addEventListener("input", renderTasksBySearchInput);

btnActiveTasks.addEventListener("click", renderActiveTasks);

btnDoneTasks.addEventListener("click", renderDoneTasks);

btnAllTasks.addEventListener("click", renderArrayOfTasks);

containerTasks.addEventListener("click", changeTaskStatus);

window.addEventListener("load", checkUserName);

// localStorage.clear();
