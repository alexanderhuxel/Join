/**
 * @var click 
 * @var alert the status of the alert
 * @var show the visibility of the dialog
 * @var status the status of the dialog
 * @var usersetting varibale need for the dialog
 * 
 */
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


/**
 * @property {string}  description - inputfield with discription
 * @property {string} title - inputfield with title
 * @property {date} date - inputfield date
 * @property {string} selectorimportance - inputfield with selectingoption of importance
 * @property {string} selectorcategory - inputfield with selectingoption of category
 * @property {string} importance - select of importance
 * @property {string} category - select of category
 * @property {function} alertFade - fading alert in in case of creating task
 * @property {function} clearInput - clear the input
 * @property {array} selectedUser - array of selected Users 
 * @property {array} allTasks - array of all Tasks saved to the server
 * @description
 * taking all data of the inputfields and create an object then push it to 
 * allTasks and save to the server 
 * run alertFade()
 * run clearInput()
 */

function addTask() {
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
}

/**
 * @param {string} title -title of the Task
 * @param {number} date  -date of the Task
 * @param {string} description  - description of the Task
 * @param {string} importance - importance of the Task
 * @param {string} category - category of the Task
 * @param {object} selectecUser - object with the userdata 
 * @returns {object} the task object
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

/**
 * <b>sorry for this dirty solution </b> <br>
 * incase the dialog is not filled the dialog will be filled <br>
 * else if isfilled && !show open the dialog <br>
 * else if isfilled  && show close the dialog <br>
 * @property {function} generatingUserList - genertes the userlist
 * @property {function} clearDrawedUsers - clear the drawed users
 * @property {function} drawPickedUsers - draw the picked user
 * @example
 *  Users = JSON.parse(backend.getItem("Users"));
    if (!isfilled) {
        for (let i = 0; i < Users.length; i++) {
            document.getElementById("content").innerHTML += generatingUserList(i, Users);
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
 */
function chooseUser() {
    Users = JSON.parse(backend.getItem("Users"));
    if (!isfilled) {
        for (let i = 0; i < Users.length; i++) {
            document.getElementById("content").innerHTML += generatingUserList(i, Users);
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

/**
 * checking if the classlist of the element contains ("added"), in case remove the class and slice out of the array <br>
 * checking of the classlist of the element contains ("user"), in case add ("added") and push tot he array 
 * @param {i} i index of the the element 
 * @property {array} selectedUser - array of all selectedUsers
 */
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



/**
 * @property {function} removeAddedUserClass - remove class of all users
 * @property {function} clearInput - clear the input
 */
function cancle() {
    removeAddedUserClass();
    clearInput();
}

/**
 * @property {number} i index of the element
 * draw the img of the selectedUser
 */
function drawPickedUsers() {
    for (let i = 0; i < selectedUser.length; i++) {
        if (selectedUser[i] == "") {
        } else {
            document.getElementById("userimg").innerHTML += `<img src="${selectedUser[i].img}">`
        }
    }
}
/**
 * clear the drawed users out of the html
 */
function clearDrawedUsers() {
    document.getElementById("userimg").innerHTML = "";
}

/**
 * remove all the class ("added") of all users in the array 
 */
function removeAddedUserClass() {
    for (let i = 0; i < Users.length; i++) {
        document.getElementById(i).classList.remove("added");
    }
}

/**
 * 
 * @param {number} i - the index of the funtion used for the loop
 * @param {array}  array - the array used for the loop
 * @returns - needed html to generate the listofthUsers
 */
function generatingUserList(i, array) {
    return `
    <div id="${i}" onclick="selectUser(${i})" class="user">
    <img src="${Users[i].img}">
    <div class="username">
        ${Users[i].username}
    </div>
</div>`
}

