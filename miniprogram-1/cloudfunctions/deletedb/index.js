// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event) => {
  const db = cloud.database()
  let data = await db.collection(event.table).doc(event.id)
    .remove()
  console.log(data)
  return data;
}