var http = require('http');

http.get('http://www.imooc.com/u/card',function (res) {
  let data = '';
  res.on("data",function (chunk) {
    data += chunk;
  })

  res.on("end",function () {
    let result = data;
    console.log(result.msg);
  })
})
