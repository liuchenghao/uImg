<template>
  <div class="starting-page">
    <uni-steps :options="list" active-color="#007AFF" :active="active" direction="column">
      <template v-slot:default="item">
      	<view class="item">
          <view class="title">{{item.title}}</view>
          <image @click="clickItem(item)" :src="item.image" mode="aspectFit"></image>
      	</view>
      </template>
    </uni-steps>
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
        list: []
        /* list: [{
          title: '买家下单',
          desc: '2018-11-11'
        }, {
          title: '卖家发货',
          desc: '2018-11-12'
        }, {
          title: '买家签收',
          desc: '2018-11-13'
        }, {
          title: '交易完成',
          desc: '2018-11-14'
        }], */
        /* orderNum: 88798822004820112,
        isShowInfo: false,
        latitude: 39.909,
        longitude: 116.39742,
        scale: 16,
        markers: [],
        minutes: this.getRandomNum(),
        covers: [{
          latitude: 39.909,
          longitude: 116.39742,
          // iconPath: '../../../static/location.png'
        }, {
          latitude: 39.90,
          longitude: 116.39,
          // iconPath: '../../../static/location.png'
        }],
        startX: 0,
        endX: 0 */
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
    async onLoad() {
      this.getList();
    },
    methods: {
      ...mapActions("list/index", {
        getPhotoList:'GET_PHOTO_LIST',
        getTimeList: 'GET_TIME_LIST',
        getInfoList: 'GET_INFO_LIST',
      }),
      clickItem(item) {
        let {
          id
        } = item;
        let url = "/pages/list/list?id=" + id;
        uni.navigateTo({
          url
        });
      },
      getList(){
        let params = {
           tId: "tId202405180002"
        };
        this.getTimeList({
          params
        }).then((res)=>{
          let {
            success,
            data
          } = res;
          if(success){
            let {
              photoGroupVOList
            } = data;
            let list = photoGroupVOList.map((item)=>{
              let {
                pgId: id,
                title,
                coverImage,
                name: desc
              } = item;
              let {
                absolutePath: image,
                width: w,
                height: h
              } = coverImage;
              return {
                id,
                image,
                w,
                h,
                title,
                desc
              };
            });
            this.list = list;
            this.active = list.length;
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
