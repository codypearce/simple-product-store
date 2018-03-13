window.onload = function () {
    let addUserBtn = document.getElementById('addUserBtn')
    utils.clickFunction(addUserBtn, addUser)
}

function addUser () {
    utils.fetchPostForm(['email', 'password'], '/admin/users/add', '/admin/users')
}
