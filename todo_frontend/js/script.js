// generate note dots in resize
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let tasksBody = document.getElementById("tasksBody");
let tasksInfo = document.getElementById("tasksInfo");

let tasks = [];

function addDots() {
  let bodyHight = document.querySelector(".to-do-list-body").offsetHeight;
  let dotHight = document.querySelector(".dot").offsetHeight;
  let length = bodyHight / dotHight;

  let box = "";
  for (let i = 0; i < length; i++) {
    box += `<div class="dot"></div>`;
  }
  document.querySelector(".dots").innerHTML = box;
}
setInterval(addDots, 500);

// Gửi yêu cầu GET đến API
fetch("http://localhost:8000/todos/")
  .then((response) => response.json()) // Chuyển đổi dữ liệu JSON
  .then((data) => {
    // Lưu dữ liệu vào biến tasks
    const tasks = data;

    console.log(tasks);

    // Lưu biến tasks vào localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  })
  .catch((error) => {
    console.error("Lỗi khi lấy dữ liệu từ API:", error);
  });

tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTask();

let total = tasks.length;
let completed = JSON.parse(localStorage.getItem("complete")) || 0;
let pending = JSON.parse(localStorage.getItem("pending")) || 0;
getTasksLength();

addTaskBtn.addEventListener("click", function () {
  if (taskInput.value != "") {
    getTaskData();
    displayTask();
    clearInput();
  }
  // getTasksLength();
});

function getTaskData() {
  let task = {
    id: new Date().getTime(),
    task: taskInput.value,
    status: false,
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTask() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");

  let box = ``;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status == false) {
      box += `
        <tr>
        <th>${i + 1}</th>
        <th>${tasks[i].title}</th>
        <th class="task-date d-flex justify-content-center"><span>${day}</span> / <span>${month}</span></th>
        <th>
            <i onclick="checked(${i})" class="fa-regular fa-square-check"></i
            ><i onclick="checked(${i})" class="fa-solid fa-square-check d-none"></i>
        </th>
        <th><i onclick="deleteTask(${i})" class="fa-solid fa-trash-can"></i></th>
        </tr>
        `;
    } else {
      box += `
        <tr>
        <th class="wavy">${i + 1}</th>
        <th class="wavy">${tasks[i].title}</th>
        <th class="wavy task-date d-flex justify-content-center"><span>${day}</span> / <span>${month}</span></th>
        <th>
            <i onclick="checked(${i})" class="fa-regular fa-square-check d-none"></i
            ><i onclick="checked(${i})" class="fa-solid fa-square-check"></i>
        </th>
        <th><i onclick="deleteTask(${i})" class="fa-solid fa-trash-can"></i></th>
        </tr>
        `;
    }
  }
  tasksBody.innerHTML = box;
  getTasksLength();
}

// clear input
function clearInput() {
  taskInput.value = "";
}

// delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask();
  getTasksLength();
}

// add check to checked task
function checked(index) {
  if (tasks[index].status == true) {
    tasks[index].status = false;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
    getTasksLength();
  } else {
    tasks[index].status = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
    getTasksLength();
  }
}

// get tasks length
function getTasksLength() {
  let completedTasks = tasks.filter((task) => task.status == true);

  tasksInfo.innerHTML = `${tasks.length} Total, ${
    completedTasks.length
  } Completed, ${tasks.length - completedTasks.length} Pending`;
}
