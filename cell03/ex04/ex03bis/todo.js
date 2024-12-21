// LOAD TODO
window.onload = () => {
    loadToDo();
};

// new TODO
document.getElementById("newBtn").onclick = () => {
    const todoText = prompt("Enter your TO DO:").trim();
    if (todoText) {
        addToDo(todoText);
        saveToDo();
    }
};

// To do to DOM
function addToDo(text) {
    const toDoDiv = document.createElement("div");
    toDoDiv.textContent = text;
    toDoDiv.onclick = () => deleteToDo(toDoDiv);
    const list = document.getElementById("ft_list");

    // add bottom of the list
    if (list.firstChild) {
        list.insertBefore(toDoDiv, list.firstChild);
    } else {
        list.appendChild(toDoDiv);
    }

}

// remove todo
function deleteToDo(toDoDiv) {
    if (confirm("Do you really want to delete this TO DO?")) {
        toDoDiv.remove();
        saveToDo();
    }
}

// ฟังก์ชันบันทึก To-Do List ลงคุกกี้
function saveToDo() {
    const list = document.querySelectorAll("#ft_list div");
    const toDoArray = [];
    list.forEach(item => toDoArray.push(item.textContent));
    document.cookie = "todo=" + encodeURIComponent(JSON.stringify(toDoArray)) + ";path=/";
}

// ฟังก์ชันโหลด To-Do จากคุกกี้
function loadToDo() {
    const cookie = document.cookie.split("; ").find(row => row.startsWith("todo="));
    if (cookie) {
        const toDoArray = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
        toDoArray.reverse().forEach(item => addToDo(item));
    }
}
