const app = getApp()
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        list: [{
                name: '通用'
            }, {
                name: '农学'
            }, {
                name: '园艺'
            }, {
                name: '资环'
            }, {
                name: '动科'
            }, {
                name: '动医'
            }, {
                name: '工程'
            }, {
                name: '经管'
            }, {
                name: '生命'
            }, {
                name: '食品'
            }, {
                name: '管法'
            }, {
                name: '水利'
            }, {
                name: '国际'
            }, {
                name: '艺术'
            }, {
                name: '电信'
            }, {
                name: '文理'
            }, {
                name: '其他'
            }

        ],
        load: true,
        tongyongList: [],
        nongxueList: [],
        yuanyiList: [],
        zihuanList: [],
        dongkeList: [],
        dongyiList: [],
        gongchengList: [],
        jingguanList: [],
        shengmingList: [],
        shipinList: [],
        guanfaList: [],
        shuiliList: [],
        guojiList: [],
        yishuList: [],
        dianxinList: [],
        wenliList: [],
        qitaList: [],
        searchInfo: ''
    },

    goSearchInfo(){
        wx.navigateTo({
          url: '/pages/search/search',
        })
    },
    onLoad() {
        setTimeout(() => {
            wx.stopPullDownRefresh({
                complete: (res) => {},
            })
            wx.hideLoading({
                complete: (res) => {},
            })
        }, 1500)
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        let list = this.data.list;
        for (let i = 0; i < 17; i++) {
            list[i].id = i;
        }
        this.setData({
            list: list,
            listCur: list[0]
        })

        this.getTongyingList();
        this.getNongxueList();
        this.getZihuanList();
        this.getYuanyiList();
        this.getDongkeList();
        this.getDongyiList();
        this.getGongchengList();
        this.getJingguanList();
        this.getShengmingList();
        this.getShipinList();
        this.getGuanfaList();
        this.getShuiliList();
        this.getGuojiList();

        this.getYishuList();
        this.getDianxinList();
        this.getWenliList();
        this.getQitaList();
    },
    onReady() {
        wx.hideLoading()
    },
    getTongyingList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "通用"
            }
        }).then(res => {
            this.setData({
                tongyongList: res.result.data
            })
        })
    },
    getNongxueList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "农学"
            }
        }).then(res => {
            this.setData({
                nongxueList: res.result.data
            })
        })
    },

    getZihuanList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "资环"
            }
        }).then(res => {
            this.setData({
                zihuanList: res.result.data
            })
        })
    },
    getYuanyiList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "园艺"
            }
        }).then(res => {
            this.setData({
                yuanyiList: res.result.data
            })
        })
    },
    getDongkeList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "动科"
            }
        }).then(res => {
            this.setData({
                dongkeList: res.result.data
            })
        })
    },
    getDongyiList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "动医"
            }
        }).then(res => {
            this.setData({
                dongyiList: res.result.data
            })
        })
    },
    getGongchengList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "工程"
            }
        }).then(res => {
            this.setData({
                gongchengList: res.result.data
            })
        })
    },
    getJingguanList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "经管"
            }
        }).then(res => {
            this.setData({
                jingguanList: res.result.data
            })
        })
    },
    getShengmingList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "生命"
            }
        }).then(res => {
            this.setData({
                shengmingList: res.result.data
            })
        })
    },
    getShipinList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "食品"
            }
        }).then(res => {
            this.setData({
                shipinList: res.result.data
            })
        })
    },
    getGuanfaList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "管法"
            }
        }).then(res => {
            this.setData({
                guanfaList: res.result.data
            })
        })
    },
    getShuiliList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "水利"
            }
        }).then(res => {
            this.setData({
                shuiliList: res.result.data
            })
        })
    },
    getGuojiList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "国际"
            }
        }).then(res => {
            this.setData({
                guojiList: res.result.data
            })
        })
    },
    getYishuList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "艺术"
            }
        }).then(res => {
            this.setData({
                yishuList: res.result.data
            })
        })
    },
    getDianxinList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "电信"
            }
        }).then(res => {
            this.setData({
                dianxinList: res.result.data
            })
        })
    },
    getWenliList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "文理"
            }
        }).then(res => {
            this.setData({
                wenliList: res.result.data
            })
        })
    },
    getQitaList() {
        wx.cloud.callFunction({
            name: 'getSellBookByCategory',
            data: {
                category: "其他"
            }
        }).then(res => {
            this.setData({
                qitaList: res.result.data
            })
        })
    },
    showQrcode(e) {
        wx.previewImage({
            urls: [e.target.dataset.url],
            current: e.target.dataset.url
        })
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            MainCur: e.currentTarget.dataset.id,
            VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
    },
    VerticalMain(e) {
        let that = this;
        let list = this.data.list;
        let tabHeight = 0;
        if (this.data.load) {
            for (let i = 0; i < list.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                view.fields({
                    size: true
                }, data => {
                    list[i].top = tabHeight;
                    tabHeight = tabHeight + data.height;
                    list[i].bottom = tabHeight;
                }).exec();
            }
            that.setData({
                load: false,
                list: list
            })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < list.length; i++) {
            if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                that.setData({
                    VerticalNavTop: (list[i].id - 1) * 50,
                    TabCur: list[i].id
                })
                return false
            }
        }
    },
    onPullDownRefresh: function () {
        let that = this;
        this.onLoad();
    },
    onShareAppMessage: function () {
        return {
            title: 'Secondhand Book',
            path: "/pages/index/index"
        }
    }
})