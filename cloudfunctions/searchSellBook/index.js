// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const _ = db.command;
    console.log( event.bookName)
    return await db.collection('sellBook').where(_.or([{
            _bookName: db.RegExp({
                regexp: event.bookName,
                option: 'i'
            })
        },
        {
            _press: db.RegExp({
                regexp:  event.bookName,
                option: 'i'
            })
        },
        {
            _author: db.RegExp({
                regexp:  event.bookName,
                option: 'i'
            })
        }
    ])).get({
        success: function (res) {
            console.log(res)
            _this.list = res.data
        }
    })
}