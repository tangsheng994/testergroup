// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async(event) => {
  const db = cloud.database()
  const $ = db.command.aggregate
  let data = await db.collection('organization').aggregate()
    .lookup({
      from: "testers",
      localField: "groupleader",
      foreignField: "supervisor",
      as: "membersList"
    })
    .end();
  console.log(data)
  return data;
}