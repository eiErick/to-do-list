export class Task {
    constructor(name) {
        this.name = name;
    }

    print (nameTasks, list) {
        const listItem = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.classList.add("checkbox");
      
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(nameTasks));
        checkbox.type = "checkbox";

        let idList = list.attributes.id.textContent

        if (idList == "taskListCompleted") {
            if (!checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }

            listItem.appendChild(label);
            list.appendChild(listItem);
        } 

        if (idList == "taskList") {
            if (checkbox.checked) {
                checkbox.parentNode.style.textDecoration = "line-through";
                checkbox.checked = true;
            }

            listItem.appendChild(label);
            list.appendChild(listItem);    
        }
    }
}