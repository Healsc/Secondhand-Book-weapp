// pages/myCollect/myCollect.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookList: [],
        count: ''
    },
    getCount() {
        db.collection('sellBook').count().then(res => {
            this.setData({
                count: res.total
            })
        })
    },
    getList() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'getSellBook',
            data: {
                skip: this.data.bookList.length,
                limit: 6
            }
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            this.setData({
                bookList: this.data.bookList.concat(res.result.data)
            })
        })
    },
    showQrcode(e) {

        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList();
        this.getCount();
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
        let that = this;
        that.getList();
        that.getCount();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.count != this.data.bookList.length) {
            this.getList();
        } else {
            wx.showToast({
                title: '到底了',
                icon: 'none',
                duration: 1000
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: 'Secondhand Book',
            path: "/pages/index/index"
        }
    }
})