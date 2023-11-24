const settingsBtn = document.querySelector(".settings-btn");
const settingsMenu = document.querySelector(".settings-menu");

const dataDownloadBtn = document.querySelector("#data-download-btn");

dataDownloadBtn.addEventListener("click", dataDownloader)

export function printSettings() {
  settingsBtn.addEventListener("click", (element) => {
    element.stopPropagation();
    toggleDropdownSettings();
  });
  
  const toggleDropdownSettings = function () {
    settingsMenu.classList.toggle("show");
  }
  
  document.documentElement.addEventListener("click", function () {
    if (settingsMenu.classList.contains("show")) {
      toggleDropdownSettings();
    }
  });  
}

function dataDownloader() {
  let tasks = [];
  let tasksCompleted = [];

  const savedTasks = localStorage.getItem("tasks");
  const savedTasksCompleted = localStorage.getItem("tasksCompleted");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  if (savedTasksCompleted) {
    tasksCompleted = JSON.parse(savedTasksCompleted);
  }

  let data = [];

  tasks.forEach(element => {
    const jsonString = JSON.stringify({ name: element.name, date: element.date });
    data.push(jsonString);
  });

  tasksCompleted.forEach(element => {
    const jsonString = JSON.stringify({ name: element.name, status: "completed"});
    data.push(jsonString);
  });

  const linkDownload = document.createElement('a');
  linkDownload.download = 'dados.json';
  
  const blobTasks = new Blob([data], { type: 'application/json' });
  
  linkDownload.href = window.URL.createObjectURL(blobTasks);
  
  console.log(linkDownload);
  linkDownload.click();
}