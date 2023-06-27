let form = document.querySelector('form');
let input = document.querySelector('input');
let clearBtn = document.querySelector('.clearbtn');
let list = document.querySelector('.list');
let tasksEmptyDiv = document.querySelector('.tasks-empty');
let alertarea = document.querySelector('#alert-area');

window.onload = input.focus();
// ...
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach((task) => {
  let listitem = document.createElement('li');
  listitem.classList.add('list-item');
  listitem.innerHTML = `
        <span class="task">${task}</span>
        <span class="del">delete</span>
    `;
  list.appendChild(listitem);

  // delete function
  let delbtn = document.querySelectorAll('.del');
  delbtn.forEach((btn) => {
    btn.onclick = deleteTask;
  });

  // done task
  let allDone = document.querySelectorAll('.list-item');
  allDone.forEach((ali) => {
    ali.children[0].onclick = done;
  });
});

tasksCount(list.children.length);
// ...;

tasksEmpty();

form.onsubmit = newTask;

clearBtn.onclick = clearTask;

function newTask(e) {
  e.preventDefault();
  if (input.value == '') {
    alertarea.innerHTML = `<div class="n-val">please insert value !</div>`;
    setTimeout(() => {
      let nval = document.querySelectorAll('.n-val');
      nval.forEach((n) => {
        n.style.height = 0;
        n.style.padding = 0;
        setTimeout(() => {
          n.remove();
        }, 1000);
      });
    }, 1000);
  } else {
    // add task
    let listitem = document.createElement('li');
    listitem.classList.add('list-item');

    let inputCap =
      input.value.substring(0, 1).toUpperCase() +
      input.value.substring(1, input.value.length);
    listitem.innerHTML = `
            <span class="task">${inputCap}</span>
            <span class="del">delete</span>
        `;

    // save the task in local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(inputCap);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    list.appendChild(listitem);
    input.value = '';
    input.focus();
    tasksEmpty();
    tasksCount(list.children.length);

    // delete function
    let delbtn = document.querySelectorAll('.del');
    delbtn.forEach((btn) => {
      btn.onclick = deleteTask;
    });

    // done task
    let allDone = document.querySelectorAll('.list-item');

    allDone.forEach((ali) => {
      ali.children[0].onclick = done;
    });
  }
}

function deleteTask(e) {
  e.target.parentNode.remove();
  tasksEmpty();
  tasksCount(list.children.length);
  tasksDone();
  // remove the task from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let taskText = e.target.parentNode.querySelector('.task').textContent;
  let index = tasks.indexOf(taskText);
  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function clearTask() {
  list.innerHTML = '';
  tasksEmpty();
  tasksCount(list.children.length);
  tasksDone();
  //   Clear Task from the local Storage
  localStorage.removeItem('tasks');
}

function tasksEmpty() {
  if (list.children.length == 0) {
    tasksEmptyDiv.innerHTML = 'Tasks Empty';
  } else {
    tasksEmptyDiv.innerHTML = '';
  }
}

function done(e) {
  e.target.classList.toggle('done');
  tasksDone();
}

function tasksCount(count) {
  document.querySelector('.tasks-count').innerHTML = count;
}

function tasksDone() {
  let doneLength = document.querySelectorAll('.done').length;
  document.querySelector('.tasks-done').innerHTML = doneLength;
}
