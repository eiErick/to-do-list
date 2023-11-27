import { setLocalStorage } from "./setLocalStorage.js";
import { tasks } from "./script.js";
import { tasksCompleted } from "./script.js";

const main = document.querySelector("#container");
const header = document.querySelector("#header");

const settingsBtn = document.querySelector(".settings-btn");
const settingsMenu = document.querySelector(".settings-menu");

const enbleDisableNotificationBtn = document.querySelector("#enble-disable-notification-btn");
const dataDownloadBtn = document.querySelector("#data-download-btn");
const deleteTtasksCompletedBtn = document.querySelector("#delete-all-tasks-completed-btn");
const deleteAllTasksBtn = document.querySelector("#delete-all-tasks-btn");

let jsonData;

document.querySelector("#data-import-btn").addEventListener("change", function (element) {
  const file = element.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (content) {
        try {
            const getterData = JSON.parse(content.target.result);
            jsonData = getterData;
        } catch (error) {
            console.error("Erro ao analisar o arquivo JSON:", error);
            alert("Erro ao analisar o arquivo JSON!");
        }

        if (jsonData != undefined) {
          let tasksData = tasks;
          let tasksCompletedData = tasksCompleted;

          jsonData.forEach(element => {
            if (element.status == "completed") {
              delete element.status;
              tasksCompletedData.push(element);
            } else {
              tasksData.push(element);
            }
          });

          setLocalStorage(tasksData, tasksCompletedData);
          location.reload()
        }
    };

    reader.readAsText(file);
  }    
});

enbleDisableNotificationBtn.addEventListener("click", enbleDisableNotification);
dataDownloadBtn.addEventListener("click", dataDownloader);
deleteTtasksCompletedBtn.addEventListener("click", deleteCompletedTasks);
deleteAllTasksBtn.addEventListener("click", removeAllTaksInMemory);

const notificationIsEnable = localStorage.getItem("notification");

if (notificationIsEnable == "true") {
  enbleDisableNotificationBtn.innerHTML = "Desativar Notificações";
}

printSettings();

export function printSettings() {
  settingsBtn.addEventListener("click", (element) => {
    element.stopPropagation();
    toggleDropdownSettings();
    toggleClassAddBlur();
  });
  
  const toggleDropdownSettings = function () {
    settingsMenu.classList.toggle("show");
  }

  const toggleClassAddBlur = function () {
    main.classList.toggle("blur");
    header.classList.toggle("blur");
  }
  
  document.documentElement.addEventListener("click", function () {
    if (settingsMenu.classList.contains("show")) {
      toggleDropdownSettings();
      toggleClassAddBlur();
    }
  });  
}

function enbleDisableNotification() {
  if (enbleDisableNotificationBtn.innerHTML == "Ativar Notificações") {
    enbleDisableNotificationBtn.innerHTML = "Desativar Notificações";
    localStorage.setItem("notification", "true");
    location.reload();
  } else if (enbleDisableNotificationBtn.innerHTML == "Desativar Notificações") {
    enbleDisableNotificationBtn.innerHTML = "Ativar Notificações";
    localStorage.setItem("notification", "false");
  }
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
    // delete element.trash;
    data.push(element);
  });

  tasksCompleted.forEach(element => {
    // delete element.trash;
    element.status = "completed";
    data.push(element);
  });

  const jsonString = JSON.stringify(data)

  const linkDownload = document.createElement('a');
  linkDownload.download = 'dados.json';
  
  const blobTasks = new Blob([jsonString], { type: 'application/json' });
  
  linkDownload.href = window.URL.createObjectURL(blobTasks);
  
  linkDownload.click();
}

function deleteCompletedTasks() {
  const empty = [];
  setLocalStorage(null, empty);
  location.reload();
}

function removeAllTaksInMemory() {
  const windowComfirm = confirm("[ALERTA] Isso DELETARA todos as TAREFAS armazenada deste SITE! Tem certeza deseja quer continuar?");
  if (windowComfirm) {
    localStorage.clear();
    location.reload();
  }
}