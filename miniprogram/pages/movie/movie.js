// pages/addFunction/addFunction.js


Page({

  data: {
    movieList: []
  },
  gotoComment: function(event) {
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`
    })
    
  },
  getMovieList: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'movielist',
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      console.log(res)
      this.setData({
        movieList: this.data.movieList.concat((JSON.parse(res.result).subjects))
      })
      wx.hideLoading();

    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  onLoad: function (options) {
    this.getMovieList();
  }, 
  onReachBottom: function() {
    this.getMovieList();
  }
})

