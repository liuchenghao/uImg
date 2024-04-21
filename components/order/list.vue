<template>
  <view class="uma-page">
    <scroll-view class="uma-scroll" scroll-y="true" scroll-with-animation="true" @scrolltolower="scrollList">
      <uni-list>
        <uni-list-item :border="false" v-for="(item, index) in items" :key="index">
          <uni-card slot="body" :title="getTypeText(item)" :extra="'¥'+item.orderCost" isFull isShadow>
            <uni-list :border="false">
              <uni-list-item :title="item.orderTime" :extra-icon="{color:'#0800de' ,type: 'paperclip'}" show-extra-icon>
              </uni-list-item>
              <uni-list-item :title="item.orderStar" :extra-icon="{color:'#3cbca3' ,type: 'location-filled'}"
                show-extra-icon>
              </uni-list-item>
              <uni-list-item :title="item.orderDist" :extra-icon="{color:'#fc9153' ,type: 'location-filled'}"
                show-extra-icon>
              </uni-list-item>
              <uni-list-item>
                <view slot="body" class="uma-order-info">
                  <button v-if="state==0" class="mini-btn" type="primary" size="mini" disabled>待服务</button>
                  <button v-if="state==1" class="mini-btn" type="default" size="mini" disabled>已完成</button>
                  <button v-if="state==2" class="mini-btn" type="default" size="mini" disabled>未完成</button>
                  <button v-if="state==3" class="mini-btn" type="default" size="mini" disabled>已取消</button>
                  <button v-if="state==4" class="mini-btn" type="primary" size="mini">抢</button>
                  <button class="mini-btn" type="warn" size="mini" @click="goNextPage">查看详情</button>
                </view>
              </uni-list-item>
            </uni-list>
          </uni-card>
        </uni-list-item>
        <uni-list-item :border="false" class="uma-list-addtion"></uni-list-item>
      </uni-list>
    </scroll-view>
  </view>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 0 待服务 1已完成 2未完成 3 已取消
      state: {
        type: Number,
        default: null
      },
      items: {
        type: Array,
        default: function() {
          return [{
            //订单类型
            type: 0,
            // 用车类型
            carType: 0,
            // 订单时间
            orderTime: "05月31日 22:55",
            orderCost: "115.00",
            orderStar: "首都国际机场T3航站楼",
            orderDist: "昌平区南环里西区(南环路北)",
            //订单状态
            state: 0
          }, {
            //订单类型
            type: 0,
            // 用车类型
            carType: 0,
            // 订单时间
            orderTime: "05月31日 22:55",
            orderCost: "115.00",
            orderStar: "首都国际机场T3航站楼",
            orderDist: "昌平区南环里西区(南环路北)",
            //订单状态
            state: 1
          }];
        }
      }
    },
    components: {},
    data() {
      return {};
    },
    created() {},
    methods: {
      goNextPage(){
        let url = "/pages/driver/info";
        uni.navigateTo({
          url
        });
      },
      getTypeText(item) {
        let {
          type,
          carType
        } = item;
        let typeMapping = ["接机", "送机"];
        let carTypeMapping = ["经济", "舒适", "商务", "豪华"];
        let typeText = typeMapping[type] || "接机";
        let carTypeText = carTypeMapping[carType] || "经济";
        return `订单类型: ${typeText}(${carTypeText})`;
      },
      scrollList() {
        console.info(arguments, "==========");
      },
    },
    watch: {}
  };
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  .uma-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    uni-card{
      width: 100%;
    }
    .uma-scroll {
      height: 100%;
      overflow: hidden auto;
    }

    /deep/ .uni-card__header-extra-text {
      flex: none;
    }

    .uni-card--full {
      border-radius: 8px;
    }

    .uma-order-info {
      height: 30px;
      width: 100%;
      text-align: right;

      uni-button {
        margin-left: 10px;
      }

      /deep/ .uni-list-item__content-title {
        text-align: right;
        color: #fc9153;
      }
    }
    .uma-list-addtion{
      padding-bottom: 20px;
    }

  }
</style>
