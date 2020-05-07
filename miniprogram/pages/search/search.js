// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchInfo: '',
        searchList: [],
        showToast: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    getSearchInfo(e) {
        this.setData({
            searchInfo: e.detail.value
        })
    },
    searchInfo() {
        wx.showLoading({
            title: '搜索中',
        })
        console.log(this.data.searchInfo)
        wx.cloud.callFunction({
            name: 'searchSellBook',
            data: {
                bookName: this.data.searchInfo
            }
        }).then(res => {
            wx.hideLoading({
                complete: (res) => {},
            })
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            if (res.result.data.length) {
                this.setData({
                    searchList: res.result.data
                })
            } else {
                this.setData({
                    showToast: true
                })

            }
        })
    },
    showQrcode(e) {
        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url
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