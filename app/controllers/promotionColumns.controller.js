const PromotionColumns = require('../models/promotionColumns.model');




// Get a Promotion Colums
exports.getPromotionsColumns = (req, res) => {
  console.log("getPromotionsColumns function called");
  PromotionColumns.findById(process.env.currentPromotionId).then(promotionInfo => {
    res.status(200).json(promotionInfo.promotionColumns);
  }).catch(error => {
    console.log(error);
    res.status(500).json({
      message: "Error fetching promotions columns!",
      error: error
    });
  });

}
// Create a Promotion Columns
exports.createPromotionsColumns = (req, res) => {
  console.log("createPromotionsColumns function called");
  const promotion = new PromotionColumns({
    promotionColumns: req.body.promotionColumns,
  });
  // Save a Promotion in the MongoDB
  promotion.save().then(data => {
    process.env.currentPermissionId = data._id;
    console.log(process.env.currentPermissionId)
    res.status(200).json(data);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Fail to save new promotion columns!",
      error: err.message
    });
  });
};