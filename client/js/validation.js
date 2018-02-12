const validate = {

    titleValidation (e, input) {
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
    },
    slugValidation (e, input) {
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
    },
    priceValidation (e, input) {
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
    },
    externalLinkValidation (e, input) {
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
    },
    descriptionValidation (e, input) {
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
    },
    validateUrl (url) {
        var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        return testUrl != null
    }

}