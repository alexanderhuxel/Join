/**
 * all varialbes needed for the current page
 * @param {boolean} alert the status if the alert is already set 
 */
let alert = false;




function login() {
    password = document.getElementById("password").value;
    email = document.getElementById("email").value;
    Users = JSON.parse(backend.getItem("Users"));

    if (password == Users[0].password && email == Users[0].email) {
        window.location.assign = "../html/addtask.html";
    } if (password != Users[0].password, email != Users[0].email) {
        alertFade(errormessage[0], 'danger', 'translateY(70vh)');
    }
}

/**
 * creating an new user and push them to the database after that the location will change to addtask
 * @param {string} img  img of the created user
 * @param {string} email  mail of the created user
 * @param {string} username  username of the created user
 * @param {string} password  password of the created user
 * @param {function} createUser  all data of the function parameter
 */
function signUp() {
    img = "../img/busy.png"
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    Users.push(createUser(username, email, password, img));
    backend.setItem('Users', JSON.stringify(Users));
    setTimeout(() => {
        window.location = "../html/addTask.html"
    }, 200);
}
/**
 * changing the HTML of the loginform to the Signupform
 */
function changeForm() {
    document.getElementById("login").innerHTML = `
    <form onsubmit="signUp()" id="login" class="form-signin">
    <img class="mb-4" src="../img/logo.png" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Join the community</h1>
            <label for="name" class="sr-only">Username</label>
            <input type="text" id="username" class="form-control" placeholder="Username" required="" autofocus="">
            <label class="sr-only">E-Mail address</label>
            <input type="email" id="email" class="form-control" placeholder="E-Mail address" required="" autofocus="">
            <label class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required="" autofocus="">
            <a href="../html/matrix.html">Login as Guest</a>
            <button class="btn btn-lg  btn-primary btn-block" type="submit" value="submit">Sign up</button>
            </form>
            `
}

/**
 * by register an new user create an JSON object with the data
 * @param {string} name - name of the user 
 * @param {string} email - email of the user
 * @param {string} img - img of the user
 */
function createUser(username, email, password, img) {
    return {
        "username": username,
        "email": email,
        "password": password,
        "img": img
    }
}