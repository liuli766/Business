<template>
	<view class="accountset comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" style="color: #333333 !important;" @tap="back"></view>
			<view class="nickname">账户设置</view>
		</view>
		<view class="account-head font500 font30 color3434 flex flex_be mt30 mb30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg?headimg:'../../../static/img/head.png'" class="user-img"></image>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view class="mt30">
			<view class="flex flex_be list-item line" v-for="(item,i) in usersetList" :key="i" @tap="GoComminput(i)">
				<text class="color3434 font500 font30">{{item.name}}</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" v-if="i==0||(i==1)||(i==2)" :value="item.placeholder" disabled />
					<input type="password" v-if="i==3||(i==4)" :value="item.placeholder" placeholder="**********" disabled />
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<view class="user-btn text_cen font32 font500 colorfff" @tap="handConfirm">确定修改</view>
		<comminput v-if="iscomminput && (selectId==i)" :userinfoList='item' :idNum='i' v-for="(item,i) in usersetList" :key='i'
		 :IdCard='30' @handKeep='handKeep'></comminput>
	</view>
</template>

<script>
	import comminput from '@/components/personInput.vue'
	import {
		mapState,
	} from 'vuex';
	import uploadImage from '../../../utils/uploadFile.js'
	import util from '../../../utils/util.js'
	let pwd=uni.getStorageSync('pawd')
	console.log(pwd)
	let	backpwd=uni.getStorageSync('bakpwd')?uni.getStorageSync('bakpwd'):''
	export default {
		
		components: {
			comminput,
		},
		data() {
			return {
				headimg: "",
				selectId: "", //当前选中的下标
				usersetList: [{
						name: '商户名',
						placeholder: ""
					},
					{
						name: '负责人姓名',
						placeholder: ""
					},
					{
						name: '手机号码',
						placeholder: ""
					},
					{
						name: '退款密码',
						placeholder: backpwd
					},
					{
						name: '登录密码',
						placeholder: pwd
					}
				],
			}
		},
		computed: {
			...mapState({
				iscomminput: (state) => state.iscomminput,
				supplier_id: (state) => state.supplier_id, //商户id
				statustype: (state) => state.statustype,
			}),
		},
		onLoad() {
			this.person();
		},
		methods: {
			GoComminput(i) { //go输入框
				this.selectId = i
				this.$store.commit("Showcomminput", true);
			},
			handKeep(data) { //账户设置内容
				this.usersetList.map((item, i) => {
					if (this.selectId == i) {
						item.placeholder = data
					}
				})
			},
			back() { //返回上一级
				uni.navigateBack({
					delta: 1
				});
			},
			UploadHeadimg() { //上传图片
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.headimg = res.tempFilePaths[0]
						// that.request.uploadFile('getSetSupplierLogo', res.tempFilePaths[0]).then(res => {
						// 	that.headimg = res.image
						// 	console.log(that.headimg)
						// })
						var tempFilePaths = res.tempFilePaths;
						var nowTime = util.formatTime(new Date());
						
						//支持多图上传
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
								title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
								mask: true
							})
						
							//上传图片
							//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
							//图片路径可自行修改
							uploadImage(res.tempFilePaths[i], 'poster/' + nowTime + '/',
								function(result) {
									console.log("======上传成功图片地址为：", result);
									that.headimg = result
						
									uni.hideLoading();
								},
								function(result) {
									console.log("======上传失败======", result);
									uni.hideLoading()
								}
							)
						}
					}
				});
			},
			handConfirm() { //确定修改
				let that = this
				let supplier_name=this.usersetList[0].placeholder//商户昵称
				let boss_name=this.usersetList[1].placeholder//负责人姓名
				let mobile=this.usersetList[2].placeholder//手机号码
				let back_password=this.usersetList[3].placeholder//退款密码
				let login_password=this.usersetList[4].placeholder//登录密码
				let params = {
					id: this.supplier_id,
					supplier_name,
					boss_name,
					mobile,
					back_password:back_password?back_password:"",
					login_password:login_password?login_password:"",
					supplier_img:that.headimg// 头像
				}
				that.request.getdata('getSupplierSetTing', params).then(res => {
					if(res.code==200){
						// this.$store.commit("Statustype",true)
						uni.setStorageSync('bakpwd', back_password);
						uni.navigateBack({
							delta: 1
						});
					}
					
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});
					
					console.log(res, '账户设置')
				})
			},
			person() { //店铺商家信息
				let that = this
				let params = {
					supplier_id: this.supplier_id,
				}
				that.request.getdata('getSupplierInfo', params).then(res => {
					console.log(res, '店铺个人信息')
					this.usersetList[0].placeholder=res.info.supplier_name
					this.usersetList[1].placeholder=res.info.boss_name
					this.usersetList[2].placeholder=res.info.tel
					this.headimg=res.info.supplier_logo
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		height: 88upx;
		background: #fff;
	}

	.person-nav {
		padding-left: 10upx;
		background: #fff;
		padding-bottom: 27upx;
		box-sizing: border-box;
		height: 100rpx;
		padding-top: 30rpx;

		.icon-iconfont-left:before {
			color: #333 !important;
		}

		.nickname {
			margin-left: 240upx;
		}
	}

	.accountset {
		.account-head {
			background: #fff;
			line-height: 140upx;
			padding: 0 32upx;

			.user-img {
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 26upx;
			}
		}

		.icon-yjt {
			margin-left: 27upx;
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

		input {
			text-align: right;
		}

		.user-btn {
			width: 690upx;
			height: 80upx;
			background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
			box-shadow: 1upx 5upx 20upx 0px rgba(209, 109, 78, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
			margin: 0 auto;
			margin-top: 80upx;
		}
	}
</style>
