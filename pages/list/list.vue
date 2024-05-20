<template>
  <div class="starting-page">
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="list" :current="current" :mode="mode"
        :dots-styles="dotsStyles" field="content">
        <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
          <swiper-item v-for="(item, index) in list" :key="index">
            <view class="swiper-item" :class="'swiper-item' + index">
              {{item.absolutePath}}
              <image :src="item.thumbnail.absolutePath" mode="aspectFit"></image>
            </view>
          </swiper-item>
        </swiper>
      </uni-swiper-dot>
  </div>
</template>
<script>
  // import info from '@/components/order/info';
  import {
    mapMutations,
    mapActions,
    mapState
  } from 'vuex';
  export default {
    onShow() {
      // //     保证后面可以拿到经纬度
      // this.initLocation();
      // this.mapCtx = uni.createMapContext("map-didi"); // 地图组件的id
    },
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
    /* computed: {
      ...mapState("passenger/index", [
        'curNavIndex',
        'curCity',
        'startPlace',
        'startFormattedPlace',
        'startPosition'
      ])
    }, */
    async onLoad(options) {
      this.getList(options.id);
    },
    methods: {
      ...mapActions("list/index", {
        getPhotoList:'GET_PHOTO_LIST',
        getTimeList: 'GET_TIME_LIST',
        getInfoList: 'GET_INFO_LIST',
      }),
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
        console.log(22222, index);
      },
      click() {
        let url = "/pages/list/list";
        uni.navigateTo({
          url
        });
      },
      getList(id){
        let params = {
           pgId: id
        };
        this.getInfoList({
          params
        }).then((res)=>{
          let {
            success,
            data
          } = res;
          if(success){
            this.list = data;
          }
        });
      },
      
      /* ...mapActions("passenger/index", {
        saveStartPlace: 'SET_START_PLACE',
        saveFormattedStartPlace: 'SET_FORMATTED_START_PLACE',
        saveCurCity: 'SET_CUR_CITY',
        saveStartPosition: 'SET_START_POSITION'
      }),
      touchStart(e) {
        let {
          touches
        } = e;
        let clientX = touches[0].clientX;
        this.startX = clientX;
      },
      touchMove(e) {
        let {
          touches
        } = e;
        let clientX = touches[0].clientX;
        this.endX = clientX;
      },
      touchEnd(e) {
        if (this.startX - this.endX <= 0) {
          this.isShowInfo = true;
        } else {
          this.isShowInfo = false;
        }
        console.info(this.startX - this.endX);
      },
      initLocation() {
        console.info("=+=+====+============", this.startPosition);
        if (this.startPosition.length) {
          this.latitude = this.startPosition[0];
          this.longitude = this.startPosition[1];
        } else {
          uni.getLocation({
            type: "gcj02",
            success: (res) => {
              this.longitude = res.longitude;
              this.latitude = res.latitude;
            },
            fail: (e) => {}
          });
        }
      },
      onClickLocation(e) {
        let latitude = this.latitude;
        let longitude = this.longitude;
        this.mapCtx.moveToLocation();
      },
      setStartPlace() {
        //这里只需要再保存位置就好了
        this.saveStartPosition([this.latitude, this.longitude]);
        uni.redirectTo({
          url: "/pages/index",
        });
      },
      getRandomNum() {
        return parseInt(Math.random() * 20);
      },
      regionChange(data) {
        // console.log('regionChange', e)
        let {
          type
        } = data;
        if (type == "end") {
          let _this = this;
          this.mapCtx.getCenterLocation({
            success: (res) => {
              let {
                latitude,
                longitude,
              } = res;
              this.$map.reverseGeocoder({
                location: {
                  latitude,
                  longitude
                },
                success: (res) => {
                  _this.saveStartPlace(res.result.address);
                  _this.saveFormattedStartPlace(res.result.formatted_addresses.recommend);
                },
              });
              const lon_distance = longitude - _this.longitude;
              const lat_distance = latitude - _this.latitude;
              // 更新当前位置坐标
              _this.longitude = longitude;
              _this.latitude = latitude;
              //判断屏幕移动的距离，如果超过阀值
              if (Math.abs(lon_distance) >= 0.0022 || Math.abs(lat_distance) >= 0.0022) {
                //刷新附近的车
                _this.updateCars();
                //刷新等待时间
                _this.minutes = _this.getRandomNum(3, 12);
              }

            }
          });
        }
      },

      updateCars() {
        this.markers = [];
        const carNum = this.getRandomNum(3, 8);
        for (let i = 1; i <= carNum; i++) {
          // 定义一个车对象
          let car = {
            id: 0,
            iconPath: "/static/img/car/cart1.png",
            latitude: 0,
            longitude: 0,
            width: 35,
            height: 15
          };

          //随机值
          const lon_dis = (Math.ceil(Math.random() * 99)) * 0.00012;
          const lat_dis = (Math.ceil(Math.random() * 99)) * 0.00012;

          car.id = 2 + i;
          car.latitude = this.latitude + lat_dis;
          car.longitude = this.longitude + lon_dis;
          car.iconPath = `/static/img/car/cart${this.curNavIndex + 1}.png`;
          this.markers.push(car);
        }
      } */

    },
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/mixin1';

  .starting-page {
    width: 100%;
    height: 100vh;
    overflow: auto;

    .search-bar-wrapper {
      width: 100%;
      height: 40px;
      .card-shadow(#e0e0e0)
    }

    .map-didi {
      width: 100%;
      // height: calc(100% - 44px);
      height: 100%;

      .location-marker {
        position: fixed;
        left: 12px;
        bottom: 95px;
        width: 32px;
        height: 32px;
      }

      .center-marker {
        position: fixed;
        left: 50%;
        top: calc(50% - 47px);
        transform: translateX(-50%);
        width: 110px;
        height: 70px;
        text-align: center;

        .text-center {
          padding: 0 4px;
          position: relative;
          height: 25px;
          line-height: 25px;
          color: #f5f5f5;
          background-color: #616161;
          font-size: 12px;
          border-radius: 12px;
          box-sizing: border-box;
        }

        .inverted-triangle {
          position: absolute;
          left: 45px;
          top: 16px;
          width: 20px;
          height: 20px;
        }

        .img-center {
          display: inline-block;
          margin-top: 8px;
          width: 38px;
          height: 40px;
        }
      }

      .address {
        // display: flex;
        // align-items: center;
        // flex-direction: column;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 43px;
        // line-height: 43px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #fff;

        &.large {
          height: auto;
        }

        .uma-order-info {
          padding-left: 12px;
          height: 43px;
          line-height: 43px;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .starting-page{
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
		background-color: #cee1fd;
	}

	.swiper-item1 {
		background-color: #b2cef7;
	}

	.swiper-item2 {
		background-color: #cee1fd;
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

