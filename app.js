const keyCounter = 'keyCounter';
const keyTaskList = 'keyTaskList';
let tasks = [];
let counterTask = 0;

if (localStorage.getItem(keyTaskList)) {
  let tasksAsString = localStorage.getItem(keyTaskList);
  tasks = JSON.parse(tasksAsString);

  if (localStorage.getItem(keyCounter)) {
    counterTask = +localStorage.getItem(keyCounter);
  }
}

function addNewTask() {
  // 1. Получить инпут и текст в нем
  const elem_input = document.getElementById("new_task");
  const task_name = elem_input.value;

  if (task_name != "" && task_name != null) {
    // 2. Создать новый элемент div
    const elem_div = document.createElement("div");
    elem_div.innerHTML = `
        <input id="tch-${counterTask}" type="checkbox" />
        <label for="tch-${counterTask}">${task_name}</label>`;

    // 3. Обновляем локальный список задач
    tasks.push({
      id: counterTask,
      title: task_name,
    });
    localStorage.setItem(keyTaskList, JSON.stringify(tasks));

    // 4. Вставить новый элемент в начало списка
    const elem_ul = document.getElementById("task_list");
    elem_ul.append(elem_div);

    // 5. Очищаем значение в инпуте
    elem_input.value = "";

    // 6. Инкремент счетчика
    counterTask++;
    localStorage.setItem(keyCounter, counterTask);
  }
}

function createTaskElement(taskId, text) {
  const elem_div = document.createElement("div");
  elem_div.innerHTML = `
    <input id="tch-${taskId}" type="checkbox" />
    <label for="tch-${taskId}">${text}</label>`;

  const elem_ul = document.getElementById("task_list");
  elem_ul.append(elem_div);
}

tasks.forEach((x) => createTaskElement(x.id, x.text));

const btn = document.getElementById("btn_click");
btn.onclick = addNewTask;

document.onkeydown = (ev) => {
  if (ev.code === "Enter") {
    addNewTask();
  }
};
