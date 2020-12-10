<template>
	<view class="cardinfo comm">
		<view class="flex flex_be list-item mt30 mb30">
			<view @tap="handShow" style="height: 88upx;width: 100%;" class="flex flex_be">
				<text>开户行</text>
				<text>{{selectText}}</text>
			</view>
			<view class="card-meun" v-if="isShowPop">
				<view class="sjx"></view>
				<view class="down-meun text_cen">
					<scroll-view scroll-y=true scroll-x=true style="background-color: #fff;" class="list">
						<view class="font500 font28 color333" v-for="(item,i) in Carditem" :key='i' @tap="handSelect(item)">{{item.mingcheng}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="font30 font500 color333 mb30">
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>开户人姓名</text>
				<input type="text" placeholder="填写姓名" :value="user_name" :focus='true' @input='userName'/>
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>开户行支行</text>
				<input type="text" placeholder="填写开户行支行" :value="bank_son" @input="bankSon" />
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>银行卡号</text>
				<input type="number" placeholder="填写银行卡号" :value="bank_number" @input="bankNumber" />
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>手机号码</text>
				<input type="number" placeholder="银行预留手机号" :value="phone" @input="Phone" />
			</view>
		</view>
		<view>
			<view class="flex flex_be list-item list-line">
				<text>获取验证码</text>
				<text class="code" @tap="getcode">{{VlueTime>=60?'获取验证码':VlueTime+'s'}}</text>
			</view>
			<view class="flex flex_be list-item flex_al-cen">
				<text>输入验证码</text>
				<input type="number" placeholder="输入验证码" :value="code" @input="Code"/>
			</view>
		</view>
		<view class="btn font32 font500 colorfff text_cen" @tap="getBindBank">确定修改</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				Carditem: [], //银行列表
				selectText: "", //选中的银行文字
				isShowPop: false, //是否显示银行列表
				VlueTime: 60, //倒计时
				phone: "", //手机号
				user_name: "", //姓名
				bank_son: "", //开户支行
				bank_number: "", //银行卡号
				code: "", //验证码
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onLoad() {
			let that = this
			let params = {
				supplier_id: this.supplier_id,
			}
			that.request.getdata('getBanKList', params).then(res => {
				this.Carditem = res.data
				console.log(res, '开户行列表')
				this.handSelect(res.data[0])
			})

		},
		methods: {
			getBindBank() { //银行卡信息确定修改
				if (this.user_name == "") {
					uni.showToast({
						title: '请填写开户人姓名',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.bank_son == "") {
					uni.showToast({
						title: '请填写开户支行',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.bank_number == "") {
					uni.showToast({
						title: '请填写银行卡号',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.phone == "") {
					uni.showToast({
						title: '请填写手机号',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.code == "") {
					uni.showToast({
						title: '请填写验证码',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				let that = this
				let params = {
					supplier_id: this.supplier_id,
					bank_name: this.selectText,
					user_name: this.user_name,
					bank_son: this.bank_son,
					bank_number: this.bank_number,
					bank_mobile: this.phone,
					code: this.code,
				}
				that.request.getdata('getBindBank', params).then(res => {
					console.log(res, '银行卡信息')
					uni.navigateBack({
					    delta: 1
					});
				})
			},
			getcode() { //获取验证码
				if (/^1[34578]\d{9}$/.test(this.phone)) {
					let that = this
					let params = {
						mobile: this.phone
					}
					that.request.getdata('getSendCode', params).then(res => {
						console.log(res, '获取验证码')
						that.time()
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					})
				} else {
					uni.showToast({
						title: '手机格式不正确',
						icon: 'none',
						duration: 2000
					});
				}
			},
			time() { //倒计时
				this.VlueTime = this.VlueTime - 1
				if (this.VlueTime == 0) {
					this.VlueTime = 60
				} else {
					setTimeout(() => {
						this.time();
					}, 1000);
				}
			},
			handShow() {
				this.isShowPop = true
			},
			handSelect(item) {
				this.selectText = item.mingcheng
				this.isShowPop = false
			},
			userName(e) { //用户名称
				let val = e.detail.value
				this.user_name = val
			},
			bankSon(e){//开户支行
				let val = e.detail.value
				this.bank_son = val
			},
			bankNumber(e){//银行卡号
				let val = e.detail.value
				this.bank_number = val
			},
			Phone(e){//手机号码
				let val = e.detail.value
				this.phone = val
			},
			Code(e){
				let val = e.detail.value
				this.code = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cardinfo {
		.list-item {
			height: 88upx;
			background: #fff;
			line-height: 88upx;
			padding: 0 30upx;
		}

		.list-line {
			border-bottom: 1px solid #F7F9FA;
		}

		input {
			text-align: right;
		}

		.code {
			color: #FFAC68;
		}

		.card-meun {
			position: absolute;
			top: 0;
			right: 0;
		}

		.down-meun {
			width: 300upx;
			height: 400upx;
			overflow: auto;
			background: #fff;
			position: absolute;
			right: 30upx;
			box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.05);
			border-radius: 10upx;
			z-index: 9;
			top: 130upx;
		}

		.sjx {
			width: 0;
			height: 0;
			border: 22upx solid transparent;
			border-bottom-color: #fff;
			position: absolute;
			right: 60upx;
			top: 90upx;
		}

		.btn {
			width: 690upx;
			height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
			margin: 80upx 30upx 0 30upx;
		}
	}
</style>
