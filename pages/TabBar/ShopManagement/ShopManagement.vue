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
		<!-- 营业时间弹窗 -->
		<view class="time-pop" v-if="isvisible">
			<view class="time-pop-box">
				<view class="font36 bold color333 text_cen">营业时间</view>
				<view style="position: relative;" @tap="handShowTime">
					<input type="text" :value="suretime"   placeholder="选择营业时间" disabled class="font26" placeholder-style='color:#999;font-size:26upx'/>
					<view class="sanjiao"></view>
				</view>
				<view class="font32 font500 flex">
					<view class="confirm color666 text_cen ml" @tap="handcancel">取消</view>
					<view class="cancel colorfff text_cen" @tap="handconfirm">确认提交</view>
				</view>
			</view>
			<view class="sfm-time" v-if="isshowtime">
				<view class="flex font28 color666 flex_ar">
					<text @tap="Canceltimepop">取消</text>
					<text class="color333 bold font32">选择时间</text>
					<text class="colorfac" @tap="Confirmtimepop">确定</text>
				</view>
				<view class="font28 color999 flex flex_ar" style="margin: 28upx 0 40upx 0;">
					<text>营业时间</text>
					<text>休息时间</text>
				</view>
				<view class="flex">
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in hours" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in minus" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
					<view class="color999" style="line-height: 300rpx;">—</view>
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday1" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in hours" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in minus" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
				</view>
				
			</view>
			
		</view>
		<!-- 配送合作弹窗 -->
		<view class="time-pop" v-if="iscoopshow">
			<view class="time-pop-box" style="height: 446upx;">
				<view class="font36 bold color333 text_cen">配送设置</view>
				<view class="font28 radio-box">
					<view class="flex">
						<view style="margin-right: 19upx;">是否支持平台配送</view>
						<view class="flex color666 mr">
							<view class="radio"></view>
							<view class="">支持</view>
						</view>
						<view class="flex color666">
							<view class="radio"></view>
							<view class="">不支持</view>
						</view>
					</view>
					<view class="flex" style="margin-top: 32upx;">
						<view style="margin-right: 19upx;">是否支持平台配送</view>
						<view class="flex color666 mr">
							<view class="radio"></view>
							<view class="">支持</view>
						</view>
						<view class="flex color666">
							<view class="radio"></view>
							<view class="">不支持</view>
						</view>
					</view>
				</view>
				<view class="font32 font500 flex">
					<view class="confirm color666 text_cen ml" @tap="handcancel">取消</view>
					<view class="cancel colorfff text_cen" @tap="handconfirm">确认提交</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const date = new Date()
			const hours = []
			const hour = date.getHours();
			const minus = []
			const minu = date.getMinutes();
			for(let i = 0;i<date.getHours();i++){
				hours.push(i)
			}
			for(let i = 0;i<date.getMinutes();i++){
				minus.push(i)
			}
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
						title: '历史订单',
						img: require('../../../static/img/dp6.png')
					}
				],
				title: 'picker-view',
				hours,
				hour,
				minus,
				minu,
				newbefortime:'',
				newaftertime:'',
				suretime:'',
				value: [60, hour-1, minu-1],
				visible: true,
				isvisible:false,//营业时间弹窗
				isshowtime:false, //时间弹窗
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				iscoopshow:false,
			}
		},
		methods: {
			bindChangeday: function(e) {
				const val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minu = this.minus[val[1]]
				let hour = this.hours[val[0]]
				let minu = this.minus[val[1]]
				this.newbefortime = hour+':'+minu
				console.log(this.newbefortime)
			},
			bindChangeday1(e){
				const val = e.detail.value
				this.hour = this.hours[val[0]]
				this.minu = this.minus[val[1]]
				let hour = this.hours[val[0]]
				let minu = this.minus[val[1]]
				this.newaftertime = hour+':'+minu
				console.log(this.newaftertime)
			},
			handShowTime(){
				this.isshowtime=true
			},
			handconfirm(){
				if(!this.suretime){
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration:2000
					});
				}else{
					this.isvisible=false
				}
			},
			handcancel(){
				this.isvisible=false
			},
			Canceltimepop(){
				this.isshowtime=false
				
			},
			Confirmtimepop(){
					this.suretime = this.newbefortime+'-'+this.newaftertime
					this.isshowtime=false			
			},
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
				i ==0 && (this.isvisible=true) //营业时间
				i=5 && uni.navigateTo({ //历史订单
					url:'../../Other/OrderCheck/historyOrder'
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
	.time-pop{
		background: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		transition: all .2s;
		.sfm-time{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 496upx;
			background: #fff;
			padding: 30upx;
			box-sizing: border-box;
		}
		.time-pop-box{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left:-280upx ;
			margin-top: -207upx;
			width: 560upx;
			height: 414upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;
			padding-top: 60upx;
			box-sizing: border-box;
		}
		input{
			width: 500upx;
			height: 80upx;
			border: 1upx solid #DEDEDE;
			border-radius: 10upx;
			padding-left: 40upx;
			box-sizing: border-box;
			margin: 30upx 30upx 60upx 30upx;
		}
		.confirm{
			width: 200upx;
			line-height: 80upx;
			border: 1upx solid #EEEEEE;
			border-radius: 10upx;
			margin-right: 20upx;
		}
		.cancel{
			width: 280upx;
			line-height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			border-radius: 10upx;
			border: none;
		}
		.sanjiao{
			width: 0;
			height: 0;
			border: 13upx solid transparent;
			border-top-color: #eee;
			position: absolute;
			top: 38upx;
			right: 82upx;
		}
	}
	.radio-box{
		margin: 50upx 30upx 52upx 30upx;
		.radio{
			width: 32upx;
			height: 32upx;
			border: 1upx solid #EEEEEE;
			border-radius: 16upx;
			position: relative;
		}
		.radio:after{
			content:"";
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -8upx;
			margin-left: -8upx;
			width: 16upx;
			height: 16upx;
			border-radius: 50%;
			background: #FFAC68;
		}
	}
	
</style>
