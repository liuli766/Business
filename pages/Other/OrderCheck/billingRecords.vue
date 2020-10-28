<template>
	<!-- 账单记录 -->
	<view class="billings comm">
		<view class="flex flex_ar billings-nav mb30">
			<view class="color666 font500 font32 tabnav" v-for="(item,i) in billingNav" :key='i' @tap="handNavSweich(i,$event)"
			 :class="{'nav-active':navIndex===i}">{{item}}</view>
			<view class="line" :style="{left:indicatorLineLeft + 'rpx'}"></view>
		</view>
		<view class="font500" v-if="navIndex===0">
			<view class="flex bfff year_bill flex_be" @tap="popYear">
				<view class="font26 color666">指定年份查看账单</view>
				<view class="font28 color333">{{newyear}}年</view>
			</view>
			<view class="billings-list flex_be flex">
				<view class="flex flex-col">
					<text class="color333 font30">订单配送：瑞幸咖啡</text>
					<text class="color999 font24 billing-time">2020-09-18</text>
				</view>
				<view class="billing-price font28"><text>+</text>￥8.00</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计收入：<text class="billing-total-price font36">478.50</text>元
			</view>
		</view>
		<view class="font500" v-if="navIndex===1">
			<view class="flex bfff year_bill flex_be" @tap="popMonth">
				<view class="font26 color666">指定月份查看账单</view>
				<view class="font28 color333">{{newyear}}年{{newmonth}}月</view>
			</view>
			<view class="billings-list flex_be flex">
				<view class="flex flex-col">
					<text class="color333 font30">订单配送：瑞幸咖啡</text>
					<text class="color999 font24 billing-time">2020-09-18</text>
				</view>
				<view class="billing-price font28"><text>+</text>￥8.00</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计收入：<text class="billing-total-price font36">478.50</text>元
			</view>
		</view>
		<view class="font500" v-if="navIndex===2">
			<view class="flex bfff year_bill flex_be" @tap="popDay">
				<view class="font26 color666">指定某天查看账单</view>
				<view class="font28 color333">{{newyear}}年{{newmonth}}月{{newday}}日</view>
			</view>
			<view class="billings-list flex_be flex">
				<view class="flex flex-col">
					<text class="color333 font30">订单配送：瑞幸咖啡</text>
					<text class="color999 font24 billing-time">2020-09-18</text>
				</view>
				<view class="billing-price font28"><text>+</text>￥8.00</view>
			</view>
			<view class="font28 color666 mt30 mb30 billing-bot">
				累计收入：<text class="billing-total-price font36">478.50</text>元
			</view>
		</view>
		<!-- 年份选择 -->
		<view class="year_pop" v-if="isPopYear">
			<view class="pop">
				<view class="uni-list">
					<view class="year_tit font36 color333 text_cen bold">
						年份选择
					</view>
					<view class="text_cen">
						<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 355rpx;">
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in years" :key="index">{{item}}年</view>
							</picker-view-column>
						</picker-view>
					</view>
					<view class="font32 flex">
						<view class="color666 cancel text_cen" @tap="closePopYear">取消</view>
						<view class="colorfff pop-sure text_cen" @tap="surePopYear">确认提交</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 月份选择 -->
		<view class="year_pop" v-if="isPopMonth">
			<view class="pop">
				<view class="uni-list">
					<view class="year_tit font36 color333 text_cen bold">
						月份选择
					</view>
					<view class="text_cen">
						<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 355rpx;">
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in years" :key="index">{{item}}年</view>
							</picker-view-column>
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in months" :key="index">{{item}}月</view>
							</picker-view-column>
						</picker-view>
					</view>
					<view class="font32 flex">
						<view class="color666 cancel text_cen" @tap="closePopMouth">取消</view>
						<view class="colorfff pop-sure text_cen" @tap="surePopMouth">确认提交</view>
					</view>
				</view>
			</view>
		</view>
		<!--日分选择 -->
		<view class="year_pop" v-if="isPopDay">
			<view class="pop">
				<view class="uni-list">
					<view class="year_tit font36 color333 text_cen bold">
						月份选择
					</view>
					<view class="text_cen">
						<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 355rpx;">
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in years" :key="index">{{item}}年</view>
							</picker-view-column>
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in months" :key="index">{{item}}月</view>
							</picker-view-column>
							<picker-view-column>
								<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in days" :key="index">{{item}}日</view>
							</picker-view-column>
						</picker-view>
					</view>
					<view class="font32 flex">
						<view class="color666 cancel text_cen" @tap="closePopDay">取消</view>
						<view class="colorfff pop-sure text_cen" @tap="surePopDay">确认提交</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				billingNav: ['年账单', '月账单', '日账单'],
				navIndex: 0,
				indicatorLineLeft: 100,
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				isPopYear: false,
				newyear: year,
				newmonth: month,
				isPopMonth: false,
				isPopDay:false,
				newday:day,
			}
		},
		computed: {

		},
		methods: {
			handNavSweich(i, e) {
				this.navIndex = i
				var offsetX = e.currentTarget.offsetLeft
				var pageX = e.detail.x
				this.indicatorLineLeft = offsetX + pageX
			},
			popYear() {
				this.isPopYear = true
			},
			closePopYear() {
				this.isPopYear = false
			},
			surePopYear() {
				this.newyear = this.year
				this.isPopYear = false
			},
			popMonth() {
				this.isPopMonth = true
			},
			closePopMouth() {
				this.isPopMonth = false
			},
			surePopMouth() {
				this.newyear = this.year
				this.newmonth = this.month
				this.isPopMonth = false
			},
			popDay(){
				this.isPopDay = true
			},
			closePopDay(){
				this.isPopDay = false
			},
			surePopDay(){
				this.newyear = this.year
				this.newmonth = this.month
				this.newday = this.day
				this.isPopDay = false
			},
			bindChangeday: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				console.log(this.day, val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.billings {
		.nav-active {
			color: #333;
			font-weight: bold;
		}

		.billings-nav {
			background: #FFFFFF;

			.tabnav {
				height: 88upx;
				line-height: 88upx;
				position: relative;
			}

			.line {
				width: 50upx;
				height: 6upx;
				background: #5D82FF;
				border-radius: 3upx;
				position: absolute;
				top: 82upx;
				left: 162upx;
				transition: all .2s;
			}
		}

		.year_bill {
			line-height: 80upx;
			padding: 0 30upx;
			margin-bottom: 10upx;
		}

		.billings-list {
			background: #FFFFFF;
			padding: 30upx;
			border-bottom: 1px solid #eee;

			.billing-price {
				color: #FF6868;
			}

			.billing-time {
				margin-top: 23upx;
			}
		}

		.billings-list:nth-last-of-type(1) {
			border: none;
		}

		.billing-total-price {
			color: #FFAC68;
		}

		.billing-bot {
			line-height: 88upx;
			background: #fff;
			padding-right: 30upx;
			text-align: right;
			position: fixed;
			width: 100%;
			bottom: -30rpx;
			box-sizing: border-box;
		}

		.year_pop {
			background: rgba(0, 0, 0, .3);
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			overflow: hidden;
			transition: all .2s;

			.pop {
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -280upx;
				margin-top: -322upx;
				width: 560upx;
				height: 644upx;
				background: #FFFFFF;
				border-radius: 20upx;
			}

			.year_tit {
				margin: 60upx 0 40upx 0;
			}

			.item_year {
				line-height: 50rpx;
			}

			.cancel {
				width: 200upx;
				line-height: 80upx;
				border: 1upx solid #CCCCCC;
				box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
				border-radius: 10upx;
				margin: 0 20upx 0 30upx;
			}

			.pop-sure {
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
				border-radius: 10upx;
			}
		}
	}
</style>
