window.onload = function() {
    var submitBtn = document.getElementById('submitBtn');
    if(submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitForm();
        })
    }
    var elInput = document.getElementById('externalLinkInput');
    if(elInput) {
        elInput.addEventListener('blur', function(e) {
            var val = e.target.value;
            if(!validateUrl(val)) {
                alert('Please Input a valid url')
            }
        })
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
    return el.addEventListener('blur', (e) => validateFunction())
}
setUpValidation();
function titleValidation() {
    console.log('titleValidation!')
}
function slugValidation() {
    console.log('slugValidation!')
}
function priceValidation() {
    console.log('priceValidation!')
}
function externalLinkValidation() {
    console.log('externalLinkValidation!')
}
function descriptionValidation() {
    console.log('descriptionValidation!')
}
function validateUrl(url) {
    var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return testUrl == null ? false : true;
}
