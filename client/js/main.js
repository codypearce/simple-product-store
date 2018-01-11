
if(document.getElementById('submitBtn')) {
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        submitForm();
    })
}
function submitForm() {
    var formData = getFormData();
    console.log(formData)
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
    return document.getElementsByName(name).value;
}



var elInput = document.getElementById('externalLinkInput');
elInput.addEventListener('blur', function(e) {
    var val = e.target.value;
    if(!validateUrl(val)) {
        alert('Please Input a valid url')
    }
})


function validateUrl(url) {
    var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return testUrl == null ? false : true;
}
