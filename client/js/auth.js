window.onload = function () {
    let addUserBtn = document.getElementById('addUserBtn')
    utils.clickFunction(addUserBtn, addUser)
    utils.addBlur(utils.getInput('email'), validate.basicValidation)
    utils.addBlur(utils.getInput('password'), validate.basicValidation)
}

function addUser () {
    utils.fetchPostForm(
        ['email', 'password'],
        '/admin/users/add',
        '/admin/users'
    )
}
