const mongoose = require('mongoose');

const Property = mongoose.Schema({

    name: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    unit: { type: Number, trim: true, default: '' },
    price: { type: Number, trim: true, default: '0' },
    ownership: { type:String, trim: true, default: '' },



});
module.exports = mongoose.model('Property', Property);
