<template>
	<view class="orderinfo">
		<view class="bfff orderinfo-top">
			<view class="bold font500 font32 color333 info-title">配送信息</view>
			<view class=" font28 font500 info-addr">
				<view class="flex flex_be">
					<text class="color333">收货地址</text>
					<view class="flex flex-col color666">
						<text>观音桥银泰新苑7栋5-3</text>
						<text style="margin-top: 11upx;">王女士(130****0000)</text>
					</view>
				</view>
				<view class="flex flex_be info-fuwu">
					<text class="color333">配送服务</text>
					<text class="color666">饿了么</text>
				</view>
			</view>
		</view>
		<view class="orderinfo-bot bfff">
			<view class="bold font500 font32 color333 info-title">
				订单信息
			</view>
			<view class="flex flex_be info-addr font28 font500">
				<text class="color333">订单编号</text>
				<text class="color666">FKMW202009171838</text>
			</view>
			<view class="flex flex_be info-addr font28 font500">
				<text class="color333">订单编号</text>
				<text class="color666">FKMW202009171838</text>
			</view>
		</view>
		<slot name="detailbtn"></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.orderinfo-top,
	.orderinfo-bot {
		border-radius: 10upx;
		padding: 40upx 30upx 58upx;

		.info-title {
			box-sizing: border-box;
			padding-bottom: 23upx;
			border-bottom: 1px solid #eee;
		}

		.info-addr {
			padding-top: 46upx;

			.info-fuwu {
				margin-top: 52upx;
			}
		}
	}

	.orderinfo-bot {
		margin-top: 30upx;
	}
</style>
