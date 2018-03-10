const Setting = require('../models/setting')

const settings = [
    {
        name: 'Products Per Page',
        value: 6
    }
]

Setting.findOne({name: settings[0].name}, function (err, setting) {
    if (err) console.log(err)

    if (setting) {
        return null
    } else {
        Setting.create(settings[0])
    }
})
