const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()
exports.main = async(event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openId,
      page: 'pages/index/index',
      lang: 'zh_CN',
      "data": {
        "name3": {
          "value": "蒙老五"
        },
        "thing1": {
          "value": "seiya问题跟踪1"
        },
        "name2": {
          "value": "汤"
        },
        "time4": {
          "value": event.nowtime
        }
      },
      templateId: event.templateId,
      miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
//   let options = {
//     url: 'https://api.weixin.qq.com/cgi-bin/token',
//     qs: {
//       grant_type: 'client_credential',
//       appid: 'wx006b90e928f18e07',
//       secret: 'cc838e1f5018ec2cd55e0dd4acbb2cb1'
//     },
//     json: true,
//     method: 'GET'
//   };
//   let res = await rp(options);
//   let token = res.access_token;
//   console.log(token);
//   let body = {
//     "touser": event.openId,
//     "template_id":event.templateId,
//     "page": "pages/index/index",
//     "data": {
//       "name3": {
//         "value": "蒙老五"
//       },
//       "thing1": {
//         "value": "seiya问题跟踪2"
//       },
//       "name2": {
//         "value": "汤"
//       },
//       "time4": {
//         "value": event.nowtime
//       }
//     }
//   };
//   let options2 = {
//     method:"POST",
//     url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token="+token,
//     body: body,
//     json:true,
//     encodeing:null
//   };
//   var tmp = rp(options2);
//   console.log(tmp);
//   return await tmp;
// }