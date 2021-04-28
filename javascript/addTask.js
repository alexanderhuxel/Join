// allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
// selectedUser = JSON.parse(localStorage.getItem('selectedUser')) || [];
// Users = JSON.parse(localStorage.getItem('Users')) || [];
let click = false;
let alert = false;
let show = false;
let isfilled = false;
let status = false;
let usersetting = false;
selectedUser = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;



function addTask() {
    console.log("test")
    let description = document.getElementById("description").value;
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let selectorimportance = document.getElementById("importance").selectedIndex;
    let selectorcategory = document.getElementById("category").selectedIndex;
    let importance = document.getElementById("importance").options[selectorimportance].value;
    let category = document.getElementById("category").options[selectorcategory].value;
    allTasks.push(createObj(title, date, category, description, importance, selectedUser))
    backend.setItem('allTasks', JSON.stringify(allTasks));
    backend.setItem('selectedUser', JSON.stringify(""));
    backend.setItem('selectedUser', JSON.stringify(selectedUser));
    alertFade(errormessage[2], 'success', 'translateY(70vh)');
    clearInput();
    if (selectedUser.length > 0) {
        removeAddedUserClass();
    }
    console.log(backend.getItem('allTasks'));
}

/**
 * @param {string} title -title of the Task
 * @param {number} date  -date of the Task
 * @param {string} description  - description of the Task
 * @param {string} importance - importance of the Task
 * @param {string} category - category of the Task
 * @param {object} selectecUser - object with the userdata 
 * generates a new object 
 */
function createObj(title, date, category, description, importance, selectedUser, priority) {

    if (importance == "High") {
        priority = "do";
    } else { priority = "schedule" }
    return {
        "title": title,
        "date": date,
        "category": category,
        "description": description,
        "importance": importance,
        "user": selectedUser,
        "priority": priority
    }


}
/**
 * clearing the inputfields
 */
function clearInput() {
    console.log("clear")
    document.getElementById("title").value = "";
    document.getElementById("importance").value;
    document.getElementById("date").value = today;
    document.getElementById("description").value = "";
    selectedUser = [];
    backend.setItem('selectedUser', "");
    document.getElementById("imgs").innerHTML = ` <svg onclick="chooseUser()" xmlns="http://www.w3.org/2000/svg" id="svg" width="30"
    height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path
        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
</svg>`;
}


function chooseUser() {
    Users = JSON.parse(backend.getItem("Users"));
    if (!isfilled) {
        for (let i = 0; i < Users.length; i++) {
            document.getElementById("content").innerHTML += `
            <div id="${i}" onclick="selectUser(${i})" class="user">
            <img src="${Users[i].img}">
            <div class="username">
                ${Users[i].username}
            </div>
        </div>`
        }
        isfilled = true;
        chooseUser();
        if (!status) {
            status = true;
            if (!usersetting) {
                for (let i = 0; i < Users.length; i++) {
                    selectedUser.push('');
                } usersetting = true;
            }
        }
    } else if (isfilled && !show) {
        document.getElementById("modal").classList.remove("d-none");
        document.getElementById("main").style.filter = "blur(8px)";
        show = true;
        clearDrawedUsers();
        drawPickedUsers();
    } else if (isfilled && show) {
        document.getElementById("modal").classList.add("d-none");
        document.getElementById("main").style.filter = "blur(0px)";
        clearDrawedUsers();
        drawPickedUsers();
        show = false;
    }

}


function selectUser(i) {

    if (document.getElementById(i).classList.contains('added')) {
        document.getElementById(i).classList.remove("added");
        selectedUser.splice(i, 1, "");
        backend.setItem('selectedUser', selectUser);
        document.getElementById("userimg").innerHTML = "";
    } else {
        if (i == i && document.getElementById(i).classList.contains('user')) {
            document.getElementById(i).classList.add("added");
            selectedUser.splice(i, 1, Users[i])
            backend.setItem('selectedUser', selectUser);
        }
    }
}




function cancle() {
    removeAddedUserClass();
    clearInput();
}


function drawPickedUsers() {
    for (let i = 0; i < selectedUser.length; i++) {
        if (selectedUser[i] == "") {
        } else {
            document.getElementById("userimg").innerHTML += `<img src="${selectedUser[i].img}">`
        }
    }
}

function clearDrawedUsers() {
    document.getElementById("userimg").innerHTML = "";
}

function removeAddedUserClass() {
    for (let i = 0; i < Users.length; i++) {
        document.getElementById(i).classList.remove("added");
    }
}

