function limitText (arr, amount) {
    arr.forEach(function (product) {
        if (product.description.length > amount) {
            product.description = product.description.substring(0, amount).trim() + '...'
        }
    })
}

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) { return next() }

    res.redirect('/')
}

module.exports = {
    limitText,
    isLoggedIn
}
