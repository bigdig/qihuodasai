<template>
	<div id="account_certification">
		<div class="account_certification_top">
			<p><span>提示：</span>认证年龄需满<span>18</span>周岁，不建议<span>60</span>岁以上的用户交易</p>
		</div>
		<div class="account_certification_center">
			<p><label>姓名：</label><input type="text" v-model="realName" /></p>
			<p><label>身份证号码：</label><input type="text" v-model="IDcard" class="IDcard" maxlength="18"/></p>
			<button class="btn yellow" v-on:click="toCertification">确认</button>
		</div>
		<div class="account_certification_btm">
			<p>实名认证相关</p>
			<ul>
				<li>实名认证遇到问题怎么办？</li>
				<li>答：实名认证因涉及到账户提现安全，最好认证本人身份信息，认证信息错误三次以上需要后台人工审核才可继续认证。</li>
			</ul>
			<p>投资有风险，入市需谨慎</p>
		</div>
	</div>
</template>

<script>
	import pro from "../../../assets/js/common.js"
	export default {
		name : "safe_certification",
		data(){
			return{
				realName : '',
				IDcard : ''
			}
		},
		methods: {
			toCertification :function(){
				var cardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				var realName = this.realName;
				var IDcard = this.IDcard;
				var headers = {
					token : JSON.parse(localStorage.user).token,
					secret : JSON.parse(localStorage.user).secret
				}
				var data = {
					name:this.realName,
					card:this.IDcard
				}
				if(this.realName == ''){
					layer.msg('请输入姓名', {time: 1000});
				}else if(typeof(this.realName)!='string'){
					layer.msg('请输入正确姓名',{time:1000})
				}else if(this.IDcard == ''){
					layer.msg('请输入身份证号码', {time: 1000});
				}else if(this.IDcard.length<18){
					layer.msg('请输入18位身份证号码', {time: 1000});
				}else if(cardReg.test(this.IDcard)==false){
					layer.msg('请输入正确的身份证号码', {time: 2000});
				}else {
					pro.fetch("post",'/user/security/validatecard',data,headers).then(function(res){
						if(res.success == true){
							if(res.code == 1){
								layer.msg('认证成功',{time:1000});
								this.$router.push({path:'/account_safe'});
							}
						}
					}.bind(this)).catch(function(err){
						if(err.data.success == false){
							switch (err.data.code){
								case '-1':
									layer.msg("认证失败",{time:2000});
									break;
								case '2':
									layer.msg("实名认证失败",{time:2000});
									break;
								case '3':
									layer.msg("身份证号格式有误",{time:2000});
									break;
								case '4':
									layer.msg("该身份证已经被认证过",{time:2000});
									break;
								case '8':
									layer.msg("您已经超过认证失败最高次数限制了",{time:2000});
									break;
								default:
									break;
							}
						}else{
							layer.msg('网络超时，请稍后再试',{time:1000});
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped type="text/css">
	@import "../../../assets/css/common.scss";
	.account_certification_top {
		width: 100%;
			p {
				width :100%;
				text-indent: 10px;
				height :40px;
				line-height : 40px;
				background-color:$bottom_color;
				span {
					color : $white;
					padding : 0 5px 0 5px;
				}
			}
		}
		.account_certification_center {
			width: 100%;
			height: 190px;
			text-align: center;
			background-color: $blue;
			p{
				width: 320px;
				margin: 0 auto;
				padding-top: 20px;
				overflow: hidden;
			}
			label{
				float: left;
				display: inline-block;
				width: 100px;
				height: 30px;
				line-height: 30px;
				text-align: right;
			}
			input {
				float: left;
				width: 160px;
				height: 30px;
				border: 1px solid $bottom_color;
				border-radius: 5px;	
				padding: 0 5px;
				color:$white;
				&:hover {
					border: 1px solid $yellow;
				}
			}
			.btn {
				margin-left: 40px;
				width : 160px;
				height : 30px;
				margin-top: 20px;
			}
		}
		.account_certification_btm {
			width: 100%;
			p {
				&:nth-child(1){
					width: 100%;
					height: 40px;
					background-color: $bottom_color;
					line-height: 40px;
					margin-top: 10px;
				}
				&:nth-child(3){
					width: 100%;
					height: 40px;
					line-height: 40px;
					margin-top: 10px;
					background-color: $blue;
					text-align: center;
					font-size: $fs12;
					background-color: $bottom_color;
				}
			}
			ul {
				height: 80px;
				width: 100%;
				background-color: $blue;
			}
			li {
				padding-top:20px; 
				&:nth-child(2) {
					color: $white;
					font-size: $fs12;
				}
			}
		}
		.IDcard {
			margin-right: 44px;
		}
</style>