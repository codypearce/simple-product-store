window.onload = function() {
    var submitBtn = document.getElementById('submitBtn');
    if(submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if(errorsExist()) {
                console.log('Errors on page')
                return;
            }
            submitForm();
        })
    }
    setUpValidation();
}
function errorsExist() {
    var errors = document.querySelectorAll('.error');
    if(errors.length > 0) {
        return true;
    } else {
        return false;
    }
}
// Submitting the Form
function submitForm() {
    var formData = getFormData();
    console.log(formData)
    fetch('/admin/products', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => console.log(res))
    .catch(error => console.error('Error', error))

}

function getFormData() {
    var obj = {
        title: getVal('title'),
        slug: getVal('slug'),
        price: getVal('price'),
        externalLink: getVal('externalLink'),
        description: getVal('description'),
    }
    return obj;
}
function getVal(name) {
    return document.getElementsByName(name)[0].value;
}


function getInput(name) {
    return document.getElementsByName(name)[0];
}



// Validating the form
function setUpValidation() {
    addBlur(getInput('title'), titleValidation);
    addBlur(getInput('slug'), slugValidation);
    addBlur(getInput('price'), priceValidation);
    addBlur(getInput('externalLink'), externalLinkValidation);
    addBlur(getInput('description'), descriptionValidation);

}
function addBlur(el, validateFunction) {
    return el.addEventListener('blur', (e) => validateFunction(e))
}

function titleValidation(e) {
    var input = e.target;
    var parent = input.parentElement;
    var val = input.value;
    deleteErrorIfExists(parent, input);
    if(!val) {
        createError(input, 'Please add a title!')
    } else {
        showSuccess(input);
    }
}
function slugValidation(e) {
    var input = e.target;
    var parent = input.parentElement;
    var val = input.value;
    deleteErrorIfExists(parent, input);
    if(!val) {
        createError(input, 'Please add a slug!')
    } else {
        showSuccess(input);
    }
    // Check if Unqiue

}
function priceValidation(e) {
    var input = e.target;
    var parent = input.parentElement;
    var val = input.value;
    deleteErrorIfExists(parent, input);
    if(!val) {
        createError(input, 'Please add a price!')
    } else if(isNaN(val)) {
        val = '',
        createError(input, 'Only numbers!')
    } else {
        showSuccess(input);
    }

}
function externalLinkValidation(e) {
    var input = e.target;
    var parent = input.parentElement;
    var val = input.value;
    deleteErrorIfExists(parent, input);
    if(!val) {
        createError(input, 'Please add a url!')
    } else if (!validateUrl(val)) {
        createError(input, 'Please input a valid url!')
    } else {
        showSuccess(input);
    }
}
function descriptionValidation(e) {
    var input = e.target;
    var parent = input.parentElement;
    var val = input.value;
    deleteErrorIfExists(parent, input);
    if(!val) {
        createError(input, 'Please add a Description')

    } else if(val.length < 100) {
        createError(input, 'Please add a longer description')
    } else {
        showSuccess(input);
    }
}
function validateUrl(url) {
    var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return testUrl == null ? false : true;
}

// Create and display Form Errors

function createError(inputDiv, errorMsg) {
    var errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    errorSpan.textContent = errorMsg;
    inputDiv.parentElement.appendChild(errorSpan);
    inputDiv.classList.add('input--error');
    inputDiv.classList.remove('input--success');
    return;
}
function deleteErrorIfExists(parent, inputDiv) {
    var error = parent.querySelector('.error') || null;
    if(error) {
        parent.removeChild(error);
        inputDiv.classList.remove('error-input');
    }
}

function showSuccess(inputDiv) {
    inputDiv.classList.add('input--success');
}
