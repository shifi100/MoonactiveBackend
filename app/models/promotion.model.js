const mongoose = require('mongoose');


const PromotionSchema = mongoose.Schema(
    {},
    { strict: false }
);


module.exports = mongoose.model('Promotion', PromotionSchema);