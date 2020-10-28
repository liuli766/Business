<template>
	<!-- 订单对账 -->
	<view class="comm order_check">
		<view class="commission-bg">
			<image src="../../../static/img/zjbg.png"></image>
			<view class="commission-box flex flex_al-cen text_cen">
				<view class="font500 colorfff flex flex-col frist">
					<text class="commission font28">当前佣金(元)</text>
					<text class="commission-price">128.50</text>
				</view>
				<view class="font500 colorfff flex flex-col two">
					<text class="commission font28">历史佣金(元)</text>
					<text class="commission-price">24,00.00</text>
				</view>
			</view>
		</view>
		<view class="mb30 color333  font30">
			<view class="flex flex_be list-item line" @tap="Gocardinfo">
				<text>银行卡信息</text>
				<text class="iconfont icon-you"></text>
			</view>
			<view class="flex flex_be list-item" @tap="Gobilling">
				<text>账单记录</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		<view class="flex flex_be list-item " @tap="Gocash">
			<text class="color333  font30">我要提现</text>
			<text class="iconfont icon-you"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			Gocash() {
				uni.navigateTo({
					url: './cash'
				})
			},
			Gocardinfo() {
				uni.navigateTo({
					url: './cardInfo'
				})
			},
			Gobilling() {
				uni.navigateTo({
					url: './billingRecords'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.order_check{
	.commission-bg {
		margin-bottom: 30upx;
	
		image {
			width: 100%;
			height: 215upx;
			position: relative;
		}
	
		.commission-box {
			position: absolute;
			width: 100%;
			top: 0;
			margin: 66upx 0 0 125upx;
	
			.commission {
				opacity: 0.6;
			}
	
			.commission-price {
				font-size: 48upx;
				font-family: SF Pro Text;
			}
	
			.frist {
				padding-right: 94upx;
			}
	
			.frist:after {
				content: "";
				opacity: 0.6;
				display: block;
				position: absolute;
				width: 1upx;
				height: 60upx;
				background: #fff;
				top: 15upx;
				left: 262upx;
			}
	
			.two {
				padding-left: 94upx;
			}
		}
	}
	
	.list-item {
		height: 88upx;
		background: #fff;
		line-height: 88upx;
		padding: 0 30upx;
	}
	
	.line {
		border-bottom: 1px solid #EEEEEE;
	}
}
</style>
