var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test',function (req,res,next) {
  res.send('respond with a resource  next');
})

router.post('/login',function (req,res,next) {
  let param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  };

  User.findOne(param,function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.cookie('userName',doc.userName,{
          path:"/",
          maxAge:1000*60*60
        })
        //req.session.user = doc;
        res.json({
          status:"0",
          msg:"",
          result:{
            userName:doc.userName
          }
        })
      }else{
        res.json({
          status:"1",
          msg:"发生未知错误"
        })
      }
    }
  })
})

router.post('/logout',function (req,res,next) {
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})

router.get('/checkLogin',function (req,res,next) {
  if (req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})

//cart list
router.get("/cartList",function (req,res,next) {
  let userId = req.cookies.userId;
  User.findOne({userId:userId},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        doc.cartList;
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})


router.post("/cart/del",function (req,res,next) {
  let userId = req.cookies.userId,productId = req.body.productId;
  User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  });
})

//修改商品数量s
router.post("/cartEdit",function (req,res,next) {
  let userId = req.cookies.userId,productId = req.body.productId,productNum = req.body.productNum;
  User.update({userId:userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":productNum
  },function (err,doc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:"",
        result:'suc'
      })
    }
  })
})


//改变选中状态
router.post("/changeChecked",function (req,res,next) {
  let userId = req.cookies.userId,productId = req.body.productId,productStatic = req.body.checked;
  User.update({userid:userId,"cartList.priductId":productId},{
    "cartList.$.checked":productStatic
  },function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message(),
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:"",
        result:"suc"
      })
    }
  })
})
module.exports = router;
