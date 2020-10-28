<template>
	<view>
		<view class="font32 color333 goods-title">基础信息</view>
		<view class="base-info bfff">
			<view class="font28 color333">商品名称</view>
			<input type="text" class="goods-inp font28 color999" placeholder="请输入商品名称" />
			<view class="font28 color333 goods-fenlei">商品分类</view>
			<dropbox :isCanInput="true"></dropbox>
			<view class="font28 color333 goods-fenlei">商品封面图(一张)</view>
			<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddImg">
				<image src="../../../static/img/add.png" mode="" class="add-img"></image>
			</view>
			<view class="font28 color333 goods-fenlei">商品banner图(1-5张)</view>
			<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddbannerImg">
				<image src="../../../static/img/add.png" mode="" class="add-img"></image>
			</view>
		</view>
		<view class="font32 color333 goods-title">商品规格<text class="font28 color65">(多种规格以英文逗号隔开）</text></view>
		<view class="base-info bfff">
			<view class="font28 color333">规格</view>
			<input type="text" class="goods-inp font28 color999" />
			<view class="font28 color333 goods-af">温度</view>
			<input type="text" class="goods-inp font28 color999" />
			<view class="font28 color333 goods-af">甜度</view>
			<input type="text" class="goods-inp font28 color999" />
			<view class="font28 color333 flex goods-out flex_be">
				<view >
					<view >商品售价(元)</view>
					<input type="text" value="" class="goods_p" />
				</view>
				<view>
					<view >商品原价(元)</view>
					<input type="text" value="" class="goods_p" />
				</view>
				<view>
					<view >商品库存</view>
					<input type="text" value="" class="goods_p" />
				</view>
				<view>
					<view>虚拟售量</view>
					<input type="text" value="" class="goods_p" />
				</view>
			</view>
			<view class="font28 color333">打包费(元)</view>
			<input type="text" class="goods-inp font28 color999" />
			<view class="font28 color333 goods-af">是否上架</view>
			<view class="flex on_shlef">
				<view class="flex font28 color666">
					<view class="goods_radio goods_af_active"></view>
					<view >上架商品</view>
				</view>
				<view class="flex font28 color666">
					<view class="goods_radio goods_af_active"></view>
					<view >下架商品</view>
				</view>
			</view>
			<view class="font28 color333 goods-fenlei">商品详细信息(详情页上传)</view>
			<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddbannerImg">
				<image src="../../../static/img/add.png" mode="" class="add-img"></image>
			</view>
		</view>
		<view class="commbtn colorfff font32 text_cen ml">确定添加</view>
	</view>
</template>
<script>
	import dropbox from '@/components/xfl-select/xfl-select.vue'
	export default {
		components: {
			dropbox,
		},
		data() {
			return {
				addImg: ''
			}
		},
		methods: {
			UploadaddImg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.addImg = res.tempFilePaths
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			UploadaddbannerImg() {
				let that = this
				uni.chooseImage({
					count: 5, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.addImg = res.tempFilePaths
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-title {
		padding: 30upx;
		background: #F7F9FA;
	}

	.base-info {
		padding: 30upx;

		.goods-inp {
			width: 690upx;
			height: 80upx;
			border: 1upx solid #EDEDED;
			border-radius: 10upx;
			padding-left: 30upx;
			margin-top: 20upx;
			box-sizing: border-box;
		}

		.goods-fenlei {
			padding: 39upx 0 20upx 0;
		}

		.goods-af {
			padding: 39upx 0 0upx 0;
		}

		.goods-poster {
			width: 160upx;
			height: 120upx;
			border: 1upx solid #EDEDED;
			border-radius: 10upx;

			.add-img {
				width: 48upx;
				height: 48upx;
			}
		}
		.goods-out{
			flex-wrap: wrap;
			margin-top: 39upx;
			>view{
				width: 48%;
				margin-bottom: 39upx;
			}
			.goods_p{
				width: 330upx;
				height: 80upx;
				border: 1upx solid #EEEEEE;
				border-radius: 10upx;
				padding-left: 30upx;
				box-sizing: border-box;
				margin-top: 20upx;
			}
		}
		.goods_radio{
			width: 48upx;
			height: 48upx;
			border: 1upx solid #EEEEEE;
			border-radius: 50%;
			position: relative;
			margin-right: 20upx;
		}
		.goods_af_active:after{
			content: '';
			width: 20upx;
			height: 20upx;
			background: #FFAC68;
			border-radius: 10upx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -10upx;
			margin-left: -10upx;
		}
		.on_shlef{
			>view{
				margin-right: 39upx;
			}
		}
	}
</style>
