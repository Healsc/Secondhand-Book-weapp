// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: '',
        isShowUserBtn: true,
        isShowUserInfo: false,
        urlBG: ''

    },

    getBGUrl() {

        const db = wx.cloud.database();
        db.collection('prodileBG').doc('profileBG').get().then(res => {
            this.setData({
                urlBG: res.data
            })
            console.log(res)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSetting();
        this.getBGUrl();
    },
    openSetting() {
        wx.openSetting({
            success(res) {
                //console.log(res.authSetting)
            },
            complete: (res) => {
                this.getSetting();
            },
        })
    },
    bindGetUserInfo(e) {
        if (e.detail.userInfo) {
            this.setData({
                userInfo: e.detail.userInfo,
                isShowUserBtn: false,
                isShowUserInfo: true
            })
        }
    },
    getSetting() {
        const that = this;
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            that.setData({
                                userInfo: res.userInfo,
                                isShowUserBtn: false,
                                isShowUserInfo: true
                            })
                            // console.log(res.userInfo)
                        }
                    })
                } else {
                    that.setData({
                        isShowUserBtn: true,
                        isShowUserInfo: false
                    })
                }
            }
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
        return {
            title: 'Secondhand Book',
            path: "/pages/index/index"
        }
    }
})