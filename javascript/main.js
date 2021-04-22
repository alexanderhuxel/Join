let open = false;
let isload = true;
let errormessage = ["E-mail or Password not matching", "All fields requiered", "Your tasks has been created"]
let colorMap;
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
        <li><a class="link" href="../html/login.html">Log Out</a></li>
        </ul>
        </nav>
        
        </header>`
    document.getElementById("menubutton").addEventListener("click", openResponsiveMenu);

});


function alertFade(message, color) {

    if (!alert) {
        document.getElementById("main").innerHTML += `<div id="alert" style="text-align: center; font-size: 1.5rem"  class="alert alert-${color}" role="alert">
        ${message}
        </div>`
        alert = true;
    }
    setTimeout(() => {
        document.getElementById("alert").style.transform = "translateY(30vh)";
    }, 10);
    setTimeout(() => {
        document.getElementById("alert").style.transform = "translateY(120vh)";
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

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, category) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    Content[ev.target.id].push(Content.do[data]);
    clearContainer();
    fillContainer();
    console.log(ev.target.id)
    console.table(Content)


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

