<template>
  <div class="starting-page">
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="list" :current="current" :mode="mode"
      :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in list" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <view class="title">{{item.period}} {{item.desc}}</view>
            <image @click="previewImage(item)" :src="item.thumbnail.absolutePath" mode="aspectFit"></image>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </div>
</template>
<script>
  import {
    mapMutations,
    mapActions,
    mapState
  } from 'vuex';
  export default {
    onShow() {},
    data() {
      return {
        active: 10,
        list: [],
        info: [{
            colorClass: 'uni-bg-red',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 A'
          },
          {
            colorClass: 'uni-bg-green',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 B'
          },
          {
            colorClass: 'uni-bg-blue',
            url: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
            content: '内容 C'
          }
        ],
        dotStyle: [{
            backgroundColor: 'rgba(0, 0, 0, .3)',
            border: '1px rgba(0, 0, 0, .3) solid',
            color: '#fff',
            selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
            selectedBorder: '1px rgba(0, 0, 0, .9) solid'
          },
          {
            backgroundColor: 'rgba(255, 90, 95,0.3)',
            border: '1px rgba(255, 90, 95,0.3) solid',
            color: '#fff',
            selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
            selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
          },
          {
            backgroundColor: 'rgba(83, 200, 249,0.3)',
            border: '1px rgba(83, 200, 249,0.3) solid',
            color: '#fff',
            selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
            selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
          }
        ],
        modeIndex: -1,
        styleIndex: -1,
        current: 0,
        mode: 'default',
        dotsStyles: {},
        swiperDotIndex: 0
      };
    },
    async onLoad(options) {
      this.getList(options.id);
    },
    methods: {
      ...mapActions("list/index", {
        getPhotoList: 'GET_PHOTO_LIST',
        getTimeList: 'GET_TIME_LIST',
        getInfoList: 'GET_INFO_LIST',
      }),
      previewImage(item) {
        let {
          oriImage: {
            absolutePath
          }
        } = item;
        let urls = [absolutePath];
        uni.previewImage({
          urls,
          /* longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
            success: function(data) {
              console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
            },
            fail: function(err) {
              console.log(err.errMsg);
            }
          } */
        });
      },
      change(e) {
        this.current = e.detail.current;
      },
      selectStyle(index) {
        this.dotsStyles = this.dotStyle[index];
        this.styleIndex = index;
      },
      selectMode(mode, index) {
        this.mode = mode;
        this.modeIndex = index;
        this.styleIndex = -1;
        this.dotsStyles = this.dotStyle[0];
      },
      clickItem(e) {
        this.swiperDotIndex = e;
      },
      onBanner(index) {
      },
      click() {
        let url = "/pages/list/list";
        uni.navigateTo({
          url
        });
      },
      getList(id) {
        let params = {
          pgId: id
        };
        this.getInfoList({
          params
        }).then((res) => {
          let {
            success,
            data
          } = res;
          if (success) {
            this.list = data;
          }
        });
      },
    },
  };
</script>
<style scoped lang="scss">
  uni-image{
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .title{
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    color: grey;
  }
  .starting-page {
    height: 100%;
  }

  .swiper-box {
    height: 100vh;
  }

  .swiper-item {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #fff;
  }

  .swiper-item0 {
    // background-color: #cee1fd;
  }

  .swiper-item1 {
    // background-color: #b2cef7;
  }

  .swiper-item2 {
    // background-color: #cee1fd;
  }

  .image {
    width: 750rpx;
  }

  /* #ifndef APP-NVUE */
  ::v-deep .image img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  /* #endif */

  @media screen and (min-width: 500px) {
    .uni-swiper-dot-box {
      width: 400px;
      margin: 0 auto;
      margin-top: 8px;
    }

    .image {
      width: 100%;
    }
  }

  .uni-bg-red {
    background-color: #ff5a5f;
  }

  .uni-bg-green {
    background-color: #09bb07;
  }

  .uni-bg-blue {
    background-color: #007aff;
  }

  .example-body {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    padding: 20rpx;
  }

  .example-body-item {

    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 15rpx;
    padding: 15rpx;
    height: 60rpx;
    /* #ifndef APP-NVUE */
    display: flex;
    padding: 0 15rpx;
    /* #endif */
    flex: 1;
    border-color: #e5e5e5;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
  }

  .example-body-item-text {
    font-size: 28rpx;
    color: #333;
  }

  .example-body-dots {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50px;
    background-color: #333333;
    margin-left: 10rpx;
  }

  .active {
    border-style: solid;
    border-color: #007aff;
    border-width: 1px;
  }
</style>
