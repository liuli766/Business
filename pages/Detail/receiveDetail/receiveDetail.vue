<template>
	<view class="comm">
		<view class="remindetail">
			<listitem>
				<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
					<text class="color333 font28">订单编号：D20200921152114</text>
					<text class="colorfac font28">待接单</text>
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
				<view class="colorfff text_cen flex mr ml font500 font32" slot="detailbtn" style="margin-top: 60upx;">
					<view class="btn1 color666 mr" @tap="handRefuse">拒绝</view>
					<view class="btn2 colorfff" @tap="Receorder">接单</view>
				</view>
			</orderinfo>
		</view>
		<Pop>
			<view class="color3434 bold font36 successtxt" slot="successtxt">接单成功</view>
			<view class="color9a9a font500 font26" slot="subtet">记得准时出货哦</view>
			<view class="btnpop font500 font32 text_cen colorfff" slot='btnpop' @tap="hanKnow">知道了</view>
		</Pop>
		<refusepop v-if="isConcatPop">
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认拒绝</view>
				<view class="color999 font500 font26">拒绝后订单将被退回</view>
			</view>
		</refusepop>
		<concatpop v-if="isRefusePop"></concatpop>
	</view>
</template>

<script>
	import listitem from '@/components/listItem/listItem.vue'
	import orderinfo from '@/components/orderInfo/orderInfo.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import refusepop from '@/components/refusePop/refusePop.vue'
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			listitem,
			orderinfo,
			Pop,
			refusepop,
			concatpop
		},
		data() {
			return {

			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log(item)
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop,
				isRefusePop:(state) => state.isRefusePop,
			}),
		},
		methods: {
			Receorder() {
				this.$store.commit("showPop", true);
			},
			handRefuse(){
				this.$store.commit("showConcatPop", true);
			},
			hanKnow() {
				this.$store.commit("showPop", false);
			},
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
			border: 1upx solid #EEEEEE;
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
		}
		.btn1,.btn2{
			width: 300upx;
			line-height: 80upx;
			border: 1upx solid #EEEEEE;
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
		}
		.btn2{
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
		}
	}
	.successtxt {
		margin: 42upx 0 20upx 0;
	}
	.poptitle{
		margin: 60upx 0 38upx 0;
	}
</style>
