window.onload = () => {
    const form1 = document.querySelector("#addForm");

    let items = document.getElementById("items");
    let submit = document.getElementById("submit");
    let editItem = null;

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", removeItem);
};

function addItem(e) {
    e.preventDefault();

    if (submit.value != "Submit") {
        editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;
        submit.value = "Submit";
        document.getElementById("item").value = "";
        document.getElementById("alarm").value = "";
        document.getElementById("lblsuccess").innerHTML = "Text edited successfully";
        document.getElementById("lblsuccess").style.display = "block";
        setTimeout(() => document.getElementById("lblsuccess").style.display = "none", 3000);
        return false;
    }

    let newItem = document.getElementById("item").value;
    let alarmTime = document.getElementById("alarm").value;

    if (newItem.trim() === "" || newItem.trim() == null) return false;

    let li = document.createElement("li");
    li.className = "list-group-item task-item";

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm edit";
    editButton.appendChild(document.createTextNode("Edit"));

    li.appendChild(document.createTextNode(newItem));

    if (alarmTime) {
        setAlarm(alarmTime, newItem);
    }

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    items.appendChild(li);
    
    document.getElementById("item").value = "";
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
            document.getElementById("lblsuccess").innerHTML = "Text deleted successfully";
            document.getElementById("lblsuccess").style.display = "block";
            setTimeout(() => document.getElementById("lblsuccess").style.display = "none", 3000);
        }
    }
    if (e.target.classList.contains("edit")) {
        document.getElementById("item").value = e.target.parentNode.childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }
}

function toggleButton(ref, btnID) {
    document.getElementById(btnID).disabled = false;
}