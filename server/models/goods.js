var mongoose  = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImg":String
})

//mongoose.model 参数第一个会默认与goods关联 如果没有 第三个参数就是与mongo数据链接表
module.exports = mongoose.model("Good",productSchema,'goods');
