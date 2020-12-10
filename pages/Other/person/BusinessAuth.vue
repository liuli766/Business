<template>
	<view class="comm font30">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" style="color: #333333 !important;" @tap="back"></view>
			<view class="nickname">账户设置</view>
		</view>
		<view class="font28 font500 real-tit">
			请认真填写，<text class="real-rz">一经认证不可更改</text>
		</view>
		<view class="account-head font500 font30 color3434 flex flex_be mb30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg?headimg:'../../../static/img/head.png'" class="user-img"></image>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view>
			<view class="flex flex_be list-item line" v-for="(item,i) in usersetList" :key="i" @tap="GoComminput(i)">
				<text class="color3434 font500 font30">{{item.name}}</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<text class="color666">{{item.placeholder}}</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<!-- 上传身份证照片 -->
		<view>
			<view class="color666 font28 upload-card-tit">
				上传身份证照片
			</view>
			<view class="flex flex_be font24 color333 bfff" style="padding: 30upx;">
				<view class="flex flex-col flex_jus-cen flex_al-cen" @click="faceimg">
					<image :src="face_img?face_img:'../../../static/img/card4.png'" class="card-img"></image>
					<text>上传身份证主页</text>
				</view>
				<view class="flex flex-col flex_jus-cen flex_al-cen" @click="backimg">
					<image :src="back_img?back_img:'../../../static/img/card3.png'" class="card-img"></image>
					<text>上传身份证副页</text>
				</view>
			</view>
		</view>
		<!-- 商家资质上传 -->
		<view>
			<view class="color666 font28 upload-card-tit">
				商家资质上传
			</view>
			<view class="flex flex_be font24 color333 bfff" style="padding: 30upx;">
				<view class="flex flex-col flex_jus-cen flex_al-cen" @click="doimg">
					<image :src="do_img?do_img:'../../../static/img/card4.png'" class="card-img"></image>
					<text>上传营业执照</text>
				</view>
				<view class="flex flex-col flex_jus-cen flex_al-cen" @click="canimg">
					<image :src="can_img?can_img:'../../../static/img/card3.png'" class="card-img"></image>
					<text>上传许可证</text>
				</view>
			</view>
		</view>
		<view class="commbtn text_cen colorfff font32 ml" @tap="Hcomfirm">确认提交</view>
		<comminput v-if="iscomminput && (selectId==i)" @handKeep='handKeep' :userinfoList='item' v-for="(item,i) in usersetList"
		 :key='i'></comminput>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import comminput from '@/components/authinp.vue'
	import uploadImage from '../../../utils/uploadFile.js'
	import util from '../../../utils/util.js'
	export default {
		components: {
			comminput,
		},
		data() {
			return {
				headimg: "",
				selectId: "", //当前选中的下标
				face_img: "", //正
				back_img: "", //背
				do_img: "", //营业执照
				can_img: "", //资质证明
				usersetList: [{
						name: '商家名称',
						placeholder: ""
					},
					{
						name: '地址',
						placeholder: ""
					},
					{
						name: '联系电话',
						placeholder: ""
					},
					{
						name: '手机登录号',
						placeholder: ""
					},
					{
						name: '负责人姓名',
						placeholder: ""
					},
					{
						name: '身份证号码',
						placeholder: ""
					}
				]
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
				iscomminput: (state) => state.iscomminput,
			})
		},
		onLoad: function(option) {
			let that = this
			let params = {
				supplier_id: this.supplier_id,
			}
			that.request.getdata('getSupplierInfo', params).then(res => {
				console.log(res, '店铺商家信息')
				this.headimg = res.info.supplier_logo
				this.usersetList[0].placeholder = res.info.supplier_name
				this.usersetList[1].placeholder = res.info.address
				this.usersetList[2].placeholder = res.info.tel
				this.usersetList[3].placeholder = res.info.mobile
				this.usersetList[4].placeholder = res.info.boss_name
			})
		},
		methods: {
			UploadHeadimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.upImg(res.tempFilePaths, 'headimg')
					}
				});
			},
			faceimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.face_img = res.tempFilePaths[0]
						that.upImg(res.tempFilePaths, 'faceimg')
					}
				});
			},
			backimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.back_img = res.tempFilePaths[0]
						that.upImg(res.tempFilePaths, 'backimg')
					}
				});
			},
			doimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.do_img = res.tempFilePaths[0]
						that.upImg(res.tempFilePaths, 'doimg')
					}
				});
			},
			canimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.can_img = res.tempFilePaths[0]
						that.upImg(res.tempFilePaths, 'canimg')
					}
				});
			},
			upImg(Images, type) { //上传阿里云
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				let that = this
				var tempFilePaths = Images;
				var nowTime = util.formatTime(new Date());

				//支持多图上传
				for (var i = 0; i < Images.length; i++) {
					//显示消息提示框
					uni.showLoading({
						title: '上传中' + (i + 1) + '/' + Images.length,
						mask: true
					})

					//上传图片
					//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
					//图片路径可自行修改
					uploadImage(Images[i], 'poster/' + nowTime + '/',
						function(result) {
							console.log("======上传成功图片地址为：", result);
							if (type == 'headimg') {
								that.headimg = result
							} else if (type == 'faceimg') {
								that.face_img = result
							} else if (type == 'backimg') {
								that.back_img = result
							} else if (type == 'doimg') {
								that.do_img = result
							} else if (type == 'canimg') {
								that.can_img = result
							}

							uni.hideLoading();
						},
						function(result) {
							console.log("======上传失败======", result);
							uni.hideLoading()
						}
					)
				}
			},
			Hcomfirm() { //确认提交
				let that = this;
				let params = {
					id: this.supplier_id,
					supplier_img: that.headimg,
					supplier_name: this.usersetList[0].placeholder,
					address: this.usersetList[1].placeholder,
					tel: this.usersetList[2].placeholder,
					mobile: this.usersetList[3].placeholder,
					boss_name: this.usersetList[4].placeholder,
					boss_number: this.usersetList[5].placeholder,
					face_img: this.face_img,
					back_img: this.back_img,
					do_img: this.do_img,
					can_img: this.can_img,
				}
				that.request.getdata("getsupplierAuth", params).then(res => {
					console.log(res, '商家认证')
					uni.navigateBack({
						delta: 1
					});
				})
			},
			GoComminput(i) {
				this.selectId = i
				this.$store.commit("Showcomminput", true);
			},
			back() { //返回上一级
				uni.navigateBack({
					delta: 1
				});
			},
			handKeep(data) { //账户设置内容
				this.usersetList.map((item, i) => {
					if (this.selectId == i) {
						item.placeholder = data
					}
				})
			},
		},
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

		.nickname {
			margin-left: 240upx;
		}
	}

	.icon-iconfont-left:before {
		color: #333 !important;
	}

	.account-head {
		background: #fff;
		line-height: 140upx;
		padding: 0 32upx;
		border-bottom: 1px solid #eee;

		.user-img {
			width: 99upx;
			height: 99upx;
			border-radius: 50%;
			margin-right: 26upx;
		}
	}

	.comm {
		.real-tit {
			padding: 30upx;
		}

		.real-rz {
			color: #FFAC68;
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

	input {
		text-align: right;
		margin-right: 7upx;
	}

	/deep/.rotate {
		transform: rotate(90deg) !important;
		transition: all .2s;
	}

	.upload-card-tit {
		margin: 50upx 0 32upx 32upx;
	}

	.card-img {
		width: 333upx;
		height: 200upx;
		margin-bottom: 16upx;
	}

	.commbtn {
		margin-bottom: 60upx;
	}
</style>
