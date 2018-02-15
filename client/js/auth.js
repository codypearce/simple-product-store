window.onload = function () {
    let loginBtn = document.getElementById('loginBtn')
    let signupBtn = document.getElementById('signupBtn')
    let addUserBtn = document.getElementById('addUserBtn')
    utils.clickFunction(loginBtn, login)
    utils.clickFunction(signupBtn, signup)
    utils.clickFunction(addUserBtn, addUser)
}
// Submitting the Form
function fetchPostForm (formParams, route, redirect) {
    var formData = utils.getFormData(...formParams)

    fetch(route, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => redirect ? window.location.href = '/admin' : console.log('success'))
        .catch(error => console.error('Error', error))
}

function login () {
    fetchPostForm(['email', 'password'], '/admin/login', '/admin')
}

function signup () {
    fetchPostForm(['email', 'password'], '/admin/users', '/admin')
}

function addUser () {
    fetchPostForm(['email', 'password'], '/admin/users/add', '/admin/users')
}
