export function setLocalStorage(tasks = null, tasksCompleted = null) {
    if (tasks != null) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    if (tasksCompleted != null) {
        localStorage.setItem("tasksCompleted", JSON.stringify(tasksCompleted));
    }
}