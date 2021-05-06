module.exports = function(app) {

  var promotionColumns = require('../controllers/promotionColumns.controller');
  var promotions = require('../controllers/promotion.controller');

  app.get('/api/promotionsColumns', promotionColumns.getPromotionsColumns);
  app.post('/api/promotionsColumns', promotionColumns.createPromotionsColumns);
  app.post('/api/promotions', promotions.createPromotion);
  app.get('/api/promotion/:id', promotions.getPromotion);
  app.get('/api/promotions', promotions.getPromotions);
  app.put('/api/promotion', promotions.updatePromotion);
  app.delete('/api/promotion/:id', promotions.deletePromotion);
  app.post('/api/generatePromotion/', promotions.generatePromotions);
}