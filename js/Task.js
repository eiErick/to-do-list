export class Task {
    constructor(name, date) {
        const img = document.createElement("img");

        this.name = name;
        if (date != "") {
            this.date = date;
        }
        this.trash = img;
    }
    
    print (nameTasks, list, date) {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const dateText = document.createElement("span");
        const img = document.createElement("img");

        checkbox.classList.add("checkbox");
        dateText.classList.add("text-date");
        img.classList.add("trash");

        img.setAttribute("src", "https://eierick.github.io/to-do-list/img/trash.svg");
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(nameTasks));
        label.appendChild(dateText);
        label.appendChild(img);

        checkbox.type = "checkbox";
        
        let idList = list.attributes.id.textContent;
        
        if (idList == "taskListCompleted") {
            if (!checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }
            
            listItem.appendChild(label);
            list.appendChild(listItem);
        } 
        
        if (idList == "taskList" || idList == "taskListToday") {
            if (checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }
            
            listItem.appendChild(label);
            list.appendChild(listItem);    
        }

        if (date != undefined) {
            dateText.innerHTML = " " + date + " ";
        }
    }
}