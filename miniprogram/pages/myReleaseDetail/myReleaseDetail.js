// pages/myReleaseDetail/myReleaseDetail.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            id: options.id
        })
        db.collection('sellBook').doc(options.id).get().then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            console.log(res)
            this.setData({
                detail: res.data
            })
        })
    },
    isSellto0() {
        wx.cloud.callFunction({
            name: 'updataIsSell',
            data: {
                id: this.data.id,
                isSell: 0
            }
        }).then(res => {
            console.log(res)
            this.getDetail();
        })
    },
    isSellto2() {
        wx.cloud.callFunction({
            name: 'updataIsSell',
            data: {
                id: this.data.id,
                isSell: 2
            }
        }).then(res => {
            console.log(res)
            this.getDetail();
        })
    },
    showQrcode(e) {
        console.log(e.target.dataset.url)
        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url 
        })
    },
    getDetail() {
        wx.showLoading({
            title: '加载中',
        })
        db.collection('sellBook').doc(this.data.id).get().then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            this.setData({
                detail: res.data
            })
        })
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