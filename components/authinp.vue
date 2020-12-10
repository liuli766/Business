<template>
	<view class="personinput comm">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="mb30 flex person-nav">
			<view class="iconfont icon-iconfont-left font50" @tap="handback" style="color: #333333 !important;"></view>
			<view class="nickname">{{userinfoList.name}}</view>
		</view>
		<view class="person-input mt30 flex flex_al-cen font500 font30 color666">
			<input type="number" v-if="this.userinfoList.name=='手机登录号'||(this.userinfoList.name=='联系电话')" :value="userinfoList.placeholder" @input="GetVal" :focus='true' @focus="GetVal" />
			<input type="text" v-else :value="userinfoList.placeholder" @input="GetVal" :focus='true' @focus="GetVal" />
			
			<text class="keep" @tap="handKeep(userinfoList)">保存</text>
		</view>

	</view>

</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {

		props: {
			userinfoList: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		data() {
			return {
				show: false,
			}
		},
		onLoad() {
			
		},
		computed: {
			...mapState({
				iscomminput: (state) => state.iscomminput,
			}),
		},
		methods: {
			GetVal(e) {
				console.log(this.idNum,this.IdCard)
				let val = e.detail.value
				this.userinfoList.placeholder = val
			},
			handback() {
				this.$store.commit("Showcomminput", false);
			},
			handKeep(item) {
				if (item.placeholder == "") {
					uni.showToast({
						title: '不能为空',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				if (this.userinfoList.name=='手机登录号'||(this.userinfoList.name=='联系电话') && (!/^1[34578]\d{9}$/.test(item.placeholder.trim()))) {
					uni.showToast({
						title: '手机格式不正确',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				if (this.userinfoList.name=='身份证号码' && (!
						/^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(item.placeholder))) {
					uni.showToast({
						title: '身份证格式不正确',
						icon: 'none',
						duration: 2000
					});
					return false;
				}
				this.$emit('handKeep', item.placeholder);
				this.$store.commit("Showcomminput", false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comm {
		background-color: #F7F9FA;
		height: 100%;
		position: absolute;
		width: 100%;
		overflow: auto;
		z-index: 9;
		top: 0;
		transition: all .2s;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		height: 88upx;
		background: #fff;
	}

	.nickname {
		margin-left: 240upx;
	}

	input {
		flex: 1;
	}

	.person-nav {
		padding-left: 10upx;
		background: #fff;
		padding-bottom: 27upx;
		box-sizing: border-box;
		height: 100rpx;
		padding-top: 30rpx;
	}

	.person-input {
		height: 88upx;
		padding: 30upx 32upx;
		background: #fff;
		box-sizing: border-box;

		.keep {
			padding-left: 21upx;
			border-left: 1px solid #EEEEEE;
		}
	}
	.icon-iconfont-left:before{
		   color: #333 !important;
	}
</style>
