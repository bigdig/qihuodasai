<template>
	<div id="ifalert" v-if="isshow">
		<alert title="提示" :line1="tipsAlert" :objstr="sendMsg" ref="alert"></alert>
		<tipsDialog :msg="msgTips" ref="dialog"></tipsDialog>
		<div class="ifalert_box">
			<ul class="selectbar">
				<li class="fontgray fl" :class="{selected: ifshow}" @tap="selection">价格条件</li>
				<li class="fontgray fl" :class="{selected: !ifshow}" @tap="selection">时间条件</li>
			</ul>
			<ul class="content">
				<template v-if="ifshow">
					<li>
						<ol>
							<li class="fontgray">合约</li>
							<li>
								<select name="contract" class="selectlong fontwhite" v-model="selectId">
									<option v-for="v in parameters" :value="v.CommodityNo+v.MainContract">{{v.CommodityName}}</option>
								</select>
							</li>
							<li>
								<span class="fontgray">最新：</span>
								<span class="white">{{lastPrice | toFixed(dosize)}}</span>
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">价格</li>
							<li>
								<select class="fontwhite selectshort" v-model="selectPrice">
									<option value="0">&nbsp;&nbsp;></option>
									<option value="2">&nbsp;&nbsp;>=</option>
									<option value="1">&nbsp;&nbsp;<</option>
									<option value="3">&nbsp;&nbsp;<=</option>
								</select>
								<input type="text" v-model="inputPrice" class="fontwhite" />
							</li>
							<li>
								<select class="fontwhite selectshort" v-model="selectAdditionalPrice">
									<option value="5">附加</option>
									<option value="0">></option>
									<option value="2">>=</option>
									<option value="1"><</option>
									<option value="3"><=</option>
								</select>
								<input type="text" class="additionalPrice" disabled="disabled" v-model="inputAdditionalPrice" />
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">操作</li>
							<li>
								<select class="fontwhite  selectshort" v-model="selectBuyOrSell">
									<option value="0">&nbsp;&nbsp;买</option>
									<option value="1">&nbsp;&nbsp;卖</option>
								</select>
								<select class="fontwhite selectshort" v-model="selectMarketOrLimited">
									<option value="1">市价</option>
									<option value="2">对手价</option>
								</select>
								<select class="fontwhite selectshort" v-model="OpenCloseType">
									<option value="1">开仓</option>
									<option value="2">平仓</option>
									<option value="3">平今</option>
								</select>
							</li>
							<li>
								<span class="fontgray lot">手数</span>
								<input type="number"  v-model="holdNum" class="fontwhite ipt30" />
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">有效</li>
							<li class="fontwhite today">永久有效</li>
						</ol>
					</li>
				</template>
				<template v-else="ifshow">
					<li>
						<ol>
							<li class="fontgray">合约</li>
							<li>
								<select name="contract" class="selectlong fontwhite" v-model="selectTimeId">
									<option v-for="v in parameters" :value="v.CommodityNo+v.MainContract">{{v.CommodityName}}</option>
								</select>
							</li>
							<li>
								<span class="fontgray">最新：</span>
								<span class="white">{{lastPrice | toFixed(dosize)}}</span>
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">时间</li>
							<li class="li_time">
								<input type="text" class="show_time" v-model="showTime" />
								<input type="time" class="time" v-model="time" placeholder="显示时间" />
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">
								价格
							</li>
							<li>
								<select class="fontwhite selectshort" v-model="additionValue">
									<option value="5">附加</option>
									<option value="0">></option>
									<option value="2">>=</option>
									<option value="1"><</option>
									<option value="3"><=</option>
								</select>
								<input type="text" class="additionalTime" disabled="disabled" v-model="timeAddtionPrice" />
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">操作</li>
							<li>
								<select class="fontwhite  selectshort" v-model="timeBuyOrSell">
									<option value="0">&nbsp;&nbsp;买</option>
									<option value="1">&nbsp;&nbsp;卖</option>
								</select>
								<select class="fontwhite selectshort" v-model="timeOrderType">
									<option value="1">市价</option>
									<option value="2">对手价</option>
								</select>
								<select class="fontwhite selectshort" v-model="OpenCloseType">
									<option value="1">开仓</option>
									<option value="2">平仓</option>
									<option value="3">平今</option>
								</select>
								<span class="fontgray lot">手数</span>
							</li>
							<li>
								<input type="text" v-model="timeHoldNum" class="fontwhite ipt30" />
							</li>
						</ol>
					</li>
					<li>
						<ol>
							<li class="fontgray">有效</li>
							<li class="fontwhite today">
								永久有效
							</li>
						</ol>
					</li>
				</template>
				
				<li class="do">
					<div class="fontgray" @tap="close">关闭</div>
					<div class="fontgray" @tap='confirm'>添加</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import tipsDialog from './tipsDialog.vue'
	import alert from './Tradealert.vue'
	export default {
		name: 'ifalert',
		data(){
			return {
				ifshow:true,
				isshow:false,
				selectId:'',
				selectPrice:'',
				commodityNo:'',
				contractNo:'',
				selectPrice:'',
				selectAdditionalPrice:'',
				inputPrice:'',
				inputAdditionalPrice:'',
				selectBuyOrSell:'',
				selectMarketOrLimited:'',
				holdNum:1,
				additionFlag:false,
				addtionPrice:'',
				lastPrice: '0.00',
				
				timeAddtionPrice:'',
				timeAddtionPrice00:'',
				time:'',
				showTime: '',
				timeAdditionFlag:false,
				timeHoldNum:1,
				commodityNo00:'',
				contractNo00:'',
				selectTimeId:'',
				timeOrderType:1,
				timeBuyOrSell:0,
				additionValue:'',
				tipsMsg: '',
				str: '',
				msg: '',
				moneyReg: /^(([1-9]\d*)|0)(\.\d*)?$/,
				OpenCloseType:''
			}
		},
		components: {alert, tipsDialog},
		computed:{
			parameters(){
				return this.$store.state.market.Parameters;
			},
			orderTemplist(){
				return	this.$store.state.market.orderTemplist;
			},
			templateList(){
				return this.$store.state.market.templateList;
			},
			tradeSocket() {
				return this.$store.state.tradeSocket;
			},
			tipsAlert: function(){
				return this.tipsMsg;
			},
			msgTips: function(){
				return this.msg;
			},
			sendMsg: function(){
				if(this.str) return JSON.stringify(this.str);
			},
			miniTikeSize(){
				return this.orderTemplist[this.commodityNo].MiniTikeSize;
			},
			dosize(){
				if(this.ifshow == true){
					return this.orderTemplist[this.commodityNo].DotSize;
				}else{
					return this.orderTemplist[this.commodityNo00].DotSize;
				}
			}
		},
		filters:{
			toFixed: function(value, dotSize){
				if (!value) return '';
				return parseFloat(value).toFixed(dotSize);
			}
		},
		watch:{
			parameters:function(n,o){
				if(this.ifshow == true){
					if(this.commodityNo != undefined){
						n.forEach(function(e,i){
							if(this.commodityNo == e.CommodityNo){
								this.lastPrice = this.orderTemplist[this.commodityNo].LastQuotation.LastPrice;
							}
						}.bind(this));
					}
				}else{
					if(this.commodityNo00 != undefined){
						n.forEach(function(e,i){
							if(this.commodityNo00 == e.CommodityNo){
								this.lastPrice = this.orderTemplist[this.commodityNo00].LastQuotation.LastPrice;
							}
						}.bind(this));
					}
				}
			},
			inputPrice: function(n, o){
				if(n != undefined){
					if(n == ''){
						return true;
					}else if(this.moneyReg.test(n) == false){
						this.inputPrice = parseFloat(this.templateList[this.commodityNo].LastPrice).toFixed(this.orderTemplist[this.commodityNo].DotSize);
					}
				}
			},
			inputAdditionalPrice: function(n, o){
				if(n != undefined && this.moneyReg.test(n) == false){
					this.inputAdditionalPrice = '';
				}
			},
			timeAddtionPrice: function(n, o){
				if(n != undefined && this.moneyReg.test(n) == false){
					this.timeAddtionPrice = '';
				}
			},
			selectId:function(n,o){
				if(n != undefined){
					this.commodityNo = n.substring(0,n.length-4);
					this.contractNo = n.substring(n.length-4,n.length);
					this.inputPrice =  parseFloat(this.templateList[this.commodityNo].LastPrice).toFixed(this.orderTemplist[this.commodityNo].DotSize);
				}
			},
			selectTimeId:function(n,o){
				if(n != undefined){
//					this.commodityNo = n.substring(0,n.length-4);
					this.commodityNo00 = n.substring(0,n.length-4);
					this.contractNo00 = n.substring(n.length-4,n.length);
//					this.timeAddtionPrice =  parseFloat(this.templateList[this.commodityNo00].LastPrice).toFixed(this.orderTemplist[this.commodityNo00].DotSize);
					this.timeAddtionPrice00 =  parseFloat(this.templateList[this.commodityNo00].LastPrice).toFixed(this.orderTemplist[this.commodityNo00].DotSize);
				}
			},
			selectAdditionalPrice:function(n,o){
				if(this.selectAdditionalPrice == 5){
					 this.inputAdditionalPrice = '';
					 this.additionFlag = false;
					 $(".additionalPrice").attr("disabled","disabled");
				}else{
					this.inputAdditionalPrice = this.inputPrice;
					this.additionFlag = true;
					$(".additionalPrice").removeAttr("disabled");
				}
			},
			additionValue:function(n,o){
				if(this.additionValue==5){
					this.timeAddtionPrice='';
					this.timeAdditionFlag = false;
					$(".additionalTime").attr("disabled","disabled");
				}else{
					this.timeAddtionPrice = this.timeAddtionPrice00;
					this.timeAdditionFlag = true;
					$(".additionalTime").removeAttr("disabled");
				}
			},
			time: function(n, o){
				var date = new Date();
				var second = date.getSeconds().toString().length > 1 ? date.getSeconds().toString() : '0' + date.getSeconds().toString();
				this.showTime = n + ':' + second;
			}
		},
		methods:{
			selection:function(e){
				if(e.target.innerHTML == '价格条件'){
					this.ifshow=true;
					this.selectAdditionalPrice = 5;
				}else{
					this.ifshow=false;
					this.additionValue = 5;
				}
			},
			close: function() {
				this.isshow = false;
			},
			confirm: function() {
				function getNowFormatDate() {
				    let date = new Date();
				    let seperator1 = "-";
				    let month = date.getMonth() + 1;
				    let strDate = date.getDate();
				    if (month >= 1 && month <= 9) {
				        month = "0" + month;
				    }
				    if (strDate >= 0 && strDate <= 9) {
				        strDate = "0" + strDate;
				    }
				    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
				    return currentdate;
				}
				let dateTime= getNowFormatDate()+' '+this.time+':'+new Date().getSeconds();
				if(this.ifshow == true){
					if(this.inputAdditionalPrice){
						var d1 = this.inputAdditionalPrice % this.miniTikeSize;
						if(d1 >= 0.000000001 && parseFloat(this.miniTikeSize-d1) >= 0.0000000001){
							this.$refs.dialog.isShow = true;
							this.msg = '输入附加价格不符合最小变动价，最小变动价为：' + this.miniTikeSize;
							return;
						}
					}
					//判断价格与附加价格是否形成区间
					switch (this.selectPrice){
						case 0:
							if(this.selectAdditionalPrice == 0 || this.selectAdditionalPrice == 2 || this.inputAdditionalPrice && this.inputAdditionalPrice <= this.inputPrice){
								this.$refs.dialog.isShow = true;
								this.msg = '附加条件添加错误';
								return;
							}
							break;
						case 2:
							if(this.selectAdditionalPrice == 0 || this.selectAdditionalPrice == 2 || this.inputAdditionalPrice && this.inputAdditionalPrice <= this.inputPrice){
								this.$refs.dialog.isShow = true;
								this.msg = '附加条件添加错误';
								return;
							}
							break;
						case 1:
							if(this.selectAdditionalPrice == 1 || this.selectAdditionalPrice == 3 || this.inputAdditionalPrice && this.inputAdditionalPrice >= this.inputPrice){
								this.$refs.dialog.isShow = true;
								this.msg = '附加条件添加错误';
								return;
							}
							break;
						case 3:
							if(this.selectAdditionalPrice == 1 || this.selectAdditionalPrice == 3 || this.inputAdditionalPrice && this.inputAdditionalPrice >= this.inputPrice){
								this.$refs.dialog.isShow = true;
								this.msg = '附加条件添加错误';
								return;
							}
							break;
						default:
							break;
					}
					var d0 = this.inputPrice%this.miniTikeSize;
					if(this.inputPrice == '' || this.inputPrice <= 0 || this.inputPrice == undefined){
						this.$refs.dialog.isShow = true;
						this.msg = '请输入价格';
					}else if(d0 >= 0.000000001 && parseFloat(this.miniTikeSize-d0) >= 0.0000000001){
						this.$refs.dialog.isShow = true;
						this.msg = '输入价格不符合最小变动价，最小变动价为：' + this.miniTikeSize;
					}else if(this.holdNum == '' || this.holdNum <= 0 || this.holdNum == undefined){
						this.$refs.dialog.isShow = true;
						this.msg = '请输入手数';
					}else{
						this.$refs.alert.isshow = true;
						this.tipsMsg = '是否添加价格条件单？';
						let b={
							"Method":'InsertCondition',
							"Parameters":{
								'ExchangeNo':this.templateList[this.commodityNo].ExchangeNo,
								'CommodityNo':this.commodityNo,
								'ContractNo':this.contractNo,
								'Num':parseInt(this.holdNum),
								'ConditionType':0,
								'PriceTriggerPonit':parseFloat(this.inputPrice),
								'CompareType':parseInt(this.selectPrice),
								'TimeTriggerPoint':'',
								'AB_BuyPoint':0.0,
								'AB_SellPoint':0.0,
								'OrderType':parseInt(this.selectMarketOrLimited),
								'Drection':parseInt(this.selectBuyOrSell),
								'StopLossType':5,
								'StopLossDiff':0.0,
								'StopWinDiff':0.0,
								'AdditionFlag':this.additionFlag,
								'AdditionType':parseInt(this.selectAdditionalPrice),
								'AdditionPrice':(function(){
													if(this.inputAdditionalPrice==''){
														return  0;
													}else{
														return parseFloat(this.inputAdditionalPrice);
													}
												}.bind(this))(),
								'OpenCloseType':parseInt(this.OpenCloseType)
							}
						};
	//					this.tradeSocket.send(JSON.stringify(b));
						this.str = b;
					}
				}else{
					if(this.timeAddtionPrice){
						var d2 = this.timeAddtionPrice % this.miniTikeSize;
						if(d2 >= 0.000000001 && parseFloat(this.miniTikeSize-d2) >= 0.0000000001){
							this.$refs.dialog.isShow = true;
							this.msg = '输入附加价格不符合最小变动价，最小变动价为：' + this.miniTikeSize;
							return;
						}
					}
					if(this.timeHoldNum == '' || this.timeHoldNum <= 0 || this.timeHoldNum == undefined){
						this.$refs.dialog.isShow = true;
						this.msg = '请输入手数';
						return;
					}
					this.$refs.alert.isshow = true;
					this.tipsMsg = '是否添加时间条件单？';
					let b={
						"Method":'InsertCondition',
						"Parameters":{
							'ExchangeNo':this.templateList[this.commodityNo00].ExchangeNo,
							'CommodityNo':this.commodityNo00,
							'ContractNo':this.contractNo00,
							'Num':parseInt(this.timeHoldNum),
							'ConditionType':1,
							'PriceTriggerPonit':0.0,
							'CompareType':5,
							'TimeTriggerPoint':dateTime,
							'AB_BuyPoint':0.0,
							'AB_SellPoint':0.0,
							'OrderType':parseInt(this.timeOrderType),
							'Drection':parseInt(this.timeBuyOrSell),
							'StopLossType':5,
							'StopLossDiff':0.0,
							'StopWinDiff':0.0,
							'AdditionFlag':this.timeAdditionFlag,
							'AdditionType':parseInt(this.additionValue),
							'AdditionPrice':(function(){
												if(this.timeAddtionPrice==''){
													return  0;
												}else{
													return parseFloat(this.timeAddtionPrice);
												}
											}.bind(this))(),
							'OpenCloseType':parseInt(this.OpenCloseType)
						}
					};
//					this.tradeSocket.send(JSON.stringify(b));	
					this.str = b;
				}
			}
		},
		mounted:function(){
			//获取当前时间
			var date = new Date();
			var hour = date.getHours().toString().length > 1 ? date.getHours().toString() : '0' + date.getHours().toString();
			var minutes = date.getMinutes().toString().length > 1 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
			var second = date.getSeconds().toString().length > 1 ? date.getSeconds().toString() : '0' + date.getSeconds().toString();
			this.showTime = hour + ':' + minutes + ':' + second;
			
			this.selectPrice = 0;
			let arr=[];
			arr = this.parameters;
			this.selectId=arr[0].CommodityNo+arr[0].MainContract;
			this.commodityNo = arr[0].CommodityNo;
			this.contractNo = arr[0].MainContract;
			this.inputPrice =  parseFloat(this.templateList[this.commodityNo].LastPrice).toFixed(this.orderTemplist[this.commodityNo].DotSize);
			this.selectAdditionalPrice = 5;
			this.inputAdditionalPrice = this.inputPrice;
			
			this.selectBuyOrSell = 0;
			this.selectMarketOrLimited=1;
			this.OpenCloseType = 1;
			
			//-------------------时间条件------------------------
			this.additionValue = 5;
			
			let arr00=[];
			arr00 = this.parameters;
			this.selectTimeId=arr00[0].CommodityNo+arr00[0].MainContract;
			this.commodityNo00 = arr00[0].CommodityNo;
			this.contractNo00 = arr00[0].MainContract;
			this.addtionPrice = parseFloat(this.templateList[this.commodityNo00].LastPrice).toFixed(this.orderTemplist[this.commodityNo00].DotSize);
			
		}
	}
