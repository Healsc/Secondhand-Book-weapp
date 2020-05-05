const app = getApp();

Page({
    data: {
        imgList: [],
        fileIds: []
    },


    formSubmit(e) {
        console.log(e)
        this.setData({
            wumeiInfo: e.detail.value,
        })
        if (e.detail.value.bookName == "" || e.detail.value.press == "" ||
            e.detail.value.author == "" || e.detail.value.price == "" ||
            e.detail.value.tel == "" || e.detail.value.postName == "" || this.data.imgList.length == 0) {
            wx.showModal({
                title: '',
                content: '信息不完整',
                cancelText: '退出',
                confirmText: '继续',
                success: res => {}
            })
        } else {
            wx.showModal({
                title: '',
                content: '确定发布',
                cancelText: '否',
                confirmText: '是',
                success: res => {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '发布中',
                        })
                        const promiseArr = [];
                        for (let i = 0; i < this.data.imgList.length; i++) {
                            promiseArr.push(new Promise((resolve, reject) => {
                                let item = this.data.imgList[i];
                                let suffix = /\.[^\.]+$/.exec(this.data.imgList[i])[0];
                                // 上传图片
                                wx.cloud.uploadFile({

                                    cloudPath: 'sellBook/' + e.detail.value.postName + " " + e.detail.value.bookName + Math.floor(Math.random() * 100) + suffix, // 上传至云端的路径
                                    filePath: item, // 小程序临时文件路径
                                    success: res => {
                                        // 返回文件 ID
                                        this.setData({
                                            fileIds: this.data.fileIds.concat(res.fileID)
                                        });

                                        resolve();
                                    },
                                    fail: err => {
                                        console.error
                                        reject();
                                    }
                                })
                            }));

                        }

                        // 插入到云数据库
                        Promise.all(promiseArr).then(res => {
                            const db = wx.cloud.database({
                                //env: 'wumei-2070bb'/* 当前环境ID */
                            })
                            db.collection('sellBook').add({
                                data: {
                                    _id: e.detail.value.postName +"的"+ e.detail.value.bookName + Math.floor(Math.random() * 1000000),
                                    _fileIds: this.data.fileIds,
                                    _bookName: e.detail.value.bookName,
                                    _press: e.detail.value.press,
                                    _author: e.detail.value.author,
                                    _price: e.detail.value.price,
                                    _tel: e.detail.value.tel,
                                    _postName: e.detail.value.postName,
                                    _notes: e.detail.value.notes,
                                    _time: this.getDate(),
                                    _createTime: new Date(),
                                    _isSell: 1,
                                    _isShow: 1
                                }
                            }).then(res => {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '发布成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                            }).catch(err => {
                                wx.showToast({
                                    title: '发布失败',
                                    icon: 'none',
                                    duration: 3000
                                })
                            })
                        })

                    }
                }

            })
        }

    },


    //上传图片
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    ChooseImage() {
        wx.chooseImage({
            count: 6, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    DelImg(e) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList
        })
    },

    onLoad: function (options) {

    },
    //获取系统时间
    getDate() {
        var date = new Date();
        //年
        var Y = date.getFullYear();
        //月
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //日
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        //时
        var h = date.getHours();
        //分
        var m = date.getMinutes();
        //秒
        var s = date.getSeconds();
        return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
        //console.log("当前时间：" + Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
    }
})