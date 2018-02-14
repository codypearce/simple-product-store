window.onload = function () {
    let loginBtn = document.getElementById('loginBtn')
    let signupBtn = document.getElementById('signupBtn')
    let addUserBtn = document.getElementById('addUserBtn')
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            login()
        })
    }
    if (signupBtn) {
        signupBtn.addEventListener('click', function (e) {
            signup()
        })
    }
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function (e) {
            addUser()
        })
    }
}
// Submitting the Form
function login () {
    var formData = utils.getFormData('email', 'password')

    fetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => window.location.href = '/admin')
        .catch(error => console.error('Error', error))
}

function signup () {
    var formData = utils.getFormData('email', 'password')

    fetch('/admin/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => window.location.href = '/admin')
        .catch(error => console.error('Error', error))
}

function addUser () {
    var formData = utils.getFormData('email', 'password')

    fetch('/admin/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => window.location.href = '/admin/users')
        .catch(error => console.error('Error', error))
}
