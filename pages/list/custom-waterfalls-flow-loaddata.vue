<template>
	<view>
		<!-- <button type="default" @click="reset()">更新数据</button> -->
		<view class="tab">
			<view :class="['item',{'item-selected':tabIndex==index}]" v-for="(item,index) in 3" :key="index" @click="clickItem(item)">选项{{index+1}}</view>
		</view>
		<custom-waterfalls-flow ref="waterfallsFlowRef" :value="list" imageKey="image" :column="column" :columnSpace="1.5" :seat="2" @wapperClick="wapperClick" @imageClick="imageClick" @loaded="loaded">
			<!-- #ifdef MP-WEIXIN -->
			<view class="item" v-for="(item,index) in list" :key="index" slot="slot{{index}}">
				<view class="title">{{item.title}}</view>
				<view class="desc">{{item.sub}}</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<template v-slot:default="item">
				<view class="item">
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.sub}}</view>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
		<uni-load-more :contentText="load.txt" :status="load.status" v-if="!initPage&&list.length"></uni-load-more>
	</view>
</template>
<script>
	import { getList } from '@/common/api/demo.js';
	export default {
		data() {
			return {
				column: 3,
				list: [],
				page: 1,
				load: {
					status: 'more',
					txt: {
						contentdown: '加载更多',
						contentrefresh: '正在加载',
						contentnomore: '没有更多数据啦~'
					}
				},
				initPage: true,
				loading: true,
				tabIndex: 0
			};
		},
		onLoad() {
			this.init();
		},
		onPullDownRefresh() {
			this.update();
		},
		onReachBottom() {
			if (this.load.status == 'noMore' || this.load.status == 'noData' || this.loading) return false;
			this.load.show = true;
			this.load.status = 'loading';
			this.page++;
			this.init(0);
		},
		methods: {
			async clickItem(idx){
				this.initPage = true;
				this.tabIndex = idx;
				this.page = 1;
				await this.init(0);
				this.$refs.waterfallsFlowRef.refresh();
			},
			async update() {
				this.page = 1;
				await this.init(0);
				this.list[3].image = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-44851623-8c92-44c2-9205-8ff621f7e05b/47013248-8517-4e70-af54-f2729ca51933.jpg';
				// this.$refs.waterfallsFlowRef.refresh();
				uni.stopPullDownRefresh();
			},
			async init(type = 1) {
				this.loading = true;
				let data = {
					page: this.page,
					pageSize: 15
				};
				const res = await getList(data, type);
				const count = res.count;
				if (this.page == 1) {
					this.list = res.datas;
				} else {
					this.list.push.apply(this.list, res.datas);
				}
				this.load.status = (this.list.length >= count || res.datas.length == 0) ? 'noMore' : 'more';
				if (this.list.length == 0) this.load.status = 'noData';
				this.load.show = this.list.length > 0 ? true : false;
				return this.list;
			},
			loaded() {
				console.log('加载完成');
				this.loading = false;
				this.initPage = false;
			},
			wapperClick(item) {
				console.log('单项点击事件', item);
			},
			imageClick(item) {
				console.log('图片点击事件', item);
			},
			reset() {
				this.list = [
					{ image: 'https://via.placeholder.com/100x110.png/3c9cff/fff', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
					{ image: 'https://via.placeholder.com/200x500.png/ff0000', title: '我是标题1', desc: '描述描述描述描述描述描述描述描述1' },
				];
				// this.$refs.waterfallsFlowRef.refresh();
			}
		}
	};
</script>
<style scoped lang="scss">
	page {
		background-color: #F1F1F1;
	}
	.tab {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		.item {
			flex: 1;
			&-selected {
				color: #fff;
				background-color: pink;
			}
		}
	}
</style>
