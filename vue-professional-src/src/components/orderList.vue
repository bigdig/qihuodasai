<template>
	<div id="orderList" class="list" :val="getData">
		<alert title="确认全部平仓" :line1="closeAllOutAlert" :objstr='closeAllOutAlertObj' type="1"></alert>
		<alert title="确认平仓"  :line1="closeOutAlert" :objstr='closeOutAlertObj'></alert>
		<ul class="list_cont_box">
			<li class="list_head">
				<span>合约名称</span>
				<span>多空</span>
				<span>手数</span>
				<span>持仓均价</span>
				<span>浮动盈利</span>
			</li>
			<!-- <template v-for="k in datas">
				<li :class="{'current': currentindex}" @tap="listTap" :id="k.commodityNocontractNo"> -->
				<li :class="{'current': currentIndex === index}" @tap="listTap(k, index)" :id="k.commodityNocontractNo"  v-for="(k,index) in datas" :key="index">
					<div :class="[list_cont,{current:k.showbar}]">
						<span>{{k.name}}</span>
						<span :class="{red: k.type_color == 'red', green: k.type_color == 'green'}">{{k.type}}</span>
						<span>{{k.num}}</span>
						<span>{{k.price}}</span>
						<span :class="{red: k.total_color == 'red', green: k.total_color == 'green'}">{{k.total}}</span>
					</div>
				</li>
			<!-- </template> -->
		</ul>
		<div class="list_tools">
			<cbtn name="全部平仓" @tap.native="closeAllOut"></cbtn>
			<cbtn name="平仓"  @tap.native="closeOut"></cbtn>
			<cbtn name="止损止盈" @tap.native="stopLossStopProfit"></cbtn>
		</div>
		<tipsDialog :msg="msgTips"></tipsDialog>
		<stopmoneyalert :val="selectedOrderLists" ref="stopmoneyalert"></stopmoneyalert>
	</div>
</template>

