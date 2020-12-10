<template>
	<view class="comm">
		<view class="bfff activenav flex flex_ar mb30">
			<text v-for="(item,i) in activeNav" :key="i" class="font28" :class="{'active-bg':activeid===i}" @tap="handNav(i)">{{item}}</text>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===1">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in activityList" :key="i">
				<view>{{[item.act_type==1?'满减':'优惠券']}}</view>
				<view>{{item.act_name}}</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: flex-end;">
					<view class="modify">暂停</view>
					<view class="delete" @tap="handDelete(item)">删除</view>
				</view>
			</view>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===0">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in activityList" :key="i">
				<view>{{[item.act_type==1?'满减':'优惠券']}}</view>
				<view>{{item.act_name}}</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: center;">
					<view class="modify" @tap="ActiveCancle(item)">取消</view>
				</view>
			</view>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===2">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in activityList" :key="i">
				<view>{{[item.act_type==1?'满减':'优惠券']}}</view>
				<view>{{item.act_name}}</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: flex-end;">
					<view class="modify" @tap="Renew(item)" style="width: 120upx;">重新申请</view>
					<view class="delete" @tap="hanldeUpdate(item)">修改</view>
				</view>
			</view>
		</view>
		<view class="commbtn text_cen colorfff ml" @tap="addActive">添加活动</view>
		<refusepop v-if="isConcatPop" :deleteType='3'>
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">{{popval1}}</view>
				<view class="color999 font500 font26">{{popsubval1}}</view>
			</view>
		</refusepop>
		<view class="popbox" v-if="isvisible">
			<view class="popup">
				<view class="color333 font36 text_cen mt30">添加活动</view>
				<input class="inp" placeholder="活动名称" v-model="activename" placeholder-style='color:#999;font-size:26upx;' />
				<view class="flex flex-col" style="position: relative;">
					<input class="inp" placeholder="活动类型" :value="numtext" disabled="disabled" placeholder-style='color:#999;font-size:26upx;'
					 type="number" @tap="handleActiveType" />
					<view class="down_menu color333 font26 text_cen" v-if="isdown">
						<view v-for="(item,i) in activelist" :key='i' @tap="handselect(item)">{{item}}</view>
					</view>
				</view>

				<input class="inp" placeholder="金额" type="number" v-model="money" placeholder-style='color:#999;font-size:26upx;' />
				<input class="inp" placeholder="最低使用金额" v-model="min_money" placeholder-style='color:#999;font-size:26upx;' />
				<input class="inp" placeholder="时间" :value="suretime" @tap="showtime" placeholder-style='color:#999;font-size:26upx;'
				 disabled="disabled" />
				<view class="font32 font500 flex" style="margin-top: 60upx;">
					<view class="confirm color666 text_cen ml mr" @tap="handcancel">取消</view>
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
					<text>开始时间</text>
					<text>结束时间</text>
				</view>
				<view class="flex">
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in years" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in months" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in days" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
					<view class="color999" style="line-height: 300rpx;">—</view>
					<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChangeday1" style="height: 300upx;width: 47%;">
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in years" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in months" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="flex flex_al-cen flex_jus-cen" v-for="(item,index) in days" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import refusepop from '@/components/refusePop/refusePop.vue'
	import plugPop from '@/components/plugPop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			refusepop,
			plugPop
		},
		computed: {
			...mapState({
				isConcatPop: (state) => state.isConcatPop,
				ispulgPop: (state) => state.ispulgPop,
				supplier_id: (state) => state.supplier_id, //商户id
				updataId: (state) => state.updataId,
			}),
			suretime() {
				if (this.newbefortime !== "" || this.newaftertime !== "") {
					return this.newbefortime + '-' + this.newaftertime
				}

			}
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
				activeNav: ['待审核','已通过', '未通过'],
				activeid: 0,
				popval1: "",
				popsubval1: "",
				activityList: [],
				isshowtime: false, //时间弹窗
				isvisible: false,
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				newbefortime: "",
				newaftertime: "",
				value: [9999, month - 1, day - 1],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				activename: "",
				num: 1, //1=优惠券 2=满减
				money: "",
				numtext: "",
				min_money: "",
				isdown: false,
				activelist: ['优惠券', '满减'],
				actdleteid:'',
			}
		},
		onLoad() {
			this.getactivityList()
		},
		methods: {
			handNav(i) {
				this.activeid = i
				this.getactivityList()
			},
			getactivityList() { //活动管理
				let that = this;
				let params = {
					supplier_id: that.supplier_id,
					type: that.activeid 
				}
				that.request.getdata("getactivityList", params).then(res => {
					console.log(res, '活动管理')
					that.activityList = res.data
				})
			},
			bindChangeday: function(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.newbefortime =this.year + '-' + this.month+ '-'+this.day
				console.log(val,this.year)
			},
			bindChangeday1(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				this.newaftertime = this.year + '-' + this.month+ '-'+this.day
				console.log(val,this.year)
			},
			handconfirm() { //确定提交按钮
				if (this.activename == "") {
					uni.showToast({
						title: '活动名称不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.num == "") {
					uni.showToast({
						title: '活动类型不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.money == "") {
					uni.showToast({
						title: '金额不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.min_money == "") {
					uni.showToast({
						title: '最低金额不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (!this.suretime) {
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				let that = this;
				let params = {
					supplier_id: that.supplier_id,
					act_id: that.updataId?that.updataId:0,
					name: that.activename,
					type:that.num,
					money:that.money,
					min_money:that.min_money,
					add_time:that.newbefortime,
					end_time:that.newaftertime,
				}
				if (Number(this.newbefortime) < Number(this.newaftertime)) {
					that.request.getdata('getaddActivity', params).then(res => {
						console.log(res,'活动')
						that.getactivityList();
					})
					this.isvisible = false;
					this.activename='';
					this.num='';
					this.money='';
					this.min_money='';
					this.newbefortime='';
					this.newaftertime='';
				}else{
					uni.showToast({
						title: '结束时间必须晚于开始时间',
						icon: 'none',
						duration: 2000
					});
				}
			},
			hanldeUpdate(item){ //修改
				this.isvisible = true;
				let that = this;
				that.activename = item.act_name
				that.numtext = item.act_type==1?'优惠券':'满减'
				that.money=item.money
				that.min_money=item.min_money
				
				that.newbefortime=that.time.happenTimeFun(item.add_time)
				that.newaftertime=that.time.happenTimeFun(item.end_time)
				this.$store.commit('handleUpdata',item.id)
			},
			Confirmtimepop() { //设置营业时间
				if (this.newbefortime=='' || this.newaftertime=='') {
					uni.showToast({
						title: '请选择时间',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				this.isshowtime = false
			},
			handselect(item) {
				this.numtext = item
				if (item == '优惠券') {
					this.num = 1
				} else if (item == '满减') {
					this.num = 2
				}
				this.isdown = false;
			},
			handleActiveType() {
				this.isdown = true;
			},
			showtime() {
				this.isshowtime = true
			},
			handcancel() {
				this.isvisible = false
			},
			Canceltimepop() {
				this.isshowtime = false
			},
			handDelete(item) {
				this.popval1 = '确认删除'
				this.popsubval1 = '删除之后将不可恢复'
				this.$store.commit("showConcatPop", true);
				this.actdleteid=item.id
			},
			addActive() {
				// this.$store.commit("showPlugPop", true);
				this.isvisible = true
			},
			ActiveCancle(item){
				let params = {
					act_id: item.id,
				}
				this.request.getdata('getactDel', params).then(res => {
					console.log(res, '活动取消')
					setTimeout(function(){
						uni.showToast({
							title: '活动取消成功',
							icon: 'none',
							duration: 3000
						});
						
					},1000)
					this.activityList=[];
					this.getactivityList()
				})
			},
			Renew(item) {
				this.popval1 = '重新申请'
				this.popsubval1 = '是否发起重新申请?'
				this.$store.commit("showConcatPop", true);
				this.$store.commit('handleUpdata',item.id)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.activenav {
		line-height: 88upx;

		>text {
			color: #656565;
			position: relative;
		}

		.active-bg {
			font-weight: bold;
			color: #333333;
			font-size: 32upx;
			transition: all .2s;
		}

		.active-bg:after {
			content: "";
			position: absolute;
			left: 50%;
			bottom: 0upx;
			width: 50upx;
			border-radius: 3px;
			padding: 6upx;
			background: #5E82FF;
			margin-left: -27upx;
		}
	}

	.modify1 {
		width: 120upx;
	}

	.class-box-item {
		>view {
			width: 33.3%;
		}
	}

	.popbox {
		background: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		transition: all .2s;

		.popup {
			position: absolute;
			top: 32%;
			left: 50%;
			margin-left: -280upx;
			margin-top: -426upx;
			width: 560upx;
			height: 856upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;

			.poptitle {
				margin: 60upx 0 38upx 0;
			}

			input {
				text-align: left;
			}

			.confirm {
				width: 200upx;
				line-height: 80upx;
				border: 1px solid #EEEEEE;
				border-radius: 10upx;

			}

			.cancel {
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 10upx;
				border: none;
			}
		}
	}

	.sfm-time {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 496upx;
		background: #fff;
		padding: 30upx;
		box-sizing: border-box;
	}

	.down_menu {
		width: 300upx;
		height: 120upx;
		background: #fff;
		border-radius: 10upx;
		position: absolute;
		top: 124upx;
		left: 30upx;
		z-index: 9;

		>view {
			line-height: 54upx;
		}
	}
</style>
