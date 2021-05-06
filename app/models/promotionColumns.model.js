const mongoose = require('mongoose');
 
const PromotionColumnsSchema = mongoose.Schema({
    promotionColumns: Object,
});

module.exports = mongoose.model('PromotionColumns', PromotionColumnsSchema);