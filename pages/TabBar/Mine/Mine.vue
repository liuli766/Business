<template>
	<view class="mine comm">
		<view class="person-box">
			<image src="../../../static/img/personbg.png" mode=""></image>
			<view class="mine-box flex flex_al-cen">
				<view class="flex flex_al-cen">
					<image :src="SupplierInfo.supplier_logo" mode="" class="mine-img"></image>
					<view class="flex flex-col">
						<text class="bold font36 colorfff lh">{{SupplierInfo.supplier_name}}</text>
						<text class="font500 colorfff font28 mine-tel lh">{{SupplierInfo.tel}}</text>
					</view>
					<view class="font500 font24 unauthorized text_cen">{{SupplierInfo.is_real==1?'已实名':'未认证'}}</view>
				</view>
				<!-- <view class="iconfont icon-you"></view> -->
			</view>
			<view class="mb30 mt30">
				<view class="flex flex_be list-item line" @tap="Gousersetting">
					<text class="color3434 font500 font30">账户设置</text>
					<text class="iconfont icon-you"></text>
				</view>
				<view class="flex flex_be list-item line">
					<text class="color3434 font500 font30">自动接单</text>
					<switch checked @change="switch1Change" color='#5D82FF' style="transform:scale(0.8)" :checked='checked' />
				</view>
				<!-- <view class="flex flex_be list-item">
					<text class="color3434 font500 font30">通知设置</text>
					<switch checked @change="switch1Change" color='#5D82FF' style="transform:scale(0.8)" />
				</view> -->
			</view>
			<view class="flex flex_be list-item line" @tap="GoAbout">
				<text class="color3434 font500 font30">关于我们</text>
				<text class="iconfont icon-you"></text>
			</view>
			<view class="flex flex_be list-item line" @tap="GomustKnow">
				<text class="color3434 font500 font30">商家须知</text>
				<text class="iconfont icon-you"></text>
			</view>
			<!-- <view class="flex flex_be list-item">
				<text class="color3434 font500 font30">当前版本</text>
				<text class="font30 color666">V1.0.0</text>
			</view> -->
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
				SupplierInfo: {}, //个人信息
				checked:false
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onShow() {
			this.SupplierInfo={}
			this.person()
			this.getautoFind()
		},
		methods: {
			person() { //店铺商家信息
				let that = this
				let params = {
					supplier_id: this.supplier_id,
				}
				that.request.getdata('getSupplierInfo', params).then(res => {
					console.log(res, '店铺个人信息')
					this.SupplierInfo = res.info
					this.$store.commit('handisreal',res.info.is_real)
				})
			},
			switch1Change: function(e) { //自动接单
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				let params = {
					supplier_id: this.supplier_id,
					auto:e.target.value?1:0
				}
				this.request.getdata('getautoOrder', params).then(res => {
					console.log(res, '自动接单')
					setTimeout(function(){
						uni.showToast({
							title: e.target.value?'自动接单开启成功':'自动接单关闭成功',
							icon: 'none',
							duration: 3000
						});
						
					},1000)
				})
			},
			getautoFind(){
				let params = {
					supplier_id: this.supplier_id,
				}
				this.request.getdata('getautoFind', params).then(res => {
					console.log(res, '自动接单查询')
					this.checked=res.auto
				})
			},
				
			GoAbout() {
				uni.navigateTo({
					url: '../../Other/person/about'
				})
			},
			GomustKnow() {
				uni.navigateTo({
					url: '../../Other/person/mustKnow'
				})
			},
			Gousersetting() {
				uni.navigateTo({
					url: '../../Other/person/usersetting'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.person-box {
		image {
			width: 100%;
			height: 180upx;
			position: relative;
		}

		.mine-box {
			position: absolute;
			top: 41upx;
			left: 31upx;

			.mine-tel {
				opacity: 0.6;
				margin-top: 23upx;
			}

			.mine-img {
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 29upx;
			}

			.unauthorized {
				color: #FFAC68;
				width: 100upx;
				height: 34upx;
				border: 1px solid #FFAC68;
				border-radius: 4upx;
				line-height: 34upx;
				margin-left: 20upx;
				// margin-right: 170upx;
				align-self: flex-start;
				margin-top: 10rpx;
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
