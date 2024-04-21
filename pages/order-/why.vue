<template>
  <div class="order-why-page">
    <view class="page-header">
      <view class="page-header-wrapper">
        <p class="text-why">你为什么取消?</p>
        <p class="text-header">请告知我们，我们可以改善</p>
      </view>
    </view>
    <view class="page-bodyer">
      <view class="page-bodyer-wrapper">
        <view class="">
          <uni-data-checkbox multiple v-model="values" :localdata="reasons" mode="list"></uni-data-checkbox>
        </view>
        
        <view class="weui-cell weui-cell_link" v-if="isShowMore" @click.stop="showMoreReasons">
          <view class="more-reasons">点击查看更多原因</view>
        </view>
      </view>
    </view>
    <view class="page-footer">
      <button class="btn-commit" @click.stop="commit">提交</button>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        reasons: [{
          value: 0,
          text: '行程有变，暂时不需要用车',
          checked: false
        }, {
          value: 1,
          text: '赶时间，换用其它交通工具',
          checked: false
        }, {
          value: 2,
          text: '平台派单太远',
          checked: false
        }, {
          value: 3,
          text: '司机以各种理由不来接我',
          checked: false
        }, {
          value: 4,
          text: '联系不上司机',
          checked: false
        }, {
          value: 5,
          text: '我找不到终点',
          checked: false
        }],
        moreResons: [{
            value: 6,
            text: '司机未在规定的时间到达站点',
            checked: false
          }, {
            value: 7,
            text: '司机找不到上车地点',
            checked: false
          }, {
            value: 8,
            text: '司机要求加价或现金交易',
            checked: false
          },
          {
            value: 9,
            text: '司机服务态度恶劣',
            checked: false
          },
          {
            value: 10,
            text: '不是订单显示车辆或司机',
            checked: false
          },
          {
            value: 11,
            text: '其他',
            checked: false
          }
        ],
        isShowMore: true,
        values: []
      };
    },
    created() {
      console.info(this.reasons);
    },
    onUnload() {
      this.clearData();
    },
    methods: {
      checkboxChange(e) {
        const indexArr = e.mp.detail.value;
        this.reasons = this.reasons.map(item => {
          if (indexArr.indexOf(String(item.value)) !== -1) {
            return {
              ...item,
              checked: true
            };
          } else {
            return {
              ...item,
              checked: false
            };
          }
        });
      },
      showMoreReasons() {
        uni.showLoading({
          title: '加载中',
          icon: 'loading',
          duration: 800,
          success: () => {
            console.info(this.values);
            this.reasons = this.reasons.concat(this.moreResons);
            this.isShowMore = false;
            uni.hideLoading();
          }
        });
      },
      commit() {
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          success: () => {
            uni.redirectTo({
              url: "/pages/order/close"
            });
          }
        });
      },
      clearData() {
        this.reasons = reasons;
        this.isShowMore = true;
      }
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin1';

  .order-why-page {
    background-color: #fff;
    padding: 12px 12px 0;
    height: 100vh;
    box-sizing: border-box;
    // background-color: @page-bg-color;
    display: flex;
    flex-direction: column;
    .page-header{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 80px;
      box-sizing: border-box;
      
      .text-why {
        text-align: center;
        color: rgba(0, 0, 0, .6);
        font-size: 18px;
      }
      
      .text-header {
        text-align: center;
        color: #fc9153;
        font-size: 14px;
      }
    }
    .page-bodyer{
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      .text {
        .no-wrap();
        color: #666666;
        font-size: 14px;
      }
      
      img {
        width: 20px;
        height: 20px;
      }
      .more-reasons {
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        padding-right: 12px;
        .inverted-triangle(#adadad)
      }
    }
    .page-footer{
      .btn-commit {
        margin: 20px 0;
        .long-btn(#fff, #4a4c5b);
      }
    }
  }
</style>
