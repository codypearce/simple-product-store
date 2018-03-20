window.onload = function () {
    let submitBtn = document.getElementById('submitBtn')
    let condenseBtn = document.getElementById('condenseBtn')
    utils.clickFunction(submitBtn, function (e) {
        handleSubmit(e)
    })
    utils.clickFunction(condenseBtn, function (e) {
        toggleCondensed()
    })
    setUpValidation()
}

function handleSubmit (e) {
    e.preventDefault()

    deleteError(e.target)

    checkForm()

    if (errorsExist()) {
        createError(e.target, 'Please fix the errors above before submitting')
    } else {
        utils.fetchPostForm(
            ['title', 'slug', 'price', 'externalLink', 'description'],
            '/admin/products',
            '/admin',
            categories.arr
        )
    }
}

function errorsExist () {
    var errors = document.querySelectorAll('.error')
    if (errors.length > 0) {
        return true
    } else {
        return false
    }
}

// Validating the form
function setUpValidation () {
    utils.addBlur(utils.getInput('title'), validate.titleValidation)
    utils.addBlur(utils.getInput('slug'), validate.slugValidation)
    utils.addBlur(utils.getInput('price'), validate.priceValidation)
    utils.addBlur(
        utils.getInput('externalLink'),
        validate.externalLinkValidation
    )
    utils.addBlur(
        utils.getInput('description'),
        validate.descriptionValidation
    )
}

function checkForm () {
    validate.titleValidation(null, utils.getInput('title'))
    validate.slugValidation(null, utils.getInput('slug'))
    validate.priceValidation(null, utils.getInput('price'))
    validate.externalLinkValidation(null, utils.getInput('externalLink'))
    validate.descriptionValidation(null, utils.getInput('description'))
}

// Create and display Form Errors
function createInputError (inputDiv, errorMsg) {
    var errorSpan = document.createElement('span')
    errorSpan.classList.add('error')
    errorSpan.textContent = errorMsg
    inputDiv.parentElement.appendChild(errorSpan)
    inputDiv.classList.add('input--error')
    inputDiv.classList.remove('input--success')
}
function createError (el, errorMsg) {
    var errorSpan = document.createElement('div')
    errorSpan.classList.add('error')
    errorSpan.textContent = errorMsg
    el.parentElement.appendChild(errorSpan)
}
function deleteErrorIfExists (parent, inputDiv) {
    var error = parent.querySelector('.error') || null
    if (error) {
        parent.removeChild(error)
        inputDiv.classList.remove('error-input')
    }
}
function deleteError (el) {
    var error = el.parentElement.querySelector('.error') || null
    if (error) {
        el.parentElement.removeChild(error)
    }
}
function showSuccess (inputDiv) {
    inputDiv.classList.add('input--success')
}

function toggleCondensed () {
    let adminDescription = document.getElementsByClassName('admin_description')

    for (var i = 0; i < adminDescription.length; i++) {
        if (adminDescription[i].classList.contains('hidden')) {
            adminDescription[i].classList.remove('hidden')
        } else {
            adminDescription[i].classList.add('hidden')
        }
    }
}
