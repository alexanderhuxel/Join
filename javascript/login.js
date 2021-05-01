alert = false;

/**
 * checking if Users contains email and check for right password
 * after that in case of true redirect to addTask.html in case of false error
 * @property {array} Users all Users saved on the server  
 * @example let user = Users.find(u => password == u.password && email == u.email);
    if (user) {
        window.location.href = "../html/addtask.html";
    } else {
        alertFade(errormessage[0], 'danger', 'translateY(30vh)');
    }
 */
function login() {
    password = document.getElementById("password").value;
    email = document.getElementById("email").value;
    Users = JSON.parse(backend.getItem("Users"));
    let user = Users.find(u => password == u.password && email == u.email);
    if (user) {
        window.location.href = "../html/addTask.html";
    } else {
        alertFade(errormessage[0], 'danger', 'translateY(30vh)');
    }
}

/**
 * creating an new user and push them to the server after that the location will change to addtask
 * @param {string} img  img of the created user
 * @param {string} email  mail of the created user
 * @param {string} username  username of the created user
 * @param {string} password  password of the created user
 * @param {function} createUser  all data of the function parameter
 */
async function signUp() {
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    Users = JSON.parse(backend.getItem('Users')) || [];
    Users.push(createUser(username, email, password, "../img/busy.png"));
    await backend.setItem('Users', JSON.stringify(Users));
    setTimeout(() => {
        window.location = "../html/addTask.html"
    }, 200);
}
/**
 * changing the HTML of the loginform to the Signupform
 */
function changeForm() {
    document.getElementById("main").innerHTML = `
    <form onsubmit="signUp(); return false" id="login" class="form-signin">
    <img class="mb-4" src="../img/logo.png" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Join the community</h1>
            <label for="name" class="sr-only">Username</label>
            <input type="text" id="username" class="form-control" placeholder="Username" required="" autofocus="">
            <label class="sr-only">E-Mail address</label>
            <input type="email" id="email" class="form-control" placeholder="E-Mail address" required="" autofocus="">
            <label class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required="" autofocus="">
            <a href="../html/addTask.html">Login as Guest</a>
            <button class="btn btn-lg  btn-primary btn-block" type="submit" value="submit">Sign up</button>
            </form>
            `
}

/**
 * by register an new user create an JSON object with the data
 * @param {string} name - name of the user 
 * @param {string} email - email of the user
 * @param {string} img - img of the user
 * @returns {object} - the user object
 */
function createUser(username, email, password, img) {
    return {
        "username": username,
        "email": email,
        "password": password,
        "img": img
    }
}