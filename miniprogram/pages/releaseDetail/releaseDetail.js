// pages/myReleaseDetail/myReleaseDetail.js
const db = wx.cloud.database();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        detail: {},
        openid: '',
        isShowCollect: false,
        isMycollect: false,
        collectId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid();
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            id: options.id
        })

    },
    getOpenid() {
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            this.setData({
                openid: res.result.openid
            })
            this.getDetail();
            this.getCollect();
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
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            console.log(res.data._openid == this.data.openid)
            console.log(this.data.openid)
            if (res.data._openid == this.data.openid) {
                this.setData({
                    isMycollect: true
                })
            }
            this.setData({
                detail: res.data
            })
        })
    },

    copy(e) {
        wx.setClipboardData({
            data: e.target.dataset.tel
        })
    },
    goCollect() {
        db.collection('collect').add({
            data: {
                _bookId: this.data.id,
                _createTime: new Date()
            }
        }).then(res => {
            this.getCollect();
        })
    },
    failCollect() {
        db.collection('collect').doc(this.data.collectId).remove().then(res => {

            this.getCollect();
        })
    },
    getCollect() {
        db.collection('collect').where({
            _openid: this.data.openid,
            _bookId: this.data.id
        }).get().then(res => {

            if (res.data.length) {
                this.setData({
                    collectId: res.data[0]._id,
                    isShowCollect: true
                })
            } else {
                this.setData({
                    isShowCollect: false
                })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this;
        that.getDetail();
        that.getCollect();
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
        return {
            title: 'Secondhand Book',
            path: "/pages/releaseDetail/releaseDetail?id=" + this.data.id
        }
    }
})