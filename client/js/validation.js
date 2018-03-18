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
        input.value = validate.slugify(val)
        val = input.value
        if (!val) {
            return createInputError(input, 'Please add a slug!')
        }
        validate.checkSlug(input.value).then(res => {
            if (res === true) {
                return createInputError(input, 'Slug must be unique')
            }
        })

        if (val) {
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

        } else if (!validate.validateUrl(val)) {
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
        } else {
            showSuccess(input)
        }
    },
    validateUrl (url) {
        var testUrl = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
        return testUrl != null
    },
    checkSlug (slug) {
        return fetch('/admin/products/slug/' + slug, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(error => console.error('Error', error))
    },
    slugify (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    }

}
