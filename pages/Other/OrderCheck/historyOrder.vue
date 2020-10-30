<template>
	<view class="comm">
		<view class="bfff historyorder font28 color333">
			<view class="tit mb30">订单编号：D20200921152114</view>
			<view class="flex flex_be info">
				<view class="flex">
					<image src="../../../static/img/pltu.png" mode=""></image>
					<view class="flex flex-col">
						<text>单人试吃套餐二</text>
						<text  class="font26 color999" style="margin: 9upx 0;">百事可乐(冰)</text>
						<text class="font26 color999">x1</text>
					</view>
				</view>
				<view >￥26</view>
			</view>
			<view class="history_content">
				<view class="flex flex_be">
					<text>下单时间</text>
					<text>2020-09-18 14:30:24</text>
				</view>
				<view class="flex flex_be">
					<text>下单时间</text>
					<text>2020-09-18 14:30:24</text>
				</view>
				<view class="flex flex_be">
					<text>下单时间</text>
					<text>2020-09-18 14:30:24</text>
				</view>
			</view>
			<!--  -->
			<view class="flex font32 color333 juchi flex flex_al-cen">
				<image src="../../../static/img/head.png" mode="" class="head-img"></image>
				<text>我是一名小保安</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.historyorder{
		border-radius: 10upx;
		padding: 0 30upx;
		margin: 30upx;
		box-sizing: border-box;
		.tit{
			border-bottom: 1px solid #eee;
			line-height: 86upx;
		}
		.info{
			border-bottom: 1px solid #eee;
			margin-bottom: 46upx;
			padding-bottom: 30upx;
		}
		.history_content{
			border-bottom: 2px dashed #eee;
			padding-bottom: 14upx;
			>view{
				margin-bottom: 54upx;
			}
		}
		image{
			width: 110upx;
			height: 110upx;
			border-radius: 10px;
			margin-right: 20upx;
		}
		.head-img{
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 19upx;
		}
		.juchi{
			line-height: 140upx;
			position: relative;
		}
		.juchi::before{
			content: "";
			background: #F7F9FA;
			width: 20upx;
			height: 32upx;
			border-radius: 0 100% 100% 0;//左上--右上--右下--左下
			display: block;
			border-left: none;
			position: absolute;
			top:-13%;
			left: -15px;
		}
		.juchi::after{
			content: "";
			background: #F7F9FA;
			width: 20upx;
			height: 32upx;
			border-radius: 100% 0 0 100%;//左上--右上--右下--左下
			display: block;
			border-left: none;
			position: absolute;
			top:-13%;
			right: -15px;
		}
	}
</style>
