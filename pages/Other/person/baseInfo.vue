<template>
	<view class="accountset comm">
		<view class="account-head font500 font30 color3434 flex flex_be mt30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg?headimg:'../../../static/img/head.png'" class="user-img"></image>
				</view>
				<!-- <view class="iconfont icon-you"></view> -->
			</view>
		</view>
		<view class="flex flex_be list-item line mb30 font30">
			<text class="color3434 font500 font30">店铺封面图</text>
			<view class="flex flex_al-cen flex_jus-cen"  @click="Uploadposterimg">
				<text class="color666" v-if="!posterimg">点击上传</text>
				<image :src="posterimg" mode="" v-else style="width: 54upx;height: 60upx;"></image>
				<view class="icon-yjt iconfont icon-you"></view>
			</view>
		</view>
		<view class="">
			<view class="flex flex_be list-item line font30">
				<text class="color3434 font500 font30">电话</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" class="color666" :value="SupplierInfo.tel" @input="handleTel"/>
					<!-- <view class="icon-yjt iconfont icon-you"></view> -->
				</view>
			</view>
			<view class="flex flex_be list-item line font30">
				<text class="color3434 font500 font30">地址</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<!-- <text class="color666">{{SupplierInfo.address}}</text> -->
					<input type="text" class="color666" :value="SupplierInfo.address" @input="handlelAddress" />
					<!-- <view class="icon-yjt iconfont icon-you"></view> -->
				</view>
			</view>
			<view class="flex flex_be list-item line font30 meun-name"  @tap="handDownmeun">
				<text class="color3434 font500 font30">归属学校</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<input type="text" class="color666" :value="school" disabled="disabled"  />
					<view class="meun flex flex-col text_cen font30" v-if="isDownmeun">
						<text v-for="(item,k) in schoolList" :key='k' @tap.stop="handSchool(item)">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="user-btn text_cen font32 font500 colorfff" @tap="handcomfirm">确定修改</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import uploadImage from '../../../utils/uploadFile.js'
	import util from '../../../utils/util.js'
	export default {

		data() {
			return {
				headimg: "",
				posterimg:"",//封面
				SupplierInfo: {}, //个人信息
				school:"",
				isDownmeun: false, //是否显示性别下拉框
				schoolList:[],
				selectid:1,
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onLoad() {
			this.person();
			let that = this
			let params = {
				supplier_id: this.supplier_id,
			}
			that.request.getdata('getarrSchool', params).then(res => {
				console.log(res, '学校')
				this.schoolList=res.data
			})
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
					that.headimg=res.info.supplier_logo
				})
			},
			handDownmeun() { //显示分类下拉框
				this.isDownmeun = !this.isDownmeun
			},
			handSchool(item){
				console.log(item)
				this.school=item.name
				this.selectid = item.id
				this.isDownmeun = false
			},
			handleTel(e){
				let val=e.detail.value
				this.SupplierInfo.tel=val
			},
			handlelAddress(e){
				let val=e.detail.value
				this.SupplierInfo.address=val
			},
			handelText(e){
				let val=e.detail.value
				this.school=val
			},
			handcomfirm(){
				let that = this
				let params = {
					supplier_id: this.supplier_id,
					head_img:that.headimg,
					cover_img:that.posterimg,
					mobile:this.SupplierInfo.tel,
					address:this.SupplierInfo.address,
					school_id:this.selectid
				}
				that.request.getdata('getsupplierInfoSetTing', params).then(res => {
					console.log(res, '商家基本信息')
					uni.navigateBack({
						delta: 1
					});
				})
			},
			UploadHeadimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
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
			Uploadposterimg(){
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
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
									that.posterimg = result
						
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountset {
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
	.meun-name {
		position: relative;
	
		.meun {
			position: absolute;
			top: 76upx;
			right: 0;
			width: 500upx;
			height: 500upx;
			background: #fff;
			box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.05);
			border-radius: 10upx;
			z-index: 9;
			transition: all .2s;
			overflow: auto;
	
			text:hover {
				background: #F7F9FA;
			}
		}
	}
</style>
