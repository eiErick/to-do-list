const notificationIsEnable = localStorage.getItem("notification");
// This file, notification.js, receive an array and a title and transform in a notification.

export function notify(listTasksName) {
  if (notificationIsEnable == "true") {
    const confirmation = checkNotification();

    if (confirmation) {
      let textBodyNotification = [];

      listTasksName.forEach(element => {
        textBodyNotification.push(" " + element);
      });
      
      let img = "https://eierick.github.io/to-do-list/img/list.svg";

      const titulo = "Tarefas para hoje";
      const options = {
        body: textBodyNotification,
        icon: img,
      };

      if (textBodyNotification != "") {
        const notification = new Notification(titulo, options);
      }
    }
  }
}

function checkNotification() {
  if (!("Notification" in window)) {
    alert("Este navegador não suporta notificações de Desktop!");
    localStorage.setItem("notification", "false");
  }
  
  if (Notification.permission !== "granted") {
    alert("Permita que este site envie notificações ou desative as notificações nas configurações");
    Notification.requestPermission();
  }
  
  if (Notification.permission === "granted") {
    return true;
  }
}