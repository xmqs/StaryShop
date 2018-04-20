var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods');


mongoose.connect('mongodb://127.0.0.1:27017/db_demo');

mongoose.connection.on("connected",function () {
  console.log("mongodb is online!");
})

mongoose.connection.on("error",function () {
  console.log("mongodb is outline!");
})

mongoose.connection.on("disconnected",function () {
  console.log("mongodb is disconnected!");
})

router.get("/",function (req,res,next) {
  let page = req.param("page");
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param("sort");
  let priceLevel = req.param("priceLevel");
  let priceGt = '';
  let priceLt = '';
  let params = {};
  let skip = (page-1)*pageSize;

  if(!(priceLevel == "all")){
    switch (priceLevel) {
      case "0" :priceGt = 0;priceLt = 100;break;
      case "1" :priceGt = 100;priceLt = 500;break;
      case "2" :priceGt = 500;priceLt = 1000;break;
      case "3" :priceGt = 1000;priceLt = 5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lt:priceLt
      }
    }
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec({},function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      res.json({
        status:"0",
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

module.exports = router;
