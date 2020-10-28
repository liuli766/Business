<template>
	<view class="comm">
		<view class="bfff activenav flex flex_ar mb30">
			<text v-for="(item,i) in activeNav" :key="i" class="font28" :class="{'active-bg':activeid===i}" @tap="handNav(i)">{{item}}</text>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===0">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in 3" :key="i">
				<view>满减</view>
				<view>满100减40</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: flex-end;">
					<view class="modify">暂停</view>
					<view class="delete" @tap="handDelete">删除</view>
				</view>
			</view>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===1">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in 3" :key="i">
				<view>满减</view>
				<view>满100减40</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: center;">
					<view class="modify">取消</view>
				</view>
			</view>
		</view>
		<view class="class-box font28 color333 bfff" v-if="activeid===2">
			<view class="flex class-box-tit flex_be">
				<view>活动类型</view>
				<view>活动名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in 3" :key="i">
				<view>满减</view>
				<view>满100减40</view>
				<view class="font24 colorfff flex text_cen" style="justify-content: flex-end;">
					<view class="modify" @tap="Renew" style="width: 120upx;">重新申请</view>
					<view class="delete">修改</view>
				</view>
			</view>
		</view>
		<view class="commbtn text_cen colorfff ml" @tap="addActive">添加活动</view>
		<refusepop v-if="isConcatPop">
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">{{popval1}}</view>
				<view class="color999 font500 font26">{{popsubval1}}</view>
			</view>
		</refusepop>
		<plug-pop v-if="ispulgPop">
			<view class="poptitle bold color333 font36" slot="fenlei">添加活动</view>
			<view slot='comminp'>
				<input class="inp" placeholder="活动类型" placeholder-style='color:#999;font-size:26upx;text-align: left;' />
				<input class="inp" placeholder="活动名称" placeholder-style='color:#999;font-size:26upx; text-align: left;' />
			</view>
		</plug-pop>
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
				ispulgPop: (state) => state.ispulgPop
			}),
		},

		data() {
			return {
				activeNav: ['已通过', '待审核', '未通过'],
				activeid: 0,
				popval1:'',
				popsubval1:'',
			}
		},
		methods: {
			handNav(i) {
				this.activeid = i
			},
			handDelete() {
				this.popval1='确认删除'
				this.popsubval1='删除之后将不可恢复'
				this.$store.commit("showConcatPop", true);
			},
			addActive() {
				this.$store.commit("showPlugPop", true);
			},
			Renew(){
				this.popval1='重新申请'
				this.popsubval1='是否发起重新申请?'
				this.$store.commit("showConcatPop", true);
			}
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
	.modify1{
		width: 120upx;
	}
	.class-box-item {
		>view {
			width: 33.3%;
		}
	}

</style>
