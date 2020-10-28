<template>
	<view class="comm">
		<image src="../../../static/img/shop-bg.png" class="shop_bg"></image>
		<view class="shop-title bold font36 colorfff">店铺管理</view>
		<view class="shop-info">
			<view class="flex">
				<image src="../../../static/img/succss.png" class="shop-head" mode=""></image>
				<view>
					<view class="flex flex_al-cen">
						<text class="bold font36 colorfff">瑞幸咖啡(科技大学店)</text>
						<view class="vip colorfff font28 text_cen">VIP</view>
					</view>
					<view class="flex shop-icon-addr colorfff font26">
						<view class="flex flex_al-cen">
							<image src="../../../static/img/shop-addr.png" class="icon"></image>
							<text>长安区广安大街68号</text>
						</view>
						<view class="flex flex_al-cen" style="margin-left: 40upx;">
							<image src="../../../static/img/shop-dianhua.png" class="icon"></image>
							<text>13000000000</text>
						</view>
					</view>
				</view>
			</view>

			<view class="shop-gird bfff flex">
				<view class="flex flex-col flex_al-cen flex_jus-cen gird-item" v-for="(gird,i) in girdList" :key="i" @tap="handGo(gird,i)">
					<image :src="gird.img" mode="" class="gird-img"></image>
					<text>{{gird.title}}</text>
				</view>
			</view>
			<!--菜单管理  -->
			<view>
				<view class="bold color333 font36 meun-tit">菜单管理</view>
				<view class="bfff flex shop-gird shop-gird2">
					<view class="flex flex-col flex_al-cen flex_jus-cen " @tap="GoclassAdmin">
						<image src="../../../static/img/dpfl.png" mode="" class="gird-img"></image>
						<text>分类管理</text>
					</view>
					<view class="flex flex-col flex_al-cen flex_jus-cen " @tap="GoodsMangent">
						<image src="../../../static/img/dpgl.png" mode="" class="gird-img"></image>
						<text>商品管理</text>
					</view>
					<view class="flex flex-col flex_al-cen flex_jus-cen ">
						<image src="../../../static/img/dpsys.png" mode="" class="gird-img"></image>
						<text>扫一扫</text>
					</view>
				</view>
			</view>
			<!-- 店铺管理 -->
			<view>
				<view class="bold color333 font36 meun-tit">店铺管理</view>
				<view class="bfff flex shop-gird shop-gird2">
					<view class="flex flex-col flex_al-cen flex_jus-cen " @tap="GobaseInfo">
						<image src="../../../static/img/dpgl2.png" mode="" class="gird-img"></image>
						<text>基本信息</text>
					</view>
					<view class="flex flex-col flex_al-cen flex_jus-cen " @tap="GoBusinessAuth">
						<image src="../../../static/img/dpgl3.png" mode="" class="gird-img"></image>
						<text>商家认证</text>
					</view>
					<view class="flex flex-col flex_al-cen flex_jus-cen " @tap="GoAnnouncement">
						<image src="../../../static/img/dpgl1.png" mode="" class="gird-img"></image>
						<text>公告发布</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				girdList: [{
						title: '营业时间',
						img: require('../../../static/img/dp1.png')
					},
					{
						title: '活动管理',
						img: require('../../../static/img/dp2.png')
					},
					{
						title: '评价中心',
						img: require('../../../static/img/dp3.png')
					},
					{
						title: '配送合作',
						img: require('../../../static/img/dp4.png')
					},
					{
						title: '订单对账',
						img: require('../../../static/img/dp5.png')
					},
					{
						title: '营业时间',
						img: require('../../../static/img/dp6.png')
					}
				]
			}
		},
		methods: {
			GoclassAdmin() {
				uni.navigateTo({ //商品分类
					url: '../../Other/Categories/Categories'
				})
			},
			GoodsMangent() {
				uni.navigateTo({ //商品管理
					url: '../../Other/GoodsMangent/GoodsMangent'
				})
			},
			GoAnnouncement(){
				uni.navigateTo({ //发布公告
					url:'../../Other/person/Announcement'
				})
			},
			GobaseInfo(){ 
				uni.navigateTo({
					url:'../../Other/person/baseInfo'
				})
			},
			GoBusinessAuth(){
				uni.navigateTo({
					url:'../../Other/person/BusinessAuth'
				})
			},
			handGo(item, i) {
				i == 1 && uni.navigateTo({ //活动管理
					url: "../../Other/activeMangent/activeMangent"
				})
				i == 2 && uni.navigateTo({ //评价中心
					url: '../../Other/AssessCenter/AssessCenter'
				})
				i == 4 && uni.navigateTo({ //订单对账
					url: '../../Other/OrderCheck/OrderCheck'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_bg {
		width: 100%;
		height: 664upx;
		position: fixed;
	}

	.shop-title {
		position: absolute;
		top: 115rpx;
		left: 304rpx;
	}

	.shop-info {
		position: absolute;
		top: 217rpx;
		left: 30rpx;
		margin-bottom: 160upx;

		.shop-head {
			width: 93rpx;
			height: 93rpx;
			border-radius: 50%;
			margin-right: 21upx;
		}

		.icon {
			width: 30rpx;
			height: 30rpx;
		}

		.vip {
			width: 80upx;
			height: 30upx;
			background: #FF6868;
			border-radius: 15upx;
			margin-left: 14upx;
			line-height: 30upx;
		}

		.shop-icon-addr {
			margin-top: 29upx;
		}

		.shop-gird {
			border-radius: 10upx;
			flex-wrap: wrap;
			width: 690upx;
			height: 458upx;
			margin-top: 34upx;

			.gird-item {
				width: 33%;
				border-right: 1upx solid #eee;
				border-bottom: 1upx solid #eee;
			}

			.gird-item:nth-of-type(3n) {
				border-right: 0;
			}

			.gird-img {
				width: 64upx;
				height: 64upx;
				margin-bottom: 28upx;
			}
		}

		.meun-tit {
			margin-top: 40upx;
		}

		.shop-gird2 {
			height: 228upx;

			>view {
				width: 33.3%;
			}
		}
	}
</style>
