

allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
selectedUser = JSON.parse(localStorage.getItem('selectedUser')) || [];
Users = JSON.parse(localStorage.getItem('Users')) || [];
let click = false;
let alert = false;
let show = false;
let isfilled = false;
selectedUser = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;


function addTask() {
    let description = document.getElementById("description").value;
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let selectorimportance = document.getElementById("importance").selectedIndex;
    let selectorcategory = document.getElementById("category").selectedIndex;
    let importance = document.getElementById("importance").options[selectorimportance].value;
    let category = document.getElementById("category").options[selectorcategory].value;
    let destination = "";
    if (title == "", date == "", description == "") {
    } else {
        allTasks.push(createObj(title, date, category, description, importance, selectedUser, destination))
        localStorage.setItem('allTasks', JSON.stringify(allTasks));
        localStorage.setItem('selectedUser', JSON.stringify(""));
        selectedUser = [];
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
        alertFade(errormessage[2], 'success');
        if (show) {
            chooseUser();
            removeAddedUserClass();
        }
    }
}

/**
 * generates a new object 
 * @param {string} title -title of the Task
 * @param {number} date  -date of the Task
 * @param {string} description  - description of the Task
 * @param {string} importance - importance of the Task
 * @param {string} category - category of the Task
 * @param {object} selectecUser - object with the userdata 
 * @returns 
 */
function createObj(title, date, category, description, importance, selectedUser, priority) {

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
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("importance").value;
    document.getElementById("description").value = "";
    selectedUser = [];
    localStorage.setItem('selectedUser', JSON.stringify(""));
}


function chooseUser() {
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
    } else if (isfilled && !show) {
        for (let i = 0; i < Users.length; i++) {
            selectedUser.push('');
        }
        document.getElementById("modal").classList.remove("d-none");
        document.getElementById("main").style.filter = "blur(4px)";
        show = true;
    } else if (isfilled && show) {
        document.getElementById("modal").classList.add("d-none");
        document.getElementById("main").style.filter = "blur(0px)";
        drawPickedUsers();
        show = false;
    }
}


function selectUser(i) {

    if (selectedUser[i] == Users[i]) {
        document.getElementById(i).classList.remove("added");
        selectedUser.splice(i, 1, "");
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        console.table(selectedUser)
        console.log(i);
    } else {
        if (i == i) {
            document.getElementById(i).classList.add("added");
            selectedUser.splice(i, 1, Users[i])
            localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
            console.table(selectedUser, "1")
            console.log(i)
        }
    }
}




function cancle() {
    if (show && isfilled) {
        chooseUser();
        clearInput();
    } if (!show) {
        clearInput();
    }

}


function drawPickedUsers(i) {
    for (let i = 0; i < selectedUser.length; i++) {
        if (selectedUser[i] == "") {

        }
        else {
            document.getElementById("imgs").innerHTML += `<img src="${selectedUser[i].img}">`
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("date").value = today;
    document.getElementById("submit").addEventListener("click", () => {
        document.getElementById("date").value = today;
    })

})

