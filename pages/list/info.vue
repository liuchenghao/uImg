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
        list: []
      };
    },
    async onLoad() {
      this.getList();
    },
    methods: {
      ...mapActions("list/index", {
        getPhotoList: 'GET_PHOTO_LIST',
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
      getList() {
        let params = {
          tId: "tId202405180002"
        };
        this.getTimeList({
          params
        }).then((res) => {
          let {
            success,
            data
          } = res;
          if (success) {
            let {
              photoGroupVOList
            } = data;
            let list = photoGroupVOList.map((item) => {
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
    },
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/mixin1';

  .starting-page {
    width: 100%;
    height: 100vh;
    overflow: auto;
    .title{
      text-align: left;
      font-size: 18px;
      font-weight: bold;
      color: grey;
    }
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
