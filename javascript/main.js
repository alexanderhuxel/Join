let open = false;
allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
let isload = true;
let errormessage = ["E-mail or Password not matching", "All fields requiered", "Your tasks has been created"]
let colorMap;
let currentDraggedElement;
/**
 * generating the HTML for the header 
 */


document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("body").innerHTML += `<header id="header"> 
        <nav id="nav">
        <button id="menubutton"> <span > </span> </button>
        <ul>
        <img src="../img/logo.png" id="logo">
        <li><a class="link" href="../html/matrix.html">Matrix</a></li>
        <li><a  class="link" href="../html/list.html">List</a></li>
        <li><a class="link" href="../html/addTask.html">AddTask</a></li>
        </ul>
        <ul>
        <img class="img" src="../img/user.png" id="user">
        <li><a class="link" href="../html/help.html">Help</a></li>
        <li><a class="link" href="../html/imprint.html">Impressum</a></li>
        <li><a class="link" href="../html/dataprotection.html">Datenschutz</a></li>
        <li><a class="link" href="../html/index.html">Log Out</a></li>
        </ul>
        </nav>
        
        </header>`
    document.getElementById("menubutton").addEventListener("click", openResponsiveMenu);


});


function alertFade(message, color, position) {

    if (!alert) {
        document.getElementById("main").innerHTML += `<div id="alert" style="text-align: center; font-size: 1.5rem"  class="alert alert-${color}" role="alert">
        ${message}
        </div>`
        alert = true;
    }
    setTimeout(() => {
        document.getElementById("alert").style.transform = position;
    }, 10);
    setTimeout(() => {
        document.getElementById("alert").style.transform = "translateY(120vh)";
        alert = false;
    }, 2000);
}




colorMap = new Map([
    ["Management", "#2A379C"],
    ["Sales", "#E88F6D"],
    ["HR", "#1253ED"],
    ["IT", "#80E83F"],
    ["Private", "#5B9C32"]
]);
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, id) {
    ev.dataTransfer.setData("text", ev.target.id);
    currentDraggedElement = id;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    allTasks[currentDraggedElement].priority = ev.target.id;
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    clearContainer();
    fillArray();
}

function openResponsiveMenu() {
    if (!open) {
        document.getElementById("menubutton").classList.add("active-menu");
        document.getElementById("header").style.height = "100vh";
        document.getElementById("nav").style = "justify-content: center!important";
        open = true;
    } else {
        document.getElementById("menubutton").classList.remove("active-menu");
        document.getElementById("header").style.height = "80px";
        document.getElementById("nav").style = "justify-content: space-beet!important";
        open = false;
    }
}

function getData() {
    if (Users.length == 0) {
        Users.push(createUser('Alex', 'alex@web.de', '1234', '../img/user.png'))
        Users.push(createUser('Junus', 'Junus@web.de', '1234', '../img/busy.png'))
        Users.push(createUser('Manuel', 'Manuel@web.de', '1234', '../img/userbusy.png'))
        Users.push(createUser('Christa', 'Christa@web.de', '1234', '../img/woman.png'))
        localStorage.setItem('Users', JSON.stringify(Users));
    }
    if (Users.length > 3) {
    }
    window.location.href = "../html/login.html";
}