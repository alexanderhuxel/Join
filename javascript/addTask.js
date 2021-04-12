

allTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
selectedUser = JSON.parse(localStorage.getItem('selectedUser')) || [];
Users = JSON.parse(localStorage.getItem('Users')) || [];
let show = false;
let isfilled = false;
selectedUser = [];

function addTask() {
    let description = document.getElementById("description").value;
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let selectorimportance = document.getElementById("importance").selectedIndex;
    let selectorcategory = document.getElementById("category").selectedIndex;
    let importance = document.getElementById("importance").options[selectorimportance].value;
    let category = document.getElementById("category").options[selectorcategory].value;
    allTasks.push(createObj(title, date, category, description, importance, selectedUser))
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    localStorage.setItem('selectedUser', JSON.stringify(""));
    console.table(allTasks)
    alertAdded();
    if (show) {
        chooseUser();
        x = document.getElementsByClassName("user");
        for (let i = 0; i < x.length; i++) {
            if (x[i].classList.contains("added")) {
                x[i].classList.remove("added")
            }
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
function createObj(title, date, category, description, importance, selectedUser) {
    return {
        "title": title,
        "date": date,
        "category": category,
        "description": description,
        "importance": importance,
        "user": selectedUser,
        "time": new Date().getDay()

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
}
/**
 * generate an Alert from bootstrap after 2000ms change style 
 */
function alertAdded() {
    document.getElementById("main").innerHTML += `<div id="alert" style="text-align: center; font-size: 1.5rem"  class="alert alert-success" role="alert">
    Your task has been saved
  </div>
    `
    setTimeout(() => {
        document.getElementById("alert").style.transform = "translateY(500px)"
    }, 2000);
}

function chooseUser() {
    if (!isfilled) {
        for (let i = 0; i < Users.length; i++) {
            document.getElementById("modalcontent").innerHTML += `
            <div id="${i}" onclick="selectUser(${i})" ${Users[i].email} class="user">
            <p class="name">${Users[i].username}</p>
            <img src="${Users[i].img}">
            </div>`
        }
        isfilled = true;
        chooseUser();
    } else if (isfilled && !show) {
        document.getElementById("button-modal").classList.remove("d-none");
        document.getElementById("modalcontent").classList.remove("d-none");
        show = true;
    } else if (isfilled && show) {
        document.getElementById("button-modal").classList.add("d-none");
        document.getElementById("modalcontent").classList.add("d-none");
        show = false;
    }
}


function selectUser(i) {
    document.getElementById(i).classList.add("added");
    selectedUser.push(Users[i]);
    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
}


function cancle() {
    if (show && isfilled) {
        chooseUser();
        clearInput();
    } if (!show) {
        clearInput();
    }
}

function checkDay() {
    if (allTasks.time > 3) {

    }
}
