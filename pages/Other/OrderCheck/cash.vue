<template>
	<view class="cash comm">
		<view class="cash-box">
			<view class="font32 color333 bold cash-title">提现金额</view>
			<view class="flex flex_al-cen yuan">
				<text class="font500 font28 color333">￥</text>
				<input type="text" class="font30":value="money" :focus='true' @input="Money" />
			</view>
			<view class="flex flex_be all-cash  font24">
				<text class="color999">当前可提现金额{{user_money}}元</text>
				<text class="all-cash-price" @tap="Allcash">全部提现</text>
			</view>
		</view>
		<view class="btn font32 font500 colorfff text_cen" @tap="getUserCash">立即提现</view>
		<view class="color333 font500 font32 cash-rule">提现规则</view>
		<view class="popbox" v-if="isPop">
			<view class="popup text_cen">
				<view class="pop">
					<view class="popbot">
						<image src="../../../static/img/succss.png" class="success"></image>
						<view class="color3434 bold font36 successtxt">提现申请成功</view>
						<view class="color9a9a font500 font26">提现后等待审核到账</view>
					</view>
					<view class="cash-card">
						<view class="font28 font500 flex flex_be cash-user">
							<text class="color333">收款账户</text>
							<text class="color666">{{}}</text>
						</view>
						<view class="font28 font500 flex flex_be">
							<text class="color333">提现金额</text>
							<text class="color666">{{money}}元</text>
						</view>
					</view>
				</view>
				<image src="../../../static/img/close.png" mode="" class="close" @tap="Close"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				isPop: false, //提现成功显示框
				money: "", //提现金额
				user_money: "", //可提现全部金额
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onLoad(option) {
			this.user_money = option.supplier_money
		},
		methods: {
			getUserCash() { //立即提现
				let that = this
				let params = {
					supplier_id: this.supplier_id,
				}
				that.request.getdata('getbankInfo', params).then(res => {//检测银行卡信息
					console.log(res, '检测银行卡')
					if (res.code == 300) {
						setTimeout(function(){
							uni.navigateTo({
								url: './cardInfo'
							})
						}, 2000);
						return false;
					} else {
						if (this.money == "" || this.money <= 0) {
							uni.showToast({
								title: '请输入提现金额',
								icon: 'none',
								duration: 2000
							});
							return false;
						}
						let that = this
						let params = {
							user_id: this.userId,
							money: this.money
						}
						that.request.getdata('getsupplierCash', params).then(res => {
							
							if(res.code==300){
								uni.navigateTo({
									url:'./cardInfo'
								})
								return false;
							}
							console.log(res, '提现')
							this.isPop = true
						})
					}
				})
			
			},
			Allcash() { //全部提现
				this.money = this.user_money
				if(this.user_money==''){
					uni.showToast({
						title: '没有可提现的金额',
						icon: 'none',
						duration: 2000
					});
				}
			},
			Close() { //关闭提现成功弹框
				this.isPop = false
			},
			Money(e) {
				let val = e.detail.value
				this.money = val
			}
		}
	}
</script>

<style lang="scss" scoped>
.cash{
	.cash-box{
		background: #fff;
		margin: 30upx;
		border-radius: 8upx;
		.cash-title{
			padding: 29upx 30upx;
		}
		.yuan{
			padding: 6upx 6upx 24upx 38upx;
			border-bottom: 1px solid #EEEEEE;
		}
		input{
			margin-left: 7upx;
			caret-color:#FFAC68;
		}
		.all-cash{
			height: 76upx;
			line-height: 76upx;
			padding: 0 32upx;
			.all-cash-price{
				color: #FFAC68;
			}
		}
	}
	.btn{
		width: 690upx;
		height: 80upx;
		line-height: 80upx;
		background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
		margin: 80upx auto 179upx auto;
	}
	.cash-rule{
		margin: 0 0 39upx 30upx;
	}
	.popbox{
		background: rgba(0,0,0,.3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		.popup{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left:-280upx ;
			margin-top: -298upx;
			box-sizing: border-box;
			.pop{
				width: 560upx;
				height: 596upx;
				background: #FFFFFF;
				border-radius: 20upx;
				padding-top: 74upx;
				.success{
					width: 150upx;
					height: 158upx;
				}
				.successtxt{
					margin: 42upx 0 20upx 0;
				}
				.btn{
					width: 500upx;
					height: 80upx;
					background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
					box-shadow: 1upx 5upx 20upx 0px rgba(209, 109, 78, 0.2);
					border-radius: 10upx;
					line-height: 80upx;
					margin: 0 auto;
					margin-top: 60upx;
				}
				.cash-card{
					padding: 30upx;
					box-sizing: border-box;
					.cash-user{
						margin-bottom: 40upx;
						margin-top: 10upx;
					}
				}
			}
			.close{
				width: 80upx;
				height: 80upx;
				margin-top: 110upx;
			}
			.popbot{
				padding-bottom: 50upx;
				border-bottom: 1px dashed #DEDEDE;
			}
			.popbot::before{
				content: "";
				background: rgba(0,0,0,.3);
				width: 20upx;
				height: 32upx;
				border-radius: 0 100% 100% 0;//左上--右上--右下--左下
				display: block;
				border-left: none;
				position: absolute;
				top:48%;
				left: 0px;
			}
			.popbot::after{
				content: "";
				background: rgba(0,0,0,.3);
				width: 20upx;
				height: 32upx;
				border-radius: 100% 0 0 100%;//左上--右上--右下--左下
				display: block;
				border-left: none;
				position: absolute;
				top:48%;
				right: 0px;
			}
		}
	}
	
}
</style>
