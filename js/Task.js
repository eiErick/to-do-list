export class Task {
    constructor(name, date) {
        const imgEdit = document.createElement("img");
        const imgTrash = document.createElement("img");

        this.name = name;
        if (date != "") {
            this.date = date;
        }
        this.trash = imgTrash;
    }
    
    print (nameTasks, list, date) {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const dateText = document.createElement("span");
        const imgEdit = document.createElement("img");
        const imgTrash = document.createElement("img");

        checkbox.classList.add("checkbox");
        dateText.classList.add("text-date");
        imgEdit.classList.add("edit-task-name");
        imgTrash.classList.add("trash");

        imgTrash.setAttribute("src", "https://eierick.github.io/to-do-list/img/trash.svg");
        imgEdit.setAttribute("src", "https://eierick.github.io/to-do-list/img/edit.svg");
        
        listItem.appendChild(label);
        listItem.appendChild(imgEdit);

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(nameTasks));
        label.appendChild(dateText);
        label.appendChild(imgTrash);

        checkbox.type = "checkbox";
        
        let idList = list.attributes.id.textContent;
        
        if (idList == "taskListCompleted") {
            if (!checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }
            
            list.appendChild(listItem);
        } 
        
        if (idList == "taskList" || idList == "taskListToday") {
            if (checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }
            
            list.appendChild(listItem);    
        }

        if (date != undefined) {
            dateText.innerHTML = " " + date + " ";
        }

        const newDate = new Date();
        const dateToday = (newDate.getFullYear()+"-"+(newDate.getMonth() + 1)+"-"+newDate.getDate());
        const listId = list.attributes.id.textContent;

        if (listId == "taskListToday" && date == dateToday) {
            dateText.innerHTML = "Hoje";
        } else if (listId == "taskListToday" && date < dateToday) {
            dateText.classList.add("late");
            dateText.innerHTML = "Atrasada";
        }
    }
}