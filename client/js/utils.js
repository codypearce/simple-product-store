const utils = {
    getVal (name) {
        return document.getElementsByName(name)[0].value
    },
    getInput (name) {
        return document.getElementsByName(name)[0]
    },
    getFormData (...fields) {
        var obj = {}
        fields.forEach(field => {
            obj[field] = this.getVal(field)
        })
        return obj
    },
    addBlur (el, validateFunction) {
        return el.addEventListener('blur', e => validateFunction(e))
    },
    clickFunction (el, cb) {
        if (el) {
            el.addEventListener('click', function (e) {
                cb(e)
            })
        }
    },
    fetchPostForm (formParams, route, redirect, categories) {
        var formData = this.getFormData(...formParams)
        if (categories) {
            formData.categories = categories
        }
        fetch(route, {
            method: 'POST',
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(
                res =>
                    redirect
                        ? (window.location.href = redirect)
                        : console.log('success')
            )
            .catch(error => console.error('Error', error))
    }
}
