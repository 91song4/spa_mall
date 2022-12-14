const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    goodsId: {
        type: Number,
        unique: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Cart', cartSchema);