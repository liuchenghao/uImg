<!-- <template>
  <view>
    <view class="page-body">
      <view class="page-contain">
        ddd
        <image class="location-marker" src="@/static/img/bkg_1.png" @click.stop="onclickLocation">
        </image>
        <cover-image class="location-marker" src="@/static/img/bkg_1.png" @click.stop="onclickLocation">
        </cover-image>
      </view>
      <view class="page-section page-section-gap">
        <map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
        </map>
      </view>
    </view>
  </view>
</template> -->
<template>
  <div class="starting-page">
    <div class="search-bar-wrapper">
      <search-bar ref="searchBar" :curCity="curCity" @chooseCity="chooseCity" @cancel="chooseCancel"></search-bar>
    </div>
    <map class="map-didi" id="map-didi" :latitude="latitude" :longitude="longitude" :markers="markers"
      @regionchange="regionChange" show-location>

      <cover-image class="location-marker" src="/static/img/location.png" @click.stop="onClickLocation">
      </cover-image>

      <cover-view class="center-marker">
        <cover-view class="text-center">最快{{minutes}}分钟接驾</cover-view>
        <cover-image class="inverted-triangle" src="/static/img/triangle-down.png"></cover-image>
        <cover-image class="img-center" src="/static/img/marker2.png"></cover-image>
      </cover-view>

      <cover-view class="address">
        <cover-image class="img-address" src="/static/img/address.png">
        </cover-image>
        <cover-view class="address-desc">
          <cover-view class="blur">{{startPlace}}</cover-view>
          <cover-view class="detail">{{startFormattedPlace}}</cover-view>
        </cover-view>
        <cover-view class="btn-address" @click.stop="setStartPlace">确定</cover-view>
      </cover-view>
    </map>
  </div>
</template>
<script>
  import SearchBar from '@/components/search-bar.vue';
  import {
    mapMutations,
    mapActions,
    mapState
  } from 'vuex';
  export default {
    onShow() {
      //     保证后面可以拿到经纬度
      this.initLocation();
      this.mapCtx = uni.createMapContext("map-didi"); // 地图组件的id
      // this.updateCars()
    },
    components: {
      SearchBar,
    },
    data() {
      return {
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
        }]
      };
    },
    computed: {
      ...mapState("passenger/index", [
        'curNavIndex',
        'curCity',
        'startPlace',
        'startFormattedPlace',
        'startPosition'
      ])
    },
    methods: {
      ...mapActions("passenger/index", {
        saveStartPlace: 'SET_START_PLACE',
        saveFormattedStartPlace: 'SET_FORMATTED_START_PLACE',
        saveCurCity: 'SET_CUR_CITY',
        saveStartPosition: 'SET_START_POSITION'
      }),
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
      chooseCity() {
        uni.navigateTo({
          url: '/pages/passenger/city'
        });
      },
      chooseCancel() {
        uni.navigateBack();
        this.clearData();
      },
      onClickLocation(e) {
        let latitude = this.latitude;
        let longitude = this.longitude;
        console.info(longitude, "=====================", latitude);
        /* this.mapCtx.moveToLocation({
          latitude,
          longitude
        }); */
        this.mapCtx.moveToLocation();
      },
      clearData() {},
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
              /* console.info("mapSearch", mapSearch)
              _this.mapCtx.reverseGeocode({
                latitude,
                longitude
              }, (res) => {
                console.info(res, "===========")
              }); */
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
              /* uni.chooseLocation({
                latitude,
                longitude,
                success: (res) => {
                  // console.info(res, "===__000--=")
                  // console.log('位置名称：' + res.name);
                  // console.log('详细地址：' + res.address);
                  // console.log('纬度：' + res.latitude);
                  // console.log('经度：' + res.longitude);
                  let {
                    name,
                    address,
                    latitude,
                    longitude
                  } = res;
                  _this.saveStartPlace(address);
                  _this.saveFormattedStartPlace(name);
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
              }); */
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
      }

    },
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/mixin1';

  .starting-page {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .search-bar-wrapper {
      width: 100%;
      height: 44px;
      .card-shadow(#e0e0e0)
    }

    /*.address-list-wrapper {*/
    /*position: fixed;*/
    /*top: 45px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*height: 300px;*/
    /*width: 100%;*/
    /*z-index: 999;*/
    /*background-color: #fff;*/
    /*}*/
    .map-didi {
      width: 100%;
      height: calc(100% - 44px);

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
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 20px;
        left: 12px;
        right: 12px;
        height: 60px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #fff;

        .img-address {
          padding-left: 4px;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
        }

        .address-desc {
          margin-left: 5px;
          flex: 1;
          height: 40px;

          .blur {
            font-size: 14px;
            color: #333333;
            .no-wrap();
          }

          .detail {
            padding-top: 6px;
            .no-wrap();
            font-size: 12px;
            color: #c7c7c7;
          }
        }

        .btn-address {
          padding: 20px;
          letter-spacing: 4px;
          flex: 0 0 40px;
          text-align: center;
          font-size: 18px;
          color: #333;
        }
      }
    }
  }
</style>
