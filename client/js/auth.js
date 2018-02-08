window.onload = function () {
    var loginBtn = document.getElementById('loginBtn')
    var signupBtn = document.getElementById('signupBtn')
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
}
// Submitting the Form
function login () {
    var formData = getFormData()

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
    var formData = getFormData()

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

function getFormData () {
    var obj = {
        email: getVal('email'),
        password: getVal('password')
    }
    return obj
}
function getVal (name) {
    return document.getElementsByName(name)[0].value
}
