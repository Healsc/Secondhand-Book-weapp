// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    var $ = db.command.aggregate
    return await db.collection('collect').aggregate()
        .lookup({
            from: "sellBook",
            localField: "_bookId",
            foreignField: "_id",
            as: "bookList"
        })
        .replaceRoot({
            newRoot: $.mergeObjects([$.arrayElemAt(['$bookList', 0]), '$$ROOT'])
        })
        .project({
            bookList: 0
        })
        .end().then(res => {
            let arr = [];
          /*   console.log('hello oqyC_4s8d1ozPqaVtSNMGDmsfhgo')
            console.log(event.openid) */
            for (let i = 0; i < res.list.length; i++) {
                if (res.list[i]._openid == event.openid) {
                    arr.push(res.list[i])
                    console.log(res.list[i])
                    console.log(1222312)
                }
            }
          /*   console.log(arr);
            console.log(res.list); */
            return arr;

        })


    /*  return await db.collection('collect').orderBy('_createTime', 'desc').where({
         _openid: event.openid
     }).skip(event.skip).limit(event.limit).get() */

}