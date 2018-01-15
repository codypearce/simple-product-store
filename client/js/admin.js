window.onload = function() {
    var submitBtn = document.getElementById('submitBtn');
    if(submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitForm();
        })
    }
    setUpValidation();
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
    var val = e.target.value;
    if(!val) {
        console.log(e.target)
        createError(e.target, 'Please add a title!')
        console.log('Please add a title!')
    }
}
function slugValidation(e) {
    var val = e.target.value;
    if(!val) {
        console.log('Please add slug!')
    }
    // Check if Unqiue

}
function priceValidation(e) {
    var val = e.target.value;
    if(!val) {
        console.log('Please add a price!')
    }
    if(isNaN(val)) {
        val = '',
        console.log('Only Numbers!')
    }

}
function externalLinkValidation(e) {
    var val = e.target.value;
    if(!val) {
        console.log('Please add a url!')
    }
    if(!validateUrl(val)) {
        console.log('Please Input a valid url')
    }
}
function descriptionValidation(e) {
    var val = e.target.value;
    if(!val) {
        console.log('Please add a descriptionValidation!')
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
    inputDiv.parentElement.appendChild(errorSpan)
}
