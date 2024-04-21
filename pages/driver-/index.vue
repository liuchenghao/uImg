<template>
  <view class="page-container">
    <view class="page-container-bodyer">
      <view class="block1">
        <swiper class="swiper-bodyer" :disable-touch="true" :current="curNavIndex">
          <swiper-item class="swiper-item" catchtouchmove="true">
            <order></order>
          </swiper-item>
          <swiper-item class="swiper-item" catchtouchmove="true">
            <list :state="4"></list>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @buttonClick="buttonClick" />
    </view>
    <uni-drawer :visible.sync="isShowUser">
      <uma-my></uma-my>
    </uni-drawer>
  </view>
</template>

<script type="text/ecmascript-6">
  import LoadingSprinner from '@/components/loading-sprinner.vue';
  import umaMy from '@/components/sysm/uma-my.vue';
  import order from '@/components/order/order.vue';
  import list from '@/components/order/list.vue';
  export default {
    components: {
      LoadingSprinner,
      umaMy,
      order,
      list
    },
    data() {
      return {
        isLoading: true,
        isShowUser: false,
        buttonGroup: [{
            text: '订单',
            backgroundColor: '#ffa200',
            color: '#fff'
          },
          {
            text: '抢单',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '我',
            backgroundColor: '#ff0000',
            color: '#fff'
          }
        ],
        options: [],
        curNavIndex: 0
      };
    },
    created() {
      
    },
    methods: {
      switchNav(index) {
        // this.saveCurNavIndex(index);
        console.info(this.curNavIndex, index);
      },
      switchTab(e) {
        console.info("=======11====++++==========", e.mp.detail);
        // this.saveCurNavIndex(e.mp.detail.current);
        // this.resetInitAddress();
      },
      buttonClick(params) {
        let {
          index,
          content
        } = params;
        let buttonGroup = this.buttonGroup;
        for (let i = 0; i < buttonGroup.length; i++) {
          let item = buttonGroup[i];
          item.color = "#ffffff";
          item.backgroundColor = "#ff0000";
        }
        content.backgroundColor = "#ffa200";
        content.color = "#fff";
        if (index == 2) {
          this.isShowUser = true;
        } else {
          // this.saveCurNavIndex(index);
          this.curNavIndex = index;
        }
      },
      
    },
    watch: {
      //利用watch 更好的模拟navScrollLeft
      curNavIndex(newIndex) {
        // this.navScrollLeft = this.navOffsetArr[newIndex];
        // this.car = this.navData[newIndex].name;
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
  }
</style>
