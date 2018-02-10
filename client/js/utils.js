const utils = {
    getVal (name) {
        return document.getElementsByName(name)[0].value
    },
    getInput (name) {
        return document.getElementsByName(name)[0]
    },
    getFormData (...fields) {
        var obj = {}
        fields.forEach((field) => {
            obj[field] = this.getVal(field)
        })
        return obj
    },
    addBlur (el, validateFunction) {
        return el.addEventListener('blur', (e) => validateFunction(e))
    }
}
