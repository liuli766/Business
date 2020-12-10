<template>
	<view>
		<view class="year_pop" v-if="isPopYear">
			<view class="pop">
				<view class="uni-list">
					<view class="year_tit font36 color333 text_cen bold">
						年份选择
					</view>
					<view class="text_cen">
						<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" style="height: 355rpx;">
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
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		computed: {
			...mapState({
				isPopYear: (state) => state.isPopYear,
			}),
		},
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
				newyear: year,
				newmonth: month,
				isPopMonth:false,
			};
		},
		onLoad() {
			this.$store.commit("NewYear",this.year);
		},
		methods:{
			
			closePopYear() {
				this.$store.commit('ShowPopYear',false)
			},
			surePopYear() {
				this.newyear = this.year
				this.$store.commit('ShowPopYear',false)
			},
			bindChange: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				console.log(this.year, val)
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				border: 1px solid #CCCCCC;
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
</style>
