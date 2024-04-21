<template>
  <view class="uma-register">
    <uni-section title="身份证" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="/pages/auth/static/img/card-1.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传身份证人面像
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="驾驶证" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-2.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传驾驶证正面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="行驶证正页" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-3.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传行驶证正本正面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <uni-section title="行驶证车辆页" type="line"></uni-section>
    <view>
    	<uni-card :is-shadow="true" mode="style" extra=" " thumbnail="./static/img/card-4.png" @click="clickCard">
        <view class="icon-background">
          <view class="icon-style">
            <uni-icons type="camera" color="#ffffff" size="25"></uni-icons>
            <view class="">
              上传行驶证正本反面
            </view>
          </view>
        </view>
    	</uni-card>
    </view>
    <button
      class="btn-next"
      @click.stop="next"
      :style="{backgroundColor:btnBackgroundColor}"
      :disabled="nextBtnDisabled">
      提交
    </button>
  </view>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex';

  export default{
    data(){
      return {
        phone: '',
        nextBtnDisabled: false,
        btnBackgroundColor: '#bcbcbc'
      };
    },
    methods: {
      clearPhoneNum(){
        this.phone = '';
      },
      changePhoneNum(e){
        console.log(e.mp.detail.value);
        let phoneNum = e.mp.detail.value;
        phoneNum = phoneNum.replace(/\s+|[^\d]+/g, '');
        let result = [];
        for (let i = 0; i < phoneNum.length; i++) {
          if (i === 3 || i === 7) {
            result.push(' ');
          }
          result.push(phoneNum.charAt(i));
        }
        this.phone = result.join('');
      },
      next(){
        uni.showToast({
          title: '注册成功!',
          icon: 'success',
          success: setTimeout(() => {
            let userInfo = {
              username: "测试用户",
            };
            let hasLogin = true;
            let isDriver = true;
            this.setLoginInfo({
              userInfo,
              hasLogin,
              isDriver
            });
            uni.redirectTo({
              url: '/pages/driver/index'
            });
            this.clearPhoneNum();
          }, 500)
        });
      },
      checkPhoneNum(){
        return /^1[34578]\d{9}$/.test(this.phone.replace(/\s+/g, ''));
      },
      ...mapMutations("passenger/index", {
        savePhone: 'SET_PHONE'
      }),
      ...mapMutations({
        setLoginInfo: 'SET_LOGIN_INFO'
      })
    },
    watch: {
      phone(newVal){
        this.nextBtnDisabled = newVal.length !== 13;
      },
      nextBtnDisabled(newVal){
        if (!newVal) {
          this.btnBackgroundColor = '#4a4c5b';
        }
      }
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  .uma-register{
    .icon-background{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #000;
      opacity: 0.4;
      .icon-style{
        position: absolute;
        left: 50%;
        top: 50%;
        opacity: 1.4;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #FFFFFF;
      }
    }
    /deep/.uni-card__content--pd{
      padding: 0px;
    }
    /deep/.uni-card__thumbnailimage{
      height: 180px;
      image{
        height: 180px;
      }
      uni-image{
        height: 180px;
      }
    }
  }
</style>