</script>

<style scoped lang="less">
@import url("../assets/css/main.less");
.white{
	color: white;
}
/*ip6p及以上*/
@media (min-width:411px) {
	@width: 330px;
	@height: 265px;
	#ifalert {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1010;
		background-color: rgba(0, 0, 0, .5);
		font-size: 14px;
	}
	#ifalert .ifalert_box{
		width: @width;
		background-color: #1b1b26;
		position: fixed;
		top: 212px;
		left: 40px;
		position: relative;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
	}
	.selectbar{
		width: 100%;
		height: 42px;
		background-color: #242633;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.selectbar li {
		width: 50%;
		text-align: center;
		line-height: 42px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.selected {
		color: #ffe100;
	}
	.content {
		background-color: #1b1b26;
		height: 220px;
		border-top: 1px solid #20212d;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.content>li{
		height: 43px;
		line-height: 42px;
		overflow: hidden;
		border-bottom: 1px solid #20212d;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.content>li:last-child {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.content>li:last-child>div {
		float: left;
		width: 50%;
		height: 42px;
		line-height: 42px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	ol>li {
		float: left;
		border-right: 1px solid #1b1b26;
	}
	ol>li:last-child{
		border: none;
	}
	ol>li:first-child {
		width: 53px;
	}
	ol{
		height: 42px;
	}
	li{
		text-align: center;
		background-color: #242633;
	}
	.selectshort {
		width: 55px;
		height: 32px;
		background-color: #1b1b26;
		transform: translateY(-1.5px);
		padding: 0 8px;
		margin-left: 5px;
		background-image: url('../assets/img/sanjiao.png');
		background-repeat: no-repeat;
		background-size: 5px;
		background-position: 45px 21px;
		border-radius: 3px;
	}
	.selectlong {
		width: 135px;
		height: 32px;
		padding: 0 10px;
		text-align: center;
		background-color: #1b1b26;
		margin-left: 5px;
		border-radius: 3px;
	}
	input {
		width: 55px;
		height: 32px;
		background-color: #1b1b26;
		color: white;
		font-size: 16px;
		text-align: center;
		margin-left: 5px;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px;
	}
	.ipt30{
		width: 30px;
		height: 32px;
		background-color: #1b1b26;
		color: white;
		font-size: 16px;
		text-align: center;
		margin-left: 5px;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px;
	}
	.today {
		width: 275px;
		text-align: center;
	}
	ul>li:nth-child(1)>ol>li:nth-child(2),
	ul>li:nth-child(2)>ol>li:nth-child(2),
	ul>li:nth-child(3)>ol>li:nth-child(2) {
		padding-right: 8px;
	}
	ul>li:nth-child(1)>ol>li:nth-child(3){
		padding-left: 8px;
	}
	.lot {
		margin-left: 5px;
	}
	.do {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.do>div {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.li_time{
		position: relative;
	}
	.time, .show_time{
		display: inline-block;
		vertical-align: middle;
		width: 95px;
		height: 32px;
		color: white;
		padding: 0 5px;
	}
	.time{
		position: absolute;
		top: 5px;
		left: 0;
		z-index: 99;
		opacity: 0;
	}
}
/*ip6*/
@media (min-width:371px) and (max-width:410px) {
	@width: 330px*@ip6;
	@height: 265px*@ip6;
	#ifalert {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1010;
		background-color: rgba(0, 0, 0, .5);
		font-size: 14px*@ip6;
	}
	#ifalert .ifalert_box{
		width: @width;
		background-color: #1b1b26;
		position: fixed;
		top: 212px*@ip6;
		left: 40px*@ip6;
		position: relative;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px*@ip6;
	}
	.selectbar{
		width: 100%;
		height: 42px*@ip6;
		background-color: #242633;
		border-top-right-radius: 5px*@ip6;
		border-top-left-radius: 5px*@ip6;
	}
	.selectbar li {
		width: 50%;
		text-align: center;
		line-height: 42px*@ip6;
		border-top-left-radius: 5px*@ip6;
		border-top-right-radius: 5px*@ip6;
	}
	.selected {
		color: #ffe100;
	}
	.content {
		background-color: #1b1b26;
		height: 220px*@ip6;
		border-top: 1px solid #20212d;
		border-bottom-left-radius: 5px*@ip6;
		border-bottom-right-radius: 5px*@ip6;
	}
	.content>li{
		height: 43px*@ip6;
		line-height: 42px*@ip6;
		overflow: hidden;
		border-bottom: 1px solid #20212d;
		border-bottom-left-radius: 5px*@ip6;
		border-bottom-right-radius: 5px*@ip6;
	}
	.content>li:last-child {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.content>li:last-child>div {
		float: left;
		width: 50%;
		height: 42px*@ip6;
		line-height: 42px*@ip6;
		border-bottom-left-radius: 5px*@ip6;
		border-bottom-right-radius: 5px*@ip6;
	}
	ol>li {
		float: left;
		border-right: 1px solid #1b1b26;
	}
	ol>li:last-child{
		border: none;
	}
	ol>li:first-child {
		width: 53px*@ip6;
	}
	ol{
		height: 42px*@ip6;
	}
	li{
		text-align: center;
		background-color: #242633;
	}
	.selectshort {
		width: 55px*@ip6;
		height: 32px*@ip6;
		background-color: #1b1b26;
		transform: translateY(-1.5px);
		padding: 0 8px*@ip6;
		margin-left: 5px*@ip6;
		background-image: url('../assets/img/sanjiao.png');
		background-repeat: no-repeat;
		background-size: 5px*@ip6;
		background-position: 45px*@ip6 21px*@ip6;
		border-radius: 3px*@ip6;
	}
	.selectlong {
		width: 135px*@ip6;
		height: 32px*@ip6;
		padding: 0 10px*@ip6;
		text-align: center;
		background-color: #1b1b26;
		margin-left: 5px*@ip6;
		border-radius: 3px*@ip6;
	}
	input {
		width: 55px*@ip6;
		height: 32px*@ip6;
		background-color: #1b1b26;
		color: white;
		font-size: 16px*@ip6;
		text-align: center;
		margin-left: 5px*@ip6;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px*@ip6;
	}
	.ipt30{
		width: 30px;
		height: 32px;
		background-color: #1b1b26;
		color: white;
		font-size: 16px;
		text-align: center;
		margin-left: 5px;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px;
	}
	.today {
		width: 275px*@ip6;
		text-align: center;
	}
	ul>li:nth-child(1)>ol>li:nth-child(2),
	ul>li:nth-child(2)>ol>li:nth-child(2),
	ul>li:nth-child(3)>ol>li:nth-child(2) {
		padding-right: 8px*@ip6;
	}
	ul>li:nth-child(1)>ol>li:nth-child(3){
		padding-left: 8px*@ip6;
	}
	.lot {
		margin-left: 5px*@ip6;
	}
	.do {
		border-bottom-left-radius: 5px*@ip6;
		border-bottom-right-radius: 5px*@ip6;
	}
	.do>div {
		border-bottom-left-radius: 5px*@ip6;
		border-bottom-right-radius: 5px*@ip6;
	}
	.li_time{
		position: relative;
	}
	.time, .show_time{
		display: inline-block;
		vertical-align: middle;
		width: 95px*@ip6;
		height: 32px*@ip6;
		color: white;
		padding: 0 5px*@ip6;
	}
	.time{
		position: absolute;
		top: 5px*@ip6;
		left: 0;
		z-index: 99;
		opacity: 0;
	}
}
/*ip5*/
@media(max-width:370px) {
	@width: 330px*@ip5;
	@height: 265px*@ip5;
	#ifalert {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1010;
		background-color: rgba(0, 0, 0, .5);
		font-size: 14px*@ip5;
	}
	#ifalert .ifalert_box{
		width: @width;
		background-color: #1b1b26;
		position: fixed;
		top: 212px*@ip5;
		left: 40px*@ip5;
		position: relative;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3), -1px -1px 3px rgba(0, 0, 0, 0.3);
		border-radius: 5px*@ip5;
	}
	.selectbar{
		width: 100%;
		height: 42px*@ip5;
		background-color: #242633;
		border-top-right-radius: 5px*@ip5;
		border-top-left-radius: 5px*@ip5;
	}
	.selectbar li {
		width: 50%;
		text-align: center;
		line-height: 42px*@ip5;
		border-top-left-radius: 5px*@ip5;
		border-top-right-radius: 5px*@ip5;
	}
	.selected {
		color: #ffe100;
	}
	.content {
		background-color: #1b1b26;
		height: 220px*@ip5;
		border-top: 1px solid #20212d;
		border-bottom-left-radius: 5px*@ip5;
		border-bottom-right-radius: 5px*@ip5;
	}
	.content>li{
		height: 43px*@ip5;
		line-height: 42px*@ip5;
		overflow: hidden;
		border-bottom: 1px solid #20212d;
		border-bottom-left-radius: 5px*@ip5;
		border-bottom-right-radius: 5px*@ip5;
	}
	.content>li:last-child {
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.content>li:last-child>div {
		float: left;
		width: 50%;
		height: 42px*@ip5;
		line-height: 42px*@ip5;
		border-bottom-left-radius: 5px*@ip5;
		border-bottom-right-radius: 5px*@ip5;
	}
	ol>li {
		float: left;
		border-right: 1px solid #1b1b26;
	}
	ol>li:last-child{
		border: none;
	}
	ol>li:first-child {
		width: 53px*@ip5;
	}
	ol{
		height: 42px*@ip5;
	}
	li{
		text-align: center;
		background-color: #242633;
	}
	.selectshort {
		width: 55px*@ip5;
		height: 32px*@ip5;
		background-color: #1b1b26;
		transform: translateY(-1.5px);
		padding: 0 8px*@ip5;
		margin-left: 5px*@ip5;
		background-image: url('../assets/img/sanjiao.png');
		background-repeat: no-repeat;
		background-size: 5px*@ip5;
		background-position: 45px*@ip5 21px*@ip5;
		border-radius: 3px*@ip5;
	}
	.selectlong {
		width: 135px*@ip5;
		height: 32px*@ip5;
		padding: 0 10px*@ip5;
		text-align: center;
		background-color: #1b1b26;
		margin-left: 5px*@ip5;
		border-radius: 3px*@ip5;
	}
	input {
		width: 55px*@ip5;
		height: 32px*@ip5;
		background-color: #1b1b26;
		color: white;
		font-size: 16px*@ip5;
		text-align: center;
		margin-left: 5px*@ip5;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px*@ip5;
	}
	.ipt30{
		width: 25px;
		height: 32px;
		background-color: #1b1b26;
		color: white;
		font-size: 16px;
		text-align: center;
		margin-left: 5px;
		margin-bottom: 0;
		padding: 0;
		border-radius: 3px;
	}
	.today {
		width: 275px*@ip5;
		text-align: center;
	}
	ul>li:nth-child(1)>ol>li:nth-child(2),
	ul>li:nth-child(2)>ol>li:nth-child(2),
	ul>li:nth-child(3)>ol>li:nth-child(2) {
		padding-right: 8px*@ip5;
	}
	ul>li:nth-child(1)>ol>li:nth-child(3){
		padding-left: 8px*@ip6;
	}
	.lot {
		margin-left: 3px*@ip5;
	}
	.do {
		border-bottom-left-radius: 5px*@ip5;
		border-bottom-right-radius: 5px*@ip5;
	}
	.do>div {
		border-bottom-left-radius: 5px*@ip5;
		border-bottom-right-radius: 5px*@ip5;
	}
	.li_time{
		position: relative;
	}
	.time, .show_time{
		display: inline-block;
		vertical-align: middle;
		width: 95px*@ip5;
		height: 32px*@ip5;
		color: white;
		padding: 0 5px*@ip5;
	}
	.time{
		position: absolute;
		top: 5px*@ip5;
		left: 0;
		z-index: 99;
		opacity: 0;
	}
}
</style>