<template>
	<view class="waterfall">
		<custom-waterfalls-flow ref="waterfall"
			v-model="list"
			:add-time="10"
			:left-gap="leftGap"
			:right-gap="rightGap"
			:column-gap="columnGap"
			@changeList="changeList"
      @imageClick="info">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list1"
						:key="item.id"
						class="waterfall-item" >
						<view class="waterfall-item__image" :style="[imageStyle(item)]">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value">{{item.title}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{item.desc}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<!-- 为了磨平部分平台的BUG，必须套一层view -->
				<view>
					<view v-for="(item, index) in list2"
						:key="item.id"
						class="waterfall-item">
						<view class="waterfall-item__image" :style="[imageStyle(item)]">
							<image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
						</view>
						<view class="waterfall-item__ft">
							<view class="waterfall-item__ft__title">
								<text class="value">{{item.title}}</text>
							</view>
							<view class="waterfall-item__ft__desc uv-line-2">
								<text class="value">{{item.desc}}</text>
							</view>
						</view>
					</view>
				</view>
			</template>
		</custom-waterfalls-flow>
	</view>
</template>
<script>
  import {
    mapActions
  } from 'vuex';
	export default {
		data() {
			return {
				list: [],// 瀑布流全部数据
				list1: [],// 瀑布流第一列数据
				list2: [],// 瀑布流第二列数据
				leftGap: 10,
				rightGap: 10,
				columnGap: 10
			};
		},
		computed: {
			imageStyle(item) {
				return item=>{
					const v = uni.upx2px(750) - this.leftGap - this.rightGap - this.columnGap;
					const w = v/2;
					const rate = w / item.w;
					const h = rate* item.h;
					return {
						width: w + 'px',
						height: h + 'px'
					};
				};
			}
		},
		async onLoad() {
      this.getList();
		},
		methods: {
      ...mapActions("list/index", {
        getPhotoList:'GET_PHOTO_LIST',
        getTimeList: 'GET_TIME_LIST',
        getInfoList: 'GET_INFO_LIST',
      }),
      getList(){
        let params = {
           tId: "tId202405180002"
        };
        this.getPhotoList({
          params
        }).then((res)=>{
          let {
            success,
            data
          } = res;
          if(success){
            let {
              tid: id,
              title,
              coverImage,
              foreword: desc
            } = data;
            let {
              absolutePath: image,
              width: w,
              height: h
            } = coverImage;
            let item = {
              id,
              // allowEdit: i==0,
              image,
              w,
              h,
              title,
              desc
             };
            this.list.push(item);
          }
          console.info(res, "++++++++++");
        });
      },
      info(){
        let url = "/pages/list/info";
        uni.navigateTo({
          url
        });
      },
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e){
				this[e.name].push(e.value);
			},
		}
	};
</script>
<style>
	page {
		background: #f1f1f1;
	}
</style>
<style scoped lang="scss">
	$show-lines: 1;
	// @import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	.waterfall-item {
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
	}
	.waterfall-item__ft {
		padding: 20rpx;
		background: #fff;
		&__title {
			margin-bottom: 10rpx;
			line-height: 48rpx;
			font-weight: 700;
			.value {
				font-size: 32rpx;
				color: #303133;
			}
		}
		&__desc .value {
			font-size: 28rpx;
			color: #606266;
		}
		&__btn {
			padding: 10px 0;
		}
	}
</style>