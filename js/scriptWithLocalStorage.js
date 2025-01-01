var tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [
    {
      id : 1,
      taskContent : 'Learn html',
      completed : false
    },
    {
      id : 2,
      taskContent : 'Learn css',
      completed : true
    },
    {
      id : 3,
      taskContent : 'Learn javascript',
      completed : false
    }, 
    {
      id : 4,
      taskContent : 'Learn bootstrap',
      completed : false
    },
    {
      id : 5,
      taskContent : 'Learn JQuery',
      completed : false
    }
  ];
  
  var tasksDiv = document.querySelector('.tasks'),
      taskInput = document.querySelector('.new-task input'),
      errorMessage = document.querySelector('.error-message'),
      addTaskBtn = document.querySelector('.new-task button');
  
  function showTasks(){
    /// if we don't have any task so we should hide the div
    if(tasks.length<=0){
        tasksDiv.classList.add('d-none');
    }else{
        tasksDiv.classList.remove('d-none');
    }
    tasksDiv.innerHTML = "";
    tasks.forEach((task) => {
      tasksDiv.innerHTML += generateTask(task);
    });
  }
  
  function generateTask(task){
    let taskClass = task.completed ? 'task completed' : 'task';
    return (
      `<div id="${task.id}" class="${taskClass}" onClick="changeTaskStatus(${task.id})">
        <div class="task-description">
          <span class="taskname">
            ${task.taskContent}
          </span>
        </div>
        <div class="task-actions">
          <div class="task-action edit-action">
            <button class="edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
          <div class="task-action delete-action">
            <button class="delete" onclick="deleteTask(${task.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>`
    );
  }
  
  function deleteTask(idTask){
    const index = tasks.findIndex(task => task.id === idTask);
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1)[0];
      saveTasksToLocalStorage(tasks);
      showTasks();
      showToast(`Task: ${deletedTask.taskContent} deleted <i class="fas fa-check"></i>`);
    }
  }
  
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function addTask(){
    switch(true){
      case taskInput.value === "":
        errorMessage.innerHTML = 'You should write a task name';
        break;
      default :
        let task = {
          id: getMaxId(),
          taskContent: taskInput.value,
          completed: false
        };
        tasks.push(task);
        saveTasksToLocalStorage(tasks);
        showToast(`Task: ${task.taskContent} added <i class="fas fa-check"></i>`);
        taskInput.value = '';
        errorMessage.innerHTML = '';
        showTasks();
        break;
    }
  }
  
  function getMaxId(){
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
  
  function changeTaskStatus(idTask){
    const index = tasks.findIndex(task => task.id === idTask);
    if (index !== -1) {
      tasks[index].completed = !tasks[index].completed;
      saveTasksToLocalStorage(tasks);
      showTasks();
    }
  }
  
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    toastText.innerHTML = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
      toastText.innerHTML = '';
    }, 2000);
  }
  
  window.onload = () => {
    showTasks();
    console.log("test");
  };
  