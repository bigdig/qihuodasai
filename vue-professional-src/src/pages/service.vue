<template>
	<div id="service">
		<topbar title="在线客服"></topbar>
		<back></back>
		<iframe :src="iframe"></iframe>
	</div>
</template>

<script>
	import topbar from '../components/Topbar.vue'
	import back from '../components/back.vue'
	export default{
		name:'service',
		//组件
		components:{
			topbar,
			back
		},
		computed: {
			userInfo: function(){
				return this.$store.state.account;
			},
			PATH: function(){
				return this.$store.getters.PATH;
			},
			iframe: function() {
				// return  /*this.PATH + */'http://www.vs.com/topic/consistentBeauty/qiw_quoteApp_service.html?phone=' + this.$store.state.account.phone + '&userName=' + this.$store.state.account.username;
				return 'http://www.vs.com/topic/consistentBeauty/qiw_quoteApp_service.html?phone=' + 18200295561 + '&userName=' + 'kelle'
			},
		},
		methods: {},
		activated() {
			
		},
	}
</script>
<style scoped lang="less">
	iframe {
		width: 100%; height: 100%; position: fixed; bottom: 0;
	}
</style>