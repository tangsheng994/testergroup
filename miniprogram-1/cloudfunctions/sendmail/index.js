const cloud = require('wx-server-sdk')
cloud.init()
//引入发送邮件的类库
var nodemailer = require('nodemailer')
// 创建一个SMTP客户端配置
var config = {
  host: 'smtp.126.com', //网易163邮箱 smtp.163.com
  port: 25, //网易邮箱端口 25
  auth: {
    user: 'tangs_gameover@126.com', //邮箱账号
    pass: 'CSNVQMVZUGFOXIAS' //邮箱的授权码
  }
};
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
// 云函数入口函数
exports.main = async (event, context) => {
  var sub = event.formname,
  var todes = event.emialaddr,
  var path = event.fileUrl,
  // 创建一个邮件对象
  var mail = {
    // 发件人
    from: 'tangs_gameover@126.com',
    // 主题
    subject: sub,
    // 收件人
    to: todes,
    // 邮件内容，text或者html格式
    text: sub, //可以是链接，也可以是验证码
    attachments: [{
      filename: sub,
      path: path
    }]
  };

  let res = await transporter.sendMail(mail);
  return res;
}