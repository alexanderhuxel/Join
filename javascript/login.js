let alert = false;
Users = JSON.parse(localStorage.getItem('Users')) || [];




function login() {
    password = document.getElementById("password").value;
    email = document.getElementById("email").value;
    if (password == Users[0].password && email == Users[0].email) {
        window.location = "../html/matrix.html";
    } if (password != Users[0].password, email != Users[0].email) {
        alertFade(errormessage[0], 'danger', 'translateY(30vh)');
    }
}


function signUp() {
    img = "../img/busy.png"
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    Users.push(createUser(username, email, password, img));
    localStorage.setItem('Users', JSON.stringify(Users));
    if (username == "" && password == "" && email == "", password == "") {
        email = "";
        username = "";
        password = ""
        alertFade(errormessage[1], 'danger', 'translateY(30vh)');
    } else {
        setTimeout(() => {
            window.location = "../html/addTask.html"
        }, 200);
    }

}

function changeForm() {
    document.getElementById("login").innerHTML = `
    <img class="mb-4" src="../img/logo.png" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Join the community</h1>
            <label for="name" class="sr-only">Username</label>
            <input type="text" id="username" class="form-control" placeholder="Username" required autofocus>
            <label  class="sr-only">E-Mail address</label>
            <input type="email" id="email" class="form-control" placeholder="E-Mail address" required autofocus>
            <label class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required autofocus>
            </div><a href="../html/matrix.html">Login as Guest</a>
            <button class="btn btn-lg  btn-primary btn-block" type="button" onclick="signUp()">Sign up</button>
            `
}

/**
 * by register an new user create an JSON object with the data
 * @param {string} name - name of the user 
 * @param {string} email - email of the user
 * @param {string} img - img of the user
 * @returns 
 */
function createUser(username, email, password, img) {
    return {
        "username": username,
        "email": email,
        "password": password,
        "img": img
    }
}