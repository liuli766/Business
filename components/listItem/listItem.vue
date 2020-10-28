<template>
	<view class="content">
		<slot name="ordernum"></slot>
		<view class="flex flex_be order-pro-box">
			<view class="flex">
				<image src="../../static/img/tabar4act.png" mode="" class="order-img"></image>
				<view class="flex flex-col">
					<text class="font28 font500 color333 lh">单人试吃套餐二</text>
					<text class="font26 font500 color999 lh mar19">百事可乐(冰)</text>
					<text class="font26 font500 color999 lh">x1</text>
				</view>
			</view>
			<text class="font500 font28 color333">￥26</text>
		</view>
		<view class="order-price">
			<view class="flex flex_be ">
				<text class="font500 font28 color333">打包费</text>
				<text class="font500 font28 color333">￥5</text>
			</view>
			<slot name="deliver"></slot>
		</view>
		<slot name="orderbot"></slot>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		props: {

		},
		// computed: {
		//     ...mapState({
		// 		isPop: (state) => state.isPop,
		// 	}),
		// },
		data() {
			return {

			}
		},
		methods: {
			GunList() {
				this.$store.commit("showPop", true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #fff;
		padding: 30upx;
		border-radius: 10upx;
		margin-bottom: 30upx;

		.order-pro-box {
			padding: 30upx 0;
			border-bottom: 1px solid #eee;

			.order-img {
				width: 110upx;
				height: 110upx;
				border-radius: 10upx;
				margin-right: 20upx;
			}

			.mar19 {
				margin: 19upx 0;
			}
		}

		.order-price {
			padding: 30upx 0;
			border-bottom: 1px solid #eee;
		}

	}
</style>
