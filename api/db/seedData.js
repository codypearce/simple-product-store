const Setting = require('../models/setting')

const settings = [
    {
        name: 'Products Per Page',
        value: 6
    }
]

Setting.create(settings[0])
