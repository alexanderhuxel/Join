
let colorMap;
/**
 * generating the HTML for the header 
 */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("body").innerHTML += `   <header>
    <img src="../img/logo.png" id="logo">
    <nav>
        <ul>
            <li><a class="link" href="../html/matrix.html">Matrix</a></li>
            <li><a class="link" href="../html/list.html">List</a></li>
            <li><a class="link" href="../html/addTask.html">AddTask</a></li>
        </ul>
        <ul>
            <img  src="../img/user.png" id="user">
            <li><a class="link" href="#">Help</a></li>
            <li><a class="link active" href="../html/imprint.html">Impressum</a></li>
            <li><a class="link" href="../html/dataprotection.html">Datenschutz</a></li>
            <li><a class="link" href="../html/login.html">Log Out</a></li>
        </ul>
    </nav>

</header>
`

});





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

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(data)
}