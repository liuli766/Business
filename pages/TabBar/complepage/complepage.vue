<template>
	<!-- 发单列表 -->
	<view class="comm">
		<view class="order-comp-box ml mr mt30 mb30 font28 bfff  color333">
			<view class="flex flex_be order-comp-tit">
				<view class="bold">订单编号：D20200921152114</view>
				<view class="colorfac">已完成</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>订单名称</view>
				<view class="color666">珍珠奶茶</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>订单名称</view>
				<view class="color666">珍珠奶茶</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>下单时间</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>送达时间</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>下单次数</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>付款金额</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>预计收入</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>备注信息</view>
				<view class="color666">2020-09-18 14:30:24</view>
			</view>
			<view class="flex flex_be">
				<view class="order-comp-btn flex flex_jus-cen text_cen">
					<view class="iconfont icon-dianhua colorfac"></view>
					<view class="">联系骑手</view>
				</view>
				<view class="order-comp-btn flex text_cen flex_jus-cen">
					<view class="iconfont icon-dianhua colorfac"></view>
					<view class="">联系顾客</view>
				</view>
			</view>
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
			
		}
	}
</script>

<style lang="scss" scoped>
.order-comp-box{
	border-radius: 10upx;
	padding: 0 30upx 20upx 30upx;
	.order-comp-tit{
		line-height: 86rpx;
		border-bottom: 1px solid #eee;
		margin-bottom: 26upx;
	}
	.order-comp-info{
		margin-bottom: 54upx;
	}
	.order-comp-btn{
		width: 300upx;
		line-height: 80upx;
		border: 1upx solid #EEEEEE;
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
	}
}
</style>
