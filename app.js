window.onload = () => {
    const form1 = document.querySelector("#addForm");

    let items = document.getElementById("items");

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", removeItem);
};

function addItem(e) {
    e.preventDefault();

    let newItem = document.getElementById("item").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;
    let notes = document.getElementById("notes").value;
    let alarmTime = document.getElementById("alarm").value;

    if (newItem.trim() === "") return false;

    let li = document.createElement("li");
    li.className = "list-group-item task-item";

    li.innerHTML = `
        <div>
            <strong>${newItem}</strong> <br>
            Due: ${dueDate} | Priority: ${priority} | Category: ${category} <br>
            Notes: ${notes}
        </div>
    `;

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit";
    editButton.appendChild(document.createTextNode("Edit"));

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    items.appendChild(li);

    if (alarmTime) {
        setAlarm(alarmTime, newItem);
    }

    document.getElementById("item").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "Low";
    document.getElementById("category").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("alarm").value = "";
}

function setAlarm(alarmTime, task) {
    const alarmDate = new Date(alarmTime);
    const now = new Date();

    if (alarmDate > now) {
        const timeUntilAlarm = alarmDate - now;
        setTimeout(() => {
            alert(`Reminder: ${task}`);
        }, timeUntilAlarm);
    }
}

function removeItem(e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        if (confirm("Are you Sure?")) {
            let li = e.target.parentNode;
            items.removeChild(li);
        }
    }
    if (e.target.classList.contains("edit")) {
        // Edit functionality can be implemented here
    }
}