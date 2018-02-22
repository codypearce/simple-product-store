window.onload = function () {
    let loginBtn = document.getElementById('loginBtn')
    let signupBtn = document.getElementById('signupBtn')
    let addUserBtn = document.getElementById('addUserBtn')
    utils.clickFunction(loginBtn, login)
    utils.clickFunction(signupBtn, signup)
    utils.clickFunction(addUserBtn, addUser)
}

function login () {
    utils.fetchPostForm(['email', 'password'], '/admin/login')
}

function signup () {
    utils.fetchPostForm(['email', 'password'], '/admin/signup')
}

function addUser () {
    utils.fetchPostForm(['email', 'password'], '/admin/users/add', '/admin/users')
}
