var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var msgS = document.getElementById('msgS');
var msgF = document.getElementById('msgF');
var msgn = document.getElementById('msgn');
var signBtn = document.getElementById('signbtn');
var logBtn = document.getElementById('logbtn');
var emailInputLog = document.getElementById('emailInputLog');
var passwordInputLog = document.getElementById('passwordInputLog');
var msgFaild = document.getElementById('msgFaild');
var msgnone = document.getElementById('msgnone');
var logOutBtn = document.getElementById('logOutBtn');
var usersList = [];

if (localStorage.getItem("usersContainer") !== null) {
    usersList = JSON.parse(localStorage.getItem("usersContainer"));
}

let usernameValue = localStorage.getItem('nameContainer');
if (usernameValue) {
    document.getElementById('username').innerHTML = 'welcome ' + usernameValue;
}

function validationInputs(el) {
    let regex = {
        nameInput: /^[a-zA-Z ]{3,30}$/,
        emailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        passwordInput: /^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).{8,20}$/
    };
    if (regex[el.id].test(el.value)) {
        el.classList.add("is-valid");
        el.classList.remove("is-invalid");
        return true;
    } else {
        el.classList.remove("is-valid");
        el.classList.add("is-invalid");
        return false;
    }
}

function validationInput() {
    let inputs = [nameInput, emailInput, passwordInput];
    return inputs.every((input) => validationInputs(input));
}

function signUp() {
    if (!emailExist() && validationInput()===true ) {
        var user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        usersList.push(user);
        localStorage.setItem("usersContainer", JSON.stringify(usersList));
        msgF.classList.add('d-none');
        msgS.classList.remove('d-none');
        msgn.classList.add('d-none');
    } else {
        emailExist();
    }
    if (nameInput.value === "" || emailInput.value === "" || passwordInput.value === "") {
        msgn.classList.remove('d-none');
        msgF.classList.add('d-none');
        msgS.classList.add('d-none');
    }
}

function emailExist() {
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email === emailInput.value) {
            msgF.classList.remove('d-none');
            msgS.classList.add('d-none');
            msgn.classList.add('d-none');
            return true;
        }
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('signbtn');
    if (el) {
        el.addEventListener('click', signUp, false);
    }
});
function logiIn() {
    var emailterm = emailInputLog.value; 
    var passwordterm = passwordInputLog.value;

    if (emailterm === "" || passwordterm === "") {
        
        msgnone.classList.remove('d-none');
        msgFaild.classList.add('d-none');
        return; 
    }

    for (let i = 0; i < usersList.length; i++) {
        if (emailterm === usersList[i].email && passwordterm === usersList[i].password) {
            localStorage.setItem("nameContainer", usersList[i].name);
            window.location.href = "./welcome.html";
            return; 
        }
    }

    msgnone.classList.add('d-none');
    msgFaild.classList.remove('d-none');
}

window.addEventListener("DOMContentLoaded", (event) => {
    const el = document.getElementById('logbtn');
    if (el) {
        el.addEventListener('click', logiIn);
    }
});

function logOut(){
    window.location.href = "./index.html";
}
