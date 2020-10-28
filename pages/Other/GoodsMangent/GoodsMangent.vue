<template>
	<view class="comm">
		<view class="flex flex_be class-top">
			<view class="flex flex-col">
				<text class="color333 bold font36 lh class-top-tit">商品管理</text>
				<text class="font26 lh color666">序号若相同，则最新添加商品优先显示</text>
			</view>
			<view class="colorfac font28" @tap="addClass">添加商品</view>
		</view>
		<view class="class-box font28 color333 bfff">
			<view class="flex class-box-tit flex_be">
				<view>序号</view>
				<view>分类名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in 3" :key="i">
				<view class="number text_cen">1</view>
				<view>分类一</view>
				<view class="font24 colorfff text_cen flex">
					<view class="modify" @tap="updateClass">修改</view>
					<view class="delete" @tap="handDelete">删除</view>
				</view>
			</view>
		</view>
		<refusepop v-if="isConcatPop">
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认删除</view>
				<view class="color999 font500 font26">删除之后将不可恢复</view>
			</view>
		</refusepop>
	</view>
</template>

<script>
	import refusepop from '@/components/refusePop/refusePop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			refusepop,
		},
		data() {
			return {
				fiction: ''
			}
		},
		computed: {
			...mapState({
				isConcatPop: (state) => state.isConcatPop
			}),
		},

		methods: {
			addClass() {
				uni.navigateTo({
					url:'./AddGoods'
				})
			},
			handDelete() {
				this.$store.commit("showConcatPop", true);
			},
			updateClass() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class-top {
		margin: 39upx 31upx;

		.class-top-tit {
			margin-bottom: 21upx;
		}
	}

	.class-box {
		border-radius: 10upx;
		width: 690upx;
		margin: 0 30upx;

		.number {
			width: 48upx;
			line-height: 48upx;
			border: 1upx solid #EEEEEE;
			border-radius: 5upx;
		}

		.class-box-item {
			padding: 0 30upx;
			margin-bottom: 30upx;
			padding-bottom: 40upx;
		}

		.class-box-tit {
			border-bottom: 1px solid #eee;
			padding: 40upx 30upx 30upx 30upx;
			margin-bottom: 30upx;

			>view {
				width: 33.3%;
			}
		}

		.modify,
		.delete {
			width: 80upx;
			height: 36upx;
			background: #5D82FF;
			border-radius: 18upx;
			line-height: 36upx;
		}

		.delete {
			background: #FF6868;
			margin-left: 20upx;
		}
	}
</style>
