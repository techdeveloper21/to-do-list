var tasks = [
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
  
  /* HTML Elements */
  var tasksDiv = document.querySelector('.tasks'),
      taskInput = document.querySelector('.new-task input'),
      errorMessage = document.querySelector('.error-message'),
      addTaskBtn = document.querySelector('.new-task button');
  
  function showTask(){
    // Update the displayed tasks
    tasksDiv.innerHTML = "";
    // show tasks from table
    tasks.forEach((task) => {
      tasksDiv.innerHTML += genereteTask(task);
    });
  }
  
  function genereteTask(task){
    let taskClass = '';
    if(task.completed){
      taskClass = 'task completed';
    }else{
      taskClass = 'task';
    }
    return(
      `
        <div id="${task.id}" class="${taskClass}" onClick="changeTaskStat(${task.id})">
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
        </div>
      `
    )
  }
  
  function deleteTask(idTask){
    console.log(idTask);
    const index = tasks.findIndex(task => task.id === idTask);
    const task = tasks[index];
    // Remove task from the tasks array
    tasks.splice(index, 1);
    
    showTask();
    // Show toast notification
    showToast(`Task : ${task.taskContent} deleted <i class="fas fa-check"></i>`);
    // You can perform any other actions related to deletion here
  }
  
  // Function to show toast notification
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
  
    toastText.innerHTML = `
      ${message}
    `
    // Show the toast
    toast.style.display = 'block';
    // After 2 seconds, hide the toast
    setTimeout(() => {
      toast.style.display = 'none';
      toastText.inderHTML = '';
    }, 2000);
  }
  
  function addTask(){
    console.log("test");
    switch(true){
      case taskInput.value =="" :
          errorMessage.innerHTML = 'You should write a task name';
          break;
      default :
          let task = {
            id : getMaxId(),
            taskContent : taskInput.value,
            completed : false
          }
          tasks.push(task);
          showToast(`Task : ${task.taskContent} added <i class="fas fa-check"></i>`);
          taskInput.value = '';
          errorMessage.innerHTML = '';
          showTask();
        break;
    }
  }
  
  function getMaxId(){
    return tasks[tasks.length - 1].id + 1
  }
  
  function changeTaskStat(idTask){
    const index = tasks.findIndex(task => task.id === idTask);
    tasks[index].completed = !tasks[index].completed ;
    showTask();
  }
  
  window.onload = () => {
    showTask()
  }
  
  
  
  