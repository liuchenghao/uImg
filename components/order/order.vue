<template>
  <view class="page-container">
    <view class="page-container-header">
      <view class="nav-wrapper">
        <scroll-view class="nav" scroll-x="true" scroll-with-animation="true">
          <view v-for="(item,index) in navData" :key="item.id" class="nav-item" :class="{active:index==curNavIndex}"
            @click.stop="switchNav(item.id)">
            {{item.name}}
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="page-container-bodyer">
      <view class="block1">
        <swiper class="swiper-bodyer" :disable-touch="true" :current="curNavIndex" @change="switchTab">
          <swiper-item class="swiper-item" catchtouchmove="true">
            <list :state="curNavIndex"></list>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <list :state="curNavIndex"></list>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <list :state="curNavIndex"></list>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <list :state="curNavIndex"></list>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
  import list from './list.vue';
  export default {
    components: {
      list
    },
    props: {
      current: {
        type: Number,
        default: 0
      },
    },
    mounted(){
      this.curNavIndex = this.current;
    },
    data() {
      return {
        navData: [{
            "id": "0",
            "name": "待服务",
            "url": "/static/img/car/cart1.png"
          },
          {
            "id": "1",
            "name": "已完成",
            "url": "/static/img/car/cart2.png"
          },
          {
            "id": "2",
            "name": "未完成",
            "url": "/static/img/car/cart3.png"
          },
          {
            "id": "3",
            "name": "已取消",
            "url": "/static/img/car/cart3.png"
          }
        ],
        curNavIndex: 0,
      };
    },
    created() {},
    methods: {
      switchNav(index) {
        this.curNavIndex = +index;
      },
      switchTab() {

      }
    },
    watch: {
      current(index) {
        this.curNavIndex = +index;
      }
    }
  };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "@/common/scss/variable";

  .page-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background-color: $page-bg-color;
    height: 100%;
    display: flex;
    flex-direction: column;

    .page-container-header {
      height: 54px;
    }

    .page-container-bodyer {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;

      .block1 {
        flex: 1;

        .swiper-bodyer {
          height: 100%;
        }
      }
    }

    .nav-wrapper {
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 54px;
      width: 100%;
      background: #ffffff;

      .nav {
        flex: 1;
        margin: 0 25px;
        height: 54px;
        line-height: 54px;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0;

        .nav-item {
          margin: 0 10px;
          display: inline-block;
          font-size: 16px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }

          &.active {
            color: #fc975c;
          }
        }
      }
    }
  }
</style>
