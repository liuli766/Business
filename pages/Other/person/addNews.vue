<template>
	<view>
		<textarea class="color333 font28" value="" v-model="comment" placeholder="在此输入公告内容" placeholder-style='color:#999;' />
		<view class="commbtn colorfff text_cen" @tap="addNews">发布公告</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				comment:"",//公告内容
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			})
		},
		methods: {
			addNews(){ //发布公告
				let that = this;
				let params = {
					supplier_id:that.supplier_id,
					comment:that.comment,
				}
				that.request.getdata('getaddNews',params).then(res=>{
					console.log(res,'发布公告')
					uni.navigateBack({
						delta: 1
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
textarea{
	width: 690upx;
	height: 454upx;
	background: #FFFFFF;
	border-radius: 10px;
	margin: 30upx;
	padding: 30upx;
	box-sizing: border-box;
}
.commbtn{
	margin: 60upx auto;
}
</style>