<script>
	import cbtn from '../components/conditionBtn.vue'
	import alert from '../components/Tradealert.vue'
	import tipsDialog from '../components/tipsDialog.vue'
	import stopmoneyalert from '../components/stopmoneyalert.vue'
	export default{
		name: 'orderList',
		components: {cbtn, alert, tipsDialog,stopmoneyalert},
		props: ['val'],
		data(){
			return {
				msg: '',
				datas: '',
				orderListId: '',
				tempText:{},
				selectedOrderList: '',
				currentIndex: null
			}
		},
		computed: {
			msgTips: function(){
				return this.msg;
			},
			closeOutAlertObj(){
				if(this.tempText){
					return JSON.stringify(this.tempText);
				}
			},
			closeOutAlert(){
				var obj = this.tempText.Parameters;
				if(obj!=undefined){
					var contract=obj.CommodityNo+obj.ContractNo;
					var orderNum = obj.OrderNum
					var text = '确认平仓合约【'+contract+'】,价格【市价】,手数【'+orderNum+'】';
					return text;
					
				}
			},
			closeAllOutAlertObj(){
				if(this.tempText){
					return JSON.stringify(this.tempText);
				}
			},
			closeAllOutAlert:function(){
				
				return '此操作将平掉持仓列表中所有合约,请你慎重选择。是否确认将所有合约全部平仓？';
			},
			list_cont: function(){
				return 'list_cont'
			},
			getData: function(){
				if(this.val){
					this.datas = JSON.parse(this.val);
				}
			},
			positionListCont(){
				return this.$store.state.market.positionListCont;
			},
			tradeSocket() {
				return this.$store.state.tradeSocket;
			},
			qryHoldTotalArr(){
				return this.$store.state.market.qryHoldTotalArr;
			},
			selectedOrderLists: function(){
				return JSON.stringify(this.selectedOrderList);
			},
		},
		methods: {
			// listTap (obj) { //选中
				// if(!$(obj.currentTarget).hasClass("current")){
				// 	$(obj.currentTarget).addClass("current");
				// 	$(obj.currentTarget).siblings().removeClass("current");
				// 	this.orderListId = $(obj.currentTarget).attr("id");
				// }else{
				// 	$(obj.currentTarget).removeClass("current");
				// 	this.orderListId =null;
				// }

			// },
			listTap (item,index) { //选中状态
				if (this.currentIndex === index) return this.currentIndex = null;
				this.currentIndex = index;
				this.orderListId = item.commodityNocontractNo;
			},
			closeAllOut () {
				if(this.qryHoldTotalArr.length > 0){
					this.$children[0].isshow = true;
					var arr=[];
					console.log(this.qryHoldTotalArr)
					
					this.qryHoldTotalArr.forEach((item,index) => {
						var drection = item.Drection? 0 : 1;
						var b = {
							"Method":'InsertOrder',
							"Parameters":{
								"ExchangeNo":item.ExchangeNo,
								"CommodityNo":item.CommodityNo,
								"ContractNo":item.ContractNo,
								"OrderNum":item.HoldNum,
								"Drection":drection,
								"PriceType":1,
								"LimitPrice":0.00,
								"TriggerPrice":0,
								"OrderRef":this.$store.state.market.tradeConfig.Source+ new Date().getTime()+(index+1)
							}
						};
						arr.push(b)
						this.tempText = arr;
					});
				}else{
					this.$children[5].isShow = true;
					this.msg = '暂无合约需要平仓';
				}
			},
			stopLossStopProfit:function(obj){
				var i = 0;
				var positionCurrent=0;
				var length= this.qryHoldTotalArr.length;
				var qryHoldTotalArr = this.qryHoldTotalArr;
				var dotSize;
				for(positionCurrent in this.positionListCont){
					if(this.orderListId == qryHoldTotalArr[length-1-positionCurrent].ContractCode){
						i++;
						this.selectedOrderList = qryHoldTotalArr[length-1-positionCurrent];
						dotSize = this.$store.state.market.orderTemplist[this.selectedOrderList.CommodityNo].dot_size;
						this.$refs.stopmoneyalert.isshow = true;
						this.$refs.stopmoneyalert.inputPrice = parseFloat(this.selectedOrderList.OpenAvgPrice).toFixed(dotSize);  //设置默认止损价
						this.$refs.stopmoneyalert.zhiYinInputPrice = parseFloat(this.selectedOrderList.OpenAvgPrice).toFixed(dotSize);   //设置默认止盈价
						this.$refs.stopmoneyalert.selectStopLossType00 = 0;  //默认止损价
						return;
					}
				}
				if(i < 1){
					this.$children[5].isShow = true;
					this.msg = '请选择一条数据';
				}
			},
			closeOut(obj){ //更新平仓
				let i = 0;
				let positionCurrent = this.qryHoldTotalArr.find((item, index) =>{
					if (this.orderListId == item.ContractCode) {
						i = index
						return true
					}
				})
				if (!positionCurrent) {
					this.$children[5].isShow = true;
					this.msg = '请选择一条数据';
					return;
				}
				let quoteMsg = {
					"Method":'InsertOrder',
					"Parameters":{
						"ExchangeNo": positionCurrent.ExchangeNo,
						"CommodityNo": positionCurrent.CommodityNo,
						"ContractNo": positionCurrent.ContractNo,
						"OrderNum": positionCurrent.HoldNum,
						"Drection": positionCurrent.Drection===1?0:1,
						"PriceType":1,
						"LimitPrice":0.00,
						"TriggerPrice":0,
						"OrderRef":this.$store.state.market.tradeConfig.Source+ new Date().getTime()+(i++)
					}
				};
				this.tempText = quoteMsg;
				this.$children[1].isshow = true; //唤起弹框
			}
			
		},
		watch: {
			qryHoldTotalArr (n, o) {
				this.currentIndex = null
				this.orderListId = ''
			}
		}
	}
</script>

<style scoped lang="less">
	@import url("../assets/css/main.less");
	@import url("../assets/css/base.less");
	/*ip6p及以上*/
	@media (min-width:411px) {
		.list{
			ul{
				width: 100%;
				padding: 0;
				overflow-y: scroll;
			}
			li{
				width: 510px;
				background: @deepblue;
				padding-left: 15px;
				border-top: 1px solid @black;
				&.current{
					background: #2d3040;
				}
				&.list_head{
					height: 44px;
					background: #36394d;
				}
				.list_cont{
					height: 44px;
					&.current{
						background: #2d3040;
					}
				}
				span{
					display: inline-block;
					height: 44px;
					line-height: 44px;
					overflow: hidden;
					color: @lightblue;
					font-size: @fs14;
					margin: 0 0.4%;
					&:nth-child(1){
						width: 130px;
					}
					&:nth-child(2){
						width: 50px;
					}
					&:nth-child(3){
						width: 50px;
					}
					&:nth-child(4){
						width: 65px;
					}
					&:nth-child(5){
						width: 140px;
					}
					&.red{
						color: @red;
					}
					&.green{
						color: @green;
					}
				}
			}
			.list_tools{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 44px;
				overflow: hidden;
				text-align: center;
				#conditionBtn{
					display: inline-block;
					margin: 6px 10px 0 10px;
				}
			}
		}
	}
	
	/*ip6*/
	@media (min-width:371px) and (max-width:410px) {
		.list{
			ul{
				width: 100%;
				padding: 0;
				overflow-y: scroll;
			}
			li{
				width: 510px*@ip6;
				background: @deepblue;
				padding-left: 15px*@ip6;
				border-top: 1px solid @black;
				&.current{
					background: #2d3040;
				}
				&.list_head{
					height: 44px*@ip6;
					background: #36394d;
				}
				.list_cont{
					height: 44px*@ip6;
					&.current{
						background: #2d3040;
					}
				}
				span{
					display: inline-block;
					height: 44px*@ip6;
					line-height: 44px*@ip6;
					overflow: hidden;
					color: @lightblue;
					font-size: @fs14*@ip6;
					margin: 0 0.4%;
					&:nth-child(1){
						width: 130px*@ip6;
					}
					&:nth-child(2){
						width: 50px*@ip6;
					}
					&:nth-child(3){
						width: 50px*@ip6;
					}
					&:nth-child(4){
						width: 65px*@ip6;
					}
					&:nth-child(5){
						width: 140px*@ip6;
					}
					&.red{
						color: @red;
					}
					&.green{
						color: @green;
					}
				}
			}
			.list_tools{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 44px*@ip6;
				overflow: hidden;
				text-align: center;
				#conditionBtn{
					display: inline-block;
					margin: 6px*@ip6 10px*@ip6 0 10px*@ip6;
				}
			}
		}
	}
	
	/*ip5*/
	@media(max-width:370px) {
		.list{
			ul{
				width: 100%;
				padding: 0;
				overflow-y: scroll;
			}
			li{
				width: 550px*@ip5;
				background: @deepblue;
				padding-left: 15px*@ip5;
				border-top: 1px solid @black;
				&.current{
					background: #2d3040;
				}
				&.list_head{
					height: 44px*@ip5;
					background: #36394d;
				}
				.list_cont{
					height: 44px*@ip5;
					&.current{
						background: #2d3040;
					}
				}
				span{
					display: inline-block;
					height: 44px*@ip5;
					line-height: 44px*@ip5;
					overflow: hidden;
					color: @lightblue;
					font-size: @fs14*@ip5;
					margin: 0 0.4%;
					&:nth-child(1){
						width: 130px*@ip5;
					}
					&:nth-child(2){
						width: 60px*@ip5;
					}
					&:nth-child(3){
						width: 60px*@ip5;
					}
					&:nth-child(4){
						width: 70px*@ip5;
					}
					&:nth-child(5){
						width: 150px*@ip5;
					}
					&.red{
						color: @red;
					}
					&.green{
						color: @green;
					}
				}
			}
			.list_tools{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 44px*@ip5;
				overflow: hidden;
				text-align: center;
				#conditionBtn{
					display: inline-block;
					margin: 6px*@ip5 10px*@ip5 0 10px*@ip5;
				}
			}
		}
	}
</style>