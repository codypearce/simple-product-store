window.onload = function () {
    var loginBtn = document.getElementById('loginBtn')
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            login()
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
