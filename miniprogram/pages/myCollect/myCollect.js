// pages/myCollect/myCollect.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid: "",
        collectList: []
    },
    getOpneid() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            this.setData({
                openid: res.result.openid
            })
            console.log(res.result.openid)
            wx.cloud.callFunction({
                name: 'getMyCollect',
                data: {
                    openid: res.result.openid
                }
            }).then(res => {
                this.setData({
                    collectList: res.result
                })
                console.log(res)
            })
        })
    },
    showQrcode(e) {

        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url
        })
    },

    /*  getMyCollect() {
         wx.cloud.callFunction({
             name: 'getMyCollect',
             data: {
                 openid: this.data.openid
             }
         }).then(res => {
             this.setData({
                 collectList: res.result.data
             })
         })
     }, */
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpneid();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})