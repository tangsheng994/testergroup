// 云函数入口文件
const cloud = require('wx-server-sdk')
const nodeExcel = require('excel-export');
const fs = require('fs')
const path = require('path')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  let sCdata = await db.collection('flexible')
    .where({
      _id: event._id
    })
    .field({
      data: true
    })
    .get()
  var vdata = sCdata.data[0].data
  var tableHead = [];
  const tableList = []
  for (var key in sCdata.data[0].data[0]) {
    tableHead.push(key);
  }
  for (var i = 0; i < vdata.length; i++) {
    tableList[i] = vdata[i]
  }
  console.log(tableList)
  let conf = {
    stylesXmlFile: path.resolve(__dirname, 'styles.xml'),
    name: 'sheet',
    cols: tableHead.map(param => {
      return { caption: param, type: 'string' }
    }),
    rows: jsonToArray(tableList)
  }
  let result = nodeExcel.execute(conf) // result为excel二进制数据流
  // 上传到云存储
  return await cloud.uploadFile({
    cloudPath: `download/` + event.filename+`.xlsx`,  // excel文件名称及路径，即云存储中的路径
    fileContent: Buffer.from(result.toString(), 'binary'),
  })

  // json对象转换成数组填充
  function jsonToArray(arrData) {
    let arr = new Array()
    arrData.forEach(item => {
      let itemArray = new Array()
      for (let key in item) {
        if (key === '_id' || key === '_openid' || key === 'id') { continue }
        itemArray.push(item[key])
      }
      arr.push(itemArray)
    })
    return arr
  }
}