window.onload = function () {
    // let catInput = utils.getInput('categories')
    // catInput.addEventListener('keypress', function (e) {
    //     handleCategoryClick(e)
    // })
}

let categories = {
    arr: [],
    removeFromCategoriesArr (val) {
        let i = this.arr.indexOf(val)
        if (i !== -1) {
            this.arr.splice(i, 1)
        }
    }
}
function handleCategoryClick (e, categoriesArr) {
    var key = e.which || e.keyCode
    if (key === 13) {
        if (categories.arr.length >= 10) {
            deleteError(e.target)
            createError(e.target, 'Categories limited to 10')
            e.target.value = ''
            return
        }
        addCategoryToView()
        e.target.value = ''
    }
}

function addCategoryToView (categoriesArr) {
    let val = utils.getVal('categories')
    if (categories.arr.includes(val)) {
        return
    }
    categories.arr.push(val)

    let categoryList = document.getElementById('categories-container')

    let catSpan = document.createElement('span')
    catSpan.classList.add('category-link')
    catSpan.classList.add('cateogry-link--admin')
    catSpan.textContent = val
    catSpan.addEventListener('click', function (e) {
        deleteAdminCategory(e, val)
    })
    categoryList.appendChild(catSpan)
}
function deleteAdminCategory (e, val) {
    e.target.remove()
    categories.removeFromCategoriesArr(val)
}
