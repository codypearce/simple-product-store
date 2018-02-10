window.onload = function () {
    var submitBtn = document.getElementById('submitBtn')
    if (submitBtn) {
        submitBtn.addEventListener('click', function (e) {
            e.preventDefault()
            deleteError(e.target)
            checkForm()
            if (errorsExist()) {
                createError(e.target, 'Please fix the errors above before submitting')
            } else {
                submitForm()
            }
        })
    }
    setUpValidation()
}
function errorsExist () {
    var errors = document.querySelectorAll('.error')
    if (errors.length > 0) {
        return true
    } else {
        return false
    }
}
// Submitting the Form
function submitForm () {
    var formData = utils.getFormData('title', 'slug', 'price', 'externalLink', 'description')

    fetch('/admin/products', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => console.log('test'))
        .catch(error => console.error('Error', error))
}

// Validating the form
function setUpValidation () {
    utils.addBlur(utils.getInput('title'), titleValidation)
    utils.addBlur(utils.getInput('slug'), slugValidation)
    utils.addBlur(utils.getInput('price'), priceValidation)
    utils.addBlur(utils.getInput('externalLink'), externalLinkValidation)
    utils.addBlur(utils.getInput('description'), descriptionValidation)
}

function checkForm () {
    titleValidation(null, utils.getInput('title'))
    slugValidation(null, utils.getInput('slug'))
    priceValidation(null, utils.getInput('price'))
    externalLinkValidation(null, utils.getInput('externalLink'))
    descriptionValidation(null, utils.getInput('description'))
}

function titleValidation (e, input) {
    var val
    if (e) {
        var input = e.target

        val = input.value
    } else {
        val = input.value
    }
    var parent = input.parentElement
    deleteErrorIfExists(parent, input)
    if (!val) {
        createInputError(input, 'Please add a title!')
    } else {
        showSuccess(input)
    }
}
function slugValidation (e, input) {
    var val
    if (e) {
        var input = e.target

        val = input.value
    } else {
        val = input.value
    }
    var parent = input.parentElement
    deleteErrorIfExists(parent, input)
    if (!val) {
        createInputError(input, 'Please add a slug!')
    } else {
        showSuccess(input)
    }
    // Check if Unqiue
}
function priceValidation (e, input) {
    var val
    if (e) {
        var input = e.target
        val = input.value
    } else {
        val = input.value
    }
    var parent = input.parentElement
    deleteErrorIfExists(parent, input)
    if (!val) {
        createInputError(input, 'Please add a price!')
    } else if (isNaN(val)) {
        val = '',
        createInputError(input, 'Only numbers!')
    } else {
        showSuccess(input)
    }
}
function externalLinkValidation (e, input) {
    var val
    if (e) {
        var input = e.target
        val = input.value
    } else {
        val = input.value
    }
    var parent = input.parentElement
    deleteErrorIfExists(parent, input)
    if (!val) {

    } else if (!validateUrl(val)) {
        createInputError(input, 'Please input a valid url!')
    } else {
        showSuccess(input)
    }
}
function descriptionValidation (e, input) {
    var val
    if (e) {
        var input = e.target
        val = input.value
    } else {
        val = input.value
    }
    var parent = input.parentElement
    deleteErrorIfExists(parent, input)
    if (!val) {
        createInputError(input, 'Please add a Description')
    } else if (val.length < 50) {
        createInputError(input, 'Please add a longer description')
    } else {
        showSuccess(input)
    }
}
function validateUrl (url) {
    var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    return testUrl != null
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
