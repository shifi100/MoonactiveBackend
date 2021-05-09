const Promotion = require('../models/promotion.model')
const PromotionColumns = require('../models/promotionColumns.model')


// Create a new Promotion
exports.createPromotion = async (req, res) => {
    console.log("createPromotions function called");
    const promotionData = new Promotion(req.body.promotionData);
    promotionData.save()
    .then((data) => { 
        console.log("new promotion added")
        res.status(200).json(data);
     })
    .catch((err) => {
        console.log("failed to add new promotion") 
        console.log(err);
        res.status(500).json({
            message: "Fail to save new promotion!",
            error: err.message
        });
    })
};
  
// Fetch all Promotions
exports.getPromotions = async (req, res) => {
    console.log("getPromotions function called");
    console.log(req.query.page)
    const pageNumber = Number(req.query.page);
    const limit = 50;
    const totalPages = await Promotion.countDocuments();
    console.log(totalPages)
    Promotion.find().select('-__v')
    .limit(limit)
    .skip((pageNumber - 1) * limit)
    .then(async promotionInfo => {
          res.status(200).json({promotionInfo, totalPages: Math.ceil(totalPages / limit)});
        }).catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error fetching promotions!",
              error: error
          });
        });
};

// Get a promotion by Id
exports.getPromotion = (req, res) => {
    console.log("getPromotionById function called");
    let promotionId = req.params.id;
    Promotion.findById(promotionId)
    .then(promotionInfo => {
      res.status(200).json(promotionInfo);
    }).catch(error => {
      console.log(error);
      res.status(500).json({
          message: "Error fetching promotions!",
          error: error
      });
    });
  };
  
 
// UPDATE a Promotion
exports.updatePromotion = async (req, res) => {
    // Find promotion and update it
    console.log("updatePromotion function called");
    const promotionId = req.body.promotionData._id;
    Promotion.findByIdAndUpdate(
        promotionId, 
        req.body.promotionData, 
          {new: true}
      )
    .then(promotion => {
        res.status(200).json("success update promotion");
    }).catch(err => {
        console.log(err);
        return res.status(500).send({
            message: "Error -> Can not update a promotion with id = " + promotionId,
            error: err.message
        });
    });
};

// DELETE a promotion
exports.deletePromotion = async (req, res) => {
    console.log("deletePromotion function called");
    const promotionId = req.params.id;
    Promotion.findByIdAndRemove(promotionId)
    .then(promotion => {
        res.status(200).json("success delete promotion");
    }).catch(err => {
        console.log(err);
        return res.status(500).send({
            message: "Error -> Can not delete a promotion with id = " + promotionId,
            error: err.message
        });
    });
};

exports.generatePromotions = async (req, res) => {
   PromotionColumns.findById(process.env.currentPromotionId).then(promotionInfo => {
        columns = promotionInfo.promotionColumns;
        for (let index = 0; index < 10; index++) {
            const newPormotion = {};
            Object.keys(columns).map(key => {
                switch(columns[key]){
                    case 'String': 
                        newPormotion[key] = key + index;
                        break;
                    case 'Date': 
                        newPormotion[key] = new Date();
                        break;  
                    case 'Number': 
                        newPormotion[key] = index;
                        break;         
                }
                if(columns[key] instanceof Array){
                    const randomIndex = Math.floor(Math.random() * columns[key].length);
                    newPormotion[key] =columns[key][randomIndex];
                }
            }); 
            const promotionData = new Promotion(newPormotion);
            promotionData.save()
            .then((data) => { 
                console.log("new promotion added")
            })
            .catch((err) => {
                console.log("failed to add new promotion") 
                console.log(err);
                throw err;
            })
        }
        res.send("success generated")
   }).catch(error => {
    console.log(error);
    res.status(500).json({
        message: "Error generat promotions!",
        error: error
    });
  });
}