<template>
	<view class="comm">
		<view class="remindetail">
			<listitem>
				<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
					<text class="color333 font28">订单编号：D20200921152114</text>
					<text class="colorfac font28">待配送</text>
				</view>
				<view class="flex flex_be deliver" slot="deliver">
					<text class="font28 color333">配送费</text>
					<text class="font28 color333">￥5</text>
				</view>
				<view slot="orderbot">
					<view class="order-box flex">
						<view class="mr">
							<text class="font26">共计:</text>
							<text class="colorff6 font32">￥37.00</text>
						</view>
						<view>
							<text class="font26">预计收入:</text>
							<text class="colorff6 font32">￥37.00</text>
						</view>
					</view>
					<view class="flex flex_be font28 pad30">
						<text class="color333">备注信息</text>
						<text class="color666">牛肉面只要牛肉不要面</text>
					</view>
					<view class="flex flex_be  font32 color666" style="padding-top: 40upx;">
						<view class="concatrider flex flex_al-cen flex_jus-cen">
							<text class="iconfont icon-dianhua colorfac"></text>
							<text>联系骑手</text>
						</view>
						<view class="concatcustomers flex flex_al-cen flex_jus-cen">
							<text class="iconfont icon-dianhua colorfac"></text>
							<text>联系顾客</text>
						</view>
					</view>
				</view>
			</listitem>
			<orderinfo>
				<view class="detailbtn colorfff text_cen" slot="detailbtn">扫码核销</view>
			</orderinfo>
		</view>
	</view>
</template>

<script>
	import listitem from '@/components/listItem/listItem.vue'
	import orderinfo from '@/components/orderInfo/orderInfo.vue'
	export default {
		components: {
			listitem,
			orderinfo
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.remindetail {
		margin: 30upx;

		.order-title {
			border-bottom: 1px solid #EEEEEE;
			padding-bottom: 30upx;
		}

		.deliver {
			margin-top: 30upx;
		}

		.order-box {
			justify-content: flex-end;
			border-bottom: 1px solid #eee;
			padding: 30upx 0;

			.colorff6 {
				color: #FF6868;
			}
		}

		.pad30 {
			border-bottom: 1px solid #eee;
		}

		.concatrider,
		.concatcustomers {
			width: 300upx;
			height: 80upx;
			border: 1px solid #EEEEEE;
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
		}

		.detailbtn {
			width: 690upx;
			line-height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
			margin-top: 60upx;
		}
	}
</style>
