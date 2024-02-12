const opitionContainer = document.querySelector(".opitions");
const display = document.querySelector(".display");

const opitions = opitionContainer.childNodes;

const settingAppearance = `
    <div onload="colorManager()">
        <p>Cores</p>
        <span class="colors" onclick="colorManager()" id="color-purple"></span>
        <span class="colors" onclick="colorManager()" id="color-red"></span>
        <span class="colors" onclick="colorManager()" id="color-blue"></span>
        <span class="colors" onclick="colorManager()" id="color-green"></span>
    </div>
`;

const settingData = `
    <div onclick="dataImport()">
        <input type="file" name="input-file" id="data-import-btn" class="settings-menu-btn" accept=".json">
        <label for="data-import-btn" id="settings-menu-btn-label"><p id="settings-menu-btn-p" class="settings-menu-btn">Importar Dados</p></label>
    </div>
    <div onclick="dataDownloader()">
        <button id="data-download-btn" class="settings-menu-btn">Exportar Dados</button>
    </div>
    <div onclick="deleteCompletedTasks()">
        <button style="color: red;" id="delete-all-tasks-completed-btn" class="settings-menu-btn">Deletar todas as tarefas concluídas</button>
    </div>
    <div onclick="removeAllTaksInMemory()">
        <button style="color: red;" id="delete-all-tasks-btn" class="settings-menu-btn">Deletar todas as tarefas na MEMÓRIA</button>
    </div>
`;

const settingNotification = `
    <div>
        <p>Notificações</p>
        <input onclick="enbleDisableNotification()" id="notification-toggle" class="toggle" type="checkbox">
        <label for="notification-toggle"><label>
    </div>
`;

const settingAbout = `
    <div>
        Feito com ♥ by Érick
    </div>
    <div>
        <a href="https://github.com/eierick/to-do-list" target="_balnk">GitHub</a>
    </div>
`;

const settings = [
    settingAppearance,
    settingData,
    settingNotification,
    settingAbout
]

opitions.forEach((opition) => {
    opition.addEventListener("click", () => {
        deleteClass("selected");
        addClass(opition, "selected");

        const index = getIndex(opitions, opition.textContent);
        printDisplay(index);
    });
});

function getIndex(array, name) {
    for (let i = 0; i < array.length; i++) {
        const nameElementInArray = array[i].textContent;
        if (nameElementInArray === name) return i;
    }

    return -1;
}

function deleteClass(className) {
    const element = document.querySelector(`.${className}`);
    element.classList.remove(className);
}

function addClass(element, className) {
    element.classList.add(className);
}

printDisplay(0);

function printDisplay(index) {
    display.innerHTML = settings[index];
}

function colorManager() {
    const colors = document.querySelectorAll(".colors");
    const html = document.documentElement;
    const savedThemesColors = localStorage.getItem("theme-color");

    if (savedThemesColors) {
        colors.forEach((color) => {
            if (color.id == savedThemesColors) {
                addClass(color, "color-selected");
            } 
                
        });
    } else {
        localStorage.setItem("theme-color", "color-blue");
    }

    colors.forEach((color) => {
        color.addEventListener("click", () => {
            deleteClass("color-selected");
            addClass(color, "color-selected");
            localStorage.setItem("theme-color", color.id);
        });
    });
}

function dataImport() {
    let tasks = [];
    let tasksCompleted = [];

    const savedTasks = localStorage.getItem("tasks");
    const savedTasksCompleted = localStorage.getItem("tasksCompleted");

    if (savedTasks) tasks = JSON.parse(savedTasks);
    if (savedTasksCompleted) tasksCompleted = JSON.parse(savedTasksCompleted);

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

                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));

                    location.reload();
                }
        };
    
        reader.readAsText(file);
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
    localStorage.setItem("tasksCompleted", JSON.stringify(empty));
    location.reload();
}
  
function removeAllTaksInMemory() {
    const windowComfirm = confirm("[ALERTA] Isso DELETARA todos as TAREFAS armazenada deste SITE! Tem certeza deseja quer continuar?");
    if (windowComfirm) {
        localStorage.clear();
        location.reload();
    }
}

const notification = document.querySelector("#notification").addEventListener("click", () => {
    const savedNotification = localStorage.getItem("notification");

    if (savedNotification === "true") {
        const notificationToggle = document.querySelector("#notification-toggle");
        notificationToggle.checked = "true";
    }
});

function enbleDisableNotification() {
    const notificationToggle = document.querySelector("#notification-toggle");

    if (notificationToggle.checked === true) {
      localStorage.setItem("notification", "true");
      location.reload();
    } else if (notificationToggle.checked === false) {
      localStorage.setItem("notification", "false");
    }
}
