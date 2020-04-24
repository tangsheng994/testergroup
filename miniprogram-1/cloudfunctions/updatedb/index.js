// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  var table = event.table
  if (table == 'flexible') {
    let sCdata =await db.collection('flexible')
      .where({
        _id:event._id
      })
      .field({
        data:true
      })
      .get()
    console.log(sCdata.data[0].data)
    var vdata = sCdata.data[0].data
    vdata.push(event.data) //event.data
    console.log(vdata)
    try {
      return await db.collection(table).doc(event._id).update({
        data: {
          data:vdata
        }
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    var docid = event.docid
    var vdata = event.data
    try {
      return await db.collection(table).doc(docid).update({
        data: vdata
      })
    } catch (e) {
      console.log(e)
    }
  }
}