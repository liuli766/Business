<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.commit('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/iconfont.css";
	page{
		background-color: #F7F9FA;
	}
</style>
