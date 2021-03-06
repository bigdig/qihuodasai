//持仓发送请求次数记录
var holdFirstLoadDataIndex = 0;
//个人账户信息发送请求次数纪录
var accountFirstLoadDataIndex = 0;
//委托发送请求次数记录
var orderFirsetLoadDataIndex = 0;
//成功记录发送请求次数记录
var tradeFirsetLoadDataIndex = 0;
//止损单查询发送请求次数记录
var stopLossLoadDataIndex = 0;
//条件单查询发送请求次数记录
var conditionLoadDataIndex = 0;
//存储判断止损止盈提示
var textList = ["止损", "止盈"];
/**
 * 用户登陆成功加载数据
 */
function LoginForwardInitLoadData() {
	if(holdFirstLoadDataIndex == 0) {
		Trade.doHold(username);
		holdFirstLoadDataIndex++;
	}
	
}
/**
 * 合约交易成功加载持仓信息的标志
 */
var tradeSuccessLoadFlag = false;
/**
 * 合约交易成功查询持仓信息
 */
function tradeSuccessLoadHoldData() {
	//tradeSuccessLoadFlag = true;
	$("#positionList").html("");
	loadPositionTitle();
	localCachePositionRecentData = {};
	localCachePostion = {};
	Trade.doHold(username);

}
/**
 * 线性加载数据
 * @param {Object} method 返回的数据标识
 */
function linearlyLoadData(method) {
	if(method == "OnRspQryHoldTotal") {
		if(orderFirsetLoadDataIndex == 0) {
			Trade.doOrder(username);
			orderFirsetLoadDataIndex++;
		}
	} else if(method == "OnRspQryOrder") {
		if(tradeFirsetLoadDataIndex == 0) {
			Trade.doTrade(username);
			tradeFirsetLoadDataIndex++;
		}
	} else if(method == "OnRspQryTrade") {
		if(accountFirstLoadDataIndex == 0) {
			Trade.doAccount(username);
			accountFirstLoadDataIndex++;
		}
	} else if(method == "OnRspQryAccount") {
		if(stopLossLoadDataIndex == 0 && tradeWebSocketIsMock == 1) {
			Trade.doQryStopLoss(username);
			stopLossLoadDataIndex++;
		}
	} else if(method == "OnRspQryStopLoss") {
		if(conditionLoadDataIndex == 0 && tradeWebSocketIsMock == 1) {
			Trade.doQryCondition(username);
			conditionLoadDataIndex++;
		}
	}
}
/**
 * 处理返回数据
 * @param {Object} EVT
 */
/**
 * 保存已下单的数据
 */
var resultInsertOrderId = {};
var referCount = 0;
var InitBalance; //初始资金（初始权益）


function handleData(evt) {
	var dataString = evt.data;
	var data = JSON.parse(dataString);
	var method = data.Method;
	var parameters = data.Parameters;
	linearlyLoadData(method);
//	console.log(JSON.stringify(parameters))
	if(parameters != null) {
		if(method == "OnRspLogin") {
			$("#trade_login").text("登录");
			var code = parameters.Code;
			var loginMessage = parameters.Message;
			//登录成功加载
			if(code == 0) {
				LoginForwardInitLoadData();
				setIsLogin(true);
				loginFail = false;
				anotherPlace = false;
				if(parameters.ForceLine==undefined){
					$('#loss-Open-line').text('0.00');
				}else{
					$('#loss-Open-line').text(parameters.ForceLine);
				}
				
				InitBalance = parameters.InitBalance;
				mui.toast("交易服务器连接成功！");
			} else {
				loginFail = -2;
				alertProtype(loginMessage, "登录提示", Btn.confirmed());
				tipAlert(loginMessage);
				//登录失败清理数据
				loginOut();
			}
			plus.nativeUI.closeWaiting();
			clearInterval(tradeIntervalId);
			//查询个人账户信息回复
		} else if(method == "OnRspQryAccount") {
			var accountParam = parameters;
			updateBalance(accountParam);
			//addAndUpdateFundsDetails(accountParam);
			//查询订单信息回复
		} else if(method == "OnRspQryOrder") {
			var orderStatus = parameters.OrderStatus;
			var orderParam = parameters;
			appendOrder(orderParam);
			if(orderStatus < 3) {
				appendDesignates(orderParam);
			}
			//查询成交记录回复
		} else if(method == "OnRspQryTrade") {
//			console.log('----------------');
//			console.log(JSON.stringify(parameters));
			appendTradeSuccess(parameters);
			//查询持仓信息回复
		} else if(method == "OnRspQryHoldTotal") {
			var positionParam = parameters;
			updateHoldTotal(parameters); // 更新持仓
			var commdityNo = positionParam.CommodityNo;
			var contractNo = positionParam.ContractNo;
			var commdityAndcontract = commdityNo + contractNo;
			var comm = getMarketCommdity(commdityAndcontract);
			if(comm != undefined) {
				if(marketSubCommdity[commdityAndcontract] == undefined) {
					subscribeHold(comm.ExchangeNo, commdityNo, contractNo);
					setMarketSubCommdity(commdityAndcontract, commdityAndcontract);
				}
			} else {
				setMarketNotSubCommdity(commdityAndcontract, commdityAndcontract);
			}
			//报单录入请求回复
		} else if(method == "OnRspOrderInsert") {
			var insertOrderParam = parameters;
			appendOrder(insertOrderParam);
			var inserOrderStatus = insertOrderParam.OrderStatus;
			if(inserOrderStatus < 3) {
				appendDesignates(insertOrderParam);
			}
			if(inserOrderStatus == 5) {
				tip("交易失败:合约【" + insertOrderParam.ContractCode + "】,原因【" + insertOrderParam.StatusMsg + "】");
			} else {
				tip("提交成功,等待交易");
			}
			resultInsertOrderId[insertOrderParam.OrderID] = insertOrderParam.OrderID;
			//订单状态通知
		} else if(method == "OnRtnOrderState") {
			var orderParam = parameters;
			updateOrder(orderParam);
			var orderId = orderParam.OrderID;
			var orderStatusWeHooks = orderParam.OrderStatus;
			//当订单状态改变
			var contractCode = orderParam.ContractCode;
			if(orderStatusWeHooks == 3 || orderStatusWeHooks == 4 || orderStatusWeHooks == 5) {
				delDesignatesDom(orderId);
			} else if(orderStatusWeHooks == 0) {
				updateDesignatesDom(orderParam);
			} else if(orderStatusWeHooks == 1 || orderStatusWeHooks == 2) {
				updateDesignatesDom(orderParam);
			}
			var cacaleOrderId = selectDesgnate["orderId"];
			var contractCode = selectDesgnate["contraction"];
			if(orderStatusWeHooks == 4) {
				tip("撤单成功:合约【" + orderParam.ContractCode + "】,订单号【" + orderId + "】");
			} else
			if(orderStatusWeHooks == 5) {
				tip("交易失败:合约【" + orderParam.ContractCode + "】,原因【" + orderParam.StatusMsg + "】");
			} else
			if(isUpdateOrder && cacaleOrderId == orderId) {
				var orderPrice = orderParam.OrderPrice;
				var orderNum = orderParam.OrderNum;
				isUpdateOrder = false;
				tip("改单成功:合约【" + contractCode + "】,订单号为:【"+orderId+"】");
			}
			//订单成交通知
		} else if(method == "OnRtnOrderTraded") {
			var tradeParam = parameters;
			appendTradeSuccess(tradeParam);
			var orderId = tradeParam.OrderID;
			var locaOrderId = resultInsertOrderId[orderId];
			tip("交易成功：合约【" + tradeParam.ContractCode + "】,交易手数:【" + tradeParam.TradeNum + "】,交易价格:【" + tradeParam.TradePrice + "】");
			//资金变化通知  
		} else if(method == "OnRtnMoney") {
			var accountParam = parameters;
			updateBalance(accountParam)
			updateFundsDetails(accountParam);
		} else if(method == "OnRtnHoldTotal") {
			updateHoldTotal(parameters); // 更新持仓
			//报单录入请求回复
		} else if(method == "OnError") {
			var code = parameters.Code;
			var loginMessage = parameters.Message;
			tip(loginMessage);
		} else if(method == "OnRspLogout") {
			$("#switchAccount").text("登录账户");
			var code = parameters.Code;
			var loginMessage = parameters.Message;
			loginFail = true;
			if(code == 1) {
				anotherPlace = true;
			}
			//录入止损止盈请求返回
		} else if(method == "OnRspInsertStopLoss") {
			var stopLossParam = parameters;
//			console.log('------------------------->');
//			console.log(JSON.stringify(parameters));
			var message = "";
			var status = stopLossParam.Status;
			if(status == 4) {
				message = "添加止损单失败"
			} else {
				message = "提交成功,单号:【" + stopLossParam.StopLossNo + "】";
				mui("#popoverLoss").popover("toggle");
				$("#popoverLoss").css("display", "none");
				$(".mui-backdrop").css("display", "none");
				$("#bg1").css("display", "none");
				$("#bg2").css("display", "none");
				$("#bg3").css("display", "block");
				$(".mui-content").eq(2).css("z-index", "998");
			}
			tip(message);
			appendStopLossData(stopLossParam);
			//查询止损止盈返回
		} else if(method == "OnRspQryStopLoss") {
			var stopLossParam = parameters;
			appendStopLossData(stopLossParam);
			//止损止盈状态返回
		} else if(method == "OnRtnStopLossState") {
			var stopLossParam = parameters;
			updateStopLossData(stopLossParam);
			var status = stopLossParam.Status;
			var stoplossType = stopLossParam.StopLossType;
			var stopLossNo = stopLossParam.StopLossNo;
			if(stoplossType == 0 || stoplossType == 2) {
				stoplossType = "止损";
			} else if(stoplossType == 1) {
				stoplossType = "止盈";
			}
			if(status == 2) {
				status = "已触发";
			} else if(status == 3) {
				status = "已取消";
			} else if(status == 4) {
				status = "插入失败";
			} else if(status == 5) {
				status = "触发失败";
			} else {
				status = "更新成功";
				$("#popoverLoss1").css("display", "none");
				$(".mui-backdrop").css("display", "none");
			}
			tip(stoplossType + "单【" + stopLossNo + "】," + status);
			//查询条件单返回
		} else if(method == "OnRspQryCondition") {
			var conditionParam = parameters;
			appendCondition(conditionParam);
			//录入条件单请求返回
		} else if(method == "OnRspInsertCondition") {
			var conditionParam = parameters;
			var message = "";
			var status = conditionParam.Status;
			if(status == 4) {
				tip(conditionParam.StatusMsg);
			} else {
				var conditionNo = conditionParam.ConditionNo;
				tip("条件单提交成功,单号:" + conditionNo);
				mui("#popoverConditoion").popover("toggle");
			}
			appendCondition(conditionParam);
		} else if(method == "OnRtnConditionState") {
			var conditionParam = parameters;
			var commodityNo = conditionParam.CommodityNo;
			var contractNo = conditionParam.ContractNo;
			var contractCode = commodityNo + contractNo;
			var conditionNo = conditionParam.ConditionNo;
			var status = conditionParam.Status;
			if(status == 2) {
				status = "已触发";
			} else if(status == 3) {
				status = "已取消";
				selectCondition = {};
			} else if(status == 4) {
				status = "插入失败";
			} else if(status == 5) {
				status = "触发失败";
			} else {
				status = "更新成功";
				if(operateConditionType == 0) {
					mui("#popoverConditoion").popover("toggle");
					operateConditionType = undefined;
				}
			}
			tip("【" + contractCode + "】条件单【" + conditionNo + "】," + status);
			updateConditionList(conditionParam);
		}else if(method == "OnRspQryHisTrade"){
			dealWithQryHisTrade(data.Parameters);
			
		}
	} else {
		/*if(method == "OnRspQryHold" && tradeSuccessLoadFlag){
			updateOrderUpdatePosition();
			tradeSuccessLoadFlag = false;
			isBuy = false;
			localCachePositionRecentData = {};
		}*/
		/*if(referCount > 0){ 
			referCount--;
			tradeSuccessLoadHoldData();
		} */
	}
}
/**
 * 修改用户账户信息
 * @param {Object} parama 用户信息的json对象
 */
var uehIndex = 0;
var loadCachBanlance = {};
var loadCachDeposit = {};
var loadCachCanuse = {};
var loadCurrencyRate = {};
var loadCachAccountNo = {};
var loadCachCurrecyRate = {};
var localCacheCurrencyAndRate = {};
var loadCachFloatingProfit = {};
var loadCachCloseProfit = {};
var loadCachTodayBanlance = 0;
var loadCachTodayCanuse = 0;

/**
 * 处理历史成交
 * @param {Object} parameters
 */
var history_index=1;
function dealWithQryHisTrade(parameters){
//	$('#hisTradeList').prepend('<tr class="red"><td width="30px">'+parameters.TradeNo+'</td><td width="80px">'+parameters.ContractCode+'</td><td width="60px">'+dealwithBuyOrSell(parameters.Drection)+'</td><td width="60px">'+parameters.TradeNum+'</td><td width="100px">'+parameters.TradeFee+'</td></tr>');
	$('#hisTradeList').append('<tr class="red"><td width="50px">'+(history_index++)+'</td><td width="100px">'+parameters.ContractCode+'</td><td width="100px">'+parameters.ExchangeNo+'</td><td width="100px">'+parameters.CurrencyNo+'</td><td width="50px">'+dealwithBuyOrSell(parameters.Drection)+'</td><td width="150px">'+parameters.TradePrice+'</td><td width="50px">'+parameters.TradeNum+'</td><td width="100px">'+parameters.TradeFee+'</td><td width="100px">'+parameters.HedgeProfit+'</td><td width="150px">'+parameters.TradeDateTime+'</td></tr>');
}

function dealwithBuyOrSell(date){
	
	if(date=='1'){
		
		return '卖'.fontcolor('green');
	}
	
	if(date=='0'){
		return '买'.fontcolor('red');
	}
}


function updateBalance(parama) {
	var currencyNo = parama.CurrencyNo;
	var accountNo = parama.AccountNo;
	var cachBanlace = loadCachBanlance[accountNo];
	var deposit = parama.Deposit;
	var currency = parama.CurrencyRate;
	var closeProfit = parama.CloseProfit;
	var frozenMoney = parama.FrozenMoney;
	var counterFee = parama.CounterFee;
	var todayAmount = parama.TodayAmount;
	var unExpiredProfit = parama.UnExpiredProfit;
	var unAccountProfit = parama.UnAccountProfit;
	if(counterFee == undefined) {
		counterFee = parama.Fee;
	}
	var banlance = parseFloat(Number(todayAmount) + Number(unExpiredProfit) + Number(unAccountProfit) + Number(0)).toFixed(2);;
	/*var banlance = parseFloat(Number(todayAmount)+Number(closeProfit)-Number(counterFee)).toFixed(2);*/ //今结存+浮盈+未结平盈+未到期平盈
	var canuse = parseFloat(banlance - deposit - frozenMoney).toFixed(2);
	localCacheCurrencyAndRate[currencyNo] = currency == undefined ? localCacheCurrencyAndRate[currencyNo] : currency;
	loadCachCurrecyRate[accountNo] = currency;
	loadCachBanlance[accountNo] = banlance;
	loadCachDeposit[accountNo] = deposit;
	loadCachCanuse[accountNo] = canuse;
	loadCachFloatingProfit[accountNo] = floatingProfit;
	loadCachCloseProfit[accountNo] = closeProfit;
	if(currency != undefined)
		loadCurrencyRate[accountNo] = currency;
	if(cachBanlace == undefined || cachBanlace.length <= 0) {
		loadCachAccountNo[uehIndex] = accountNo;
		uehIndex++;
	}
	var $banlance = 0.00;
	var $deposit = 0.00
	var $canuse = 0.00
	var $floatFit = 0.00;
	var $clostFit = 0.00;
	for(var i = 0; i < uehIndex; i++) {
		var ac = loadCachAccountNo[i];
		var cr = loadCurrencyRate[ac];
		$banlance = $banlance + loadCachBanlance[ac] * cr;
		$deposit = $deposit + loadCachDeposit[ac] * cr;
		$canuse = $canuse + loadCachCanuse[ac] * cr;
		$clostFit = $clostFit + loadCachCloseProfit[ac] * cr;
		$floatFit = $floatFit + loadCachFloatingProfit[ac] * cr;
	}
	loadCachTodayBanlance = $banlance;
	loadCachTodayCanuse = $canuse;
	$("#todayBalance").text(parseFloat($banlance).toFixed(2));
	$("#deposit").text(parseFloat($deposit).toFixed(2));
	$("#todayCanUse").text(parseFloat($canuse).toFixed(2));
	var color = "#FFFFFF";
	var $closeProfit = parseFloat($clostFit).toFixed(2);
	if($closeProfit < 0) {
		color = "#0bffa4";
	} else if($clostFit > 0) {
		color = "#ff5500";
	}
	/*$("#closeProfit").text($closeProfit);
	$("#closeProfit").css("color",color);*/
};
/**
 * 增加或更新资金明细
 * @param param
 */
function addAndUpdateFundsDetails(param) {
	if(validationFundDetailsIsExsit(param)) {
		addFundsDetails(param);
	} else {
		updateFundsDetails(param);
	}
}
/**
 * 全局缓存资金资金明细的列表信息
 */
var localCacheFundDetail = {};
/**
 * 资金明细的索引
 */
var fundsDetailsIndex = 0;
/**
 * 全局保存币种
 */
var localCurrencyNo = [];
/**
 * 增加资金明细
 * @param param
 */
function addFundsDetails(param) {
	var currencyNo = param.CurrencyNo;
	var acccoutNo = param.AccountNo;
	var deposit = parseFloat(param.Deposit).toFixed(2);
	var floatingProfit = parseFloat(param.FloatingProfit).toFixed(2);
	var keepDepositf = parseFloat(param.Deposit).toFixed(2);
	var oldBalance = parseFloat(param.OldBalance).toFixed(2);
	var oldAmount = parseFloat(param.OldAmount).toFixed(2);
	var todayAmount = parseFloat(param.TodayAmount).toFixed(2);
	var frozenMoney = parseFloat(param.FrozenMoney).toFixed(2);
	var currencyRate = param.CurrencyRate;
	var unExpiredProfit = parseFloat(param.UnExpiredProfit).toFixed(2);
	var unAccountProfit = parseFloat(param.UnAccountProfit).toFixed(2);
	var todayBalance = parseFloat(Number(todayAmount) + Number(unExpiredProfit) + Number(unAccountProfit) + Number(0)).toFixed(2);
	var todayCanUse = parseFloat(todayBalance - keepDepositf - frozenMoney).toFixed(2);
	var profitRate = "";
	var cls = "currencyNo" + currencyNo;
	var funds_cls = "funds-index" + fundsDetailsIndex;
	var html = '<ul class="tab_content ' + cls + ' ' + funds_cls + '" data-tion-fund = "' + currencyNo + '" data-tion-account = "' + acccoutNo + '">' +
		'	<li class="ml detail_currency">' + currencyNo + '</li>' +
		'	<li class = "detail_todayBalance">' + todayBalance + '</li>' +
		'	<li class = "detail_todayCanUse">' + todayCanUse + '</li>' +
		'	<li class = "detail_deposit">' + deposit + '</li>' +
		'	<li class = "detail_floatingProfit">' + floatingProfit + '</li>' +
		'	<li class = "detail_keepDepositf">' + keepDepositf + '</li>' +
		'	<li class = "detail_oldBalance">' + oldBalance + '</li>' +
		'	<li class = "detail_oldAmount">' + oldAmount + '</li>' +
		'	<li class = "detail_todayAmount">' + todayAmount + '</li>' +
		'	<li class = "detail_frozenMoney">' + frozenMoney + '</li>' +
		'	<li class = "detail_profitRate">' + profitRate + '</li>' +
		'	<li class = "detail_currencyRate" style="display:none;">' + currencyRate + '</li>' +
		'</ul>';
	$("#account_gdt1").append(html);
	tabOn();
	localCacheFundDetail[currencyNo] = param;
	addFundDetailBindClick(currencyNo);
	localCurrencyNo[fundsDetailsIndex] = currencyNo;
	updateFundsDetailsIndex();
}
/**
 * 更新资金明细
 * @param param
 */
function updateFundsDetails(param) {
	var accountNo = param.AccountNo;
	var deposit = parseFloat(param.Deposit).toFixed(2);
	var keepDepositf = parseFloat(param.Deposit).toFixed(2);
	var todayAmount = param.TodayAmount;
	var frozenMoney = parseFloat(param.FrozenMoney).toFixed(2);
	var floatingProfit = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_floatingProfit']").text();
	if(isNaN(floatingProfit)) {
		floatingProfit = 0;
	}
	var unExpiredProfit = param.UnExpiredProfit;
	var unAccountProfit = param.UnAccountProfit;
	var todayBalance = parseFloat(Number(todayAmount) + Number(unExpiredProfit) + Number(unAccountProfit) + Number(0)).toFixed(2);
	var todayCanUse = parseFloat(todayBalance - keepDepositf - frozenMoney).toFixed(2);
	var profitRate = "";
	var $detailTodayBalance = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_todayBalance']");
	var $detailTodayCanUse = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_todayCanUse']");
	var $detailDeposit = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_deposit']");
	var $detailKeepDeposit = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_keepDepositf']");
	var $detailTodayAmount = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_todayAmount']");
	var $detailFrozenMoney = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_frozenMoney']");
	var $detailProfitRate = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_profitRate']");
	var $detailCurrencyRate = $("ul[data-tion-account='" + accountNo + "'] li[class = 'detail_currencyRate']");
	var currencyRate = $detailCurrencyRate.text();
	$detailTodayBalance.text(todayBalance);
	$detailTodayCanUse.text(todayCanUse);
	$detailDeposit.text(deposit);
	$detailKeepDeposit.text(keepDepositf);
	$detailTodayAmount.text(parseFloat(todayAmount).toFixed(2));
	$detailFrozenMoney.text(frozenMoney);
	$detailProfitRate.text(profitRate);
}
var orderIndex = 0;
/**
 * 添加用户委托信息
 * @param {Objfont-size: 14px;ct} param 委托信息的json对象
 */
function appendOrder(param) {
	var contractCode = param.ContractCode;
	var drectionText = analysisBusinessBuySell(param.Drection);
	var contractNo = param.ContractNo;
	var commodityNo = param.CommodityNo;
	var localCommodity = getMarketCommdity(commodityNo + contractNo);
	var orderPrice = param.OrderPrice;
	if(localCommodity != undefined) {
		var doSize = Number(localCommodity.DotSize);
		var numOrder = Number(parseFloat(orderPrice))
		orderPrice = numOrder.toFixed(doSize);;
	}
	var orderStatus = param.OrderStatus;
	var ordreStatusText = analysisOrderStatus(orderStatus);
	var orderNum = param.OrderNum;
	var tradeNum = param.TradeNum;
	var cdNum = 0;
	if(orderStatus == 4) {
		cdNum = orderNum - tradeNum;
	}
	var triggerPrice = param.TriggerPrice;
	var priceType = param.OrderPriceType;
	var tradePrice = param.TradePrice;
	var orderPriceText = orderPrice;
	if(priceType == 1) {
		orderPriceText = "市价";
	}
	var orderId = param.OrderID;
	var statusMsg = param.StatusMsg;
	var insertDateTime = param.InsertDateTime;
	if(insertDateTime == undefined || insertDateTime.length == 1) {
		insertDateTime = "-";
	}
	if(insertDateTime == "" || insertDateTime.length == 0) {
		insertDateTime = 0;
	}
	var cls = "order-index" + orderIndex;
	var clsen = 'entrust' + orderIndex;
	var html = '<li   class = "' + cls + ' ' + clsen + ' EntrustOreder  myLi "" data-order-order = "' + orderId + '" data-index-order = "' + orderIndex + '" data-tion-order = "' + contractCode + '">' +
		'	<a class="mui-navigate-right" >' +
		'		' +
		'			<span class = "order0">' + contractCode + '</span>' +
		'			<span class = "order1">' + ordreStatusText + '</span>' +
		'			<span class = "order2">' + drectionText + '</span>' +
		'			<span class = "order3" data-priceType = "' + priceType + '">' + orderPriceText + '</span>' +
		'			<span class = "order4">' + orderNum + '</span>' +
		'			<span class = "order5">' + tradeNum + '</span>' +
		'			<span class = "order6">' + cdNum + '</span>' +
		'			<span class = "dateTimeL order7">' + insertDateTime + '</span>' +
		'		' +
		'	</a>' +
		'</li>';
	$("#Entrust").append(html);
	//tabOn();
	if(insertDateTime == "" || insertDateTime.length == 0) {
		document.getElementsByClassName("order7")[orderIndex].style.opacity = 0;

	}
	addOrderBindClick(cls);
	updateOrderIndex();
};
/**
 * 修改用户委托信息
 * @param {Object} param
 */
function updateOrder(param) {
	var contractCode = param.CommodityNo + param.ContractNo;
	var orderId = param.OrderID;
	var statusMsg = param.StatusMsg;
	var $desgPrice = $("li[data-order-order='" + orderId + "'] span[class = 'order3']");
	var $desgNumber = $("li[data-order-order='" + orderId + "'] span[class = 'order4']");
	var $orderStatus = $("li[data-order-order='" + orderId + "'] span[class = 'order1']");
	var $tradeNum = $("li[data-order-order= '" + orderId + "'] span[class = 'order5']");
	var $cdNum = $("li[data-order-order= '" + orderId + "'] span[class = 'order6']");
	var orderStatus = param.OrderStatus;
	var tradeNum = param.TradeNum;
	var orderNum = param.OrderNum;
	var orderPrice = param.TradePrice;
	var priceType = $desgPrice.attr("data-priceType");
	var dotSize = 2;
	var localCommodit = getMarketCommdity(contractCode);
	if(localCommodit != undefined) {
		dotSize = localCommodit.DotSize;
	}
	if(priceType == 0) {
		$desgPrice.text(parseFloat(param.OrderPrice).toFixed(dotSize));
	}
	$orderStatus.text(analysisOrderStatus(orderStatus));
	if(orderStatus == 4) {
		$cdNum.text(orderNum - tradeNum);
	}
	$tradeNum.text(tradeNum);
	$desgNumber.text(orderNum);
};
/**
 * 缓存挂单的列表信息
 */
var localCacheDesignate = {};
/**
 * 缓存挂单列表信息的品种+合约
 */
var localCachedesignateContractCode = {};
/**
 * 挂单的索引
 */
var designateIndex = 0;
/**
 * 全局的保存当前选中挂单的信息
 */
var selectDesgnate = {};
/**
 * 添加用户挂单信息
 * @param {Object} param 用户挂单信息的json对象
 */
function appendDesignates(param) {
	var contractCode = param.ContractCode;
	var contractNo = param.ContractNo;
	var commodityNo = param.CommodityNo;
	var drection = param.Drection;
	var drectionText = analysisBusinessBuySell(drection);
	var orderPrice = param.OrderPrice;
	var orderNum = param.OrderNum;
	var tradeNum = param.TradeNum;
	var orderSysId = param.OrderSysID;
	var exchangeNo = param.ExchangeNo;
	var orderId = param.OrderID;
	var triggerPrice = param.TriggerPrice;
	var insertDateTime = param.InsertDateTime;
	var localCommodity = getMarketCommdity(commodityNo + contractNo);
	var dotSize = 2;
	if(localCommodity != undefined) {
		dotSize = Number(localCommodity.DotSize);
	}
	var priceType = param.OrderPriceType;
	orderPrice = parseFloat(orderPrice).toFixed(dotSize);
	
	var orderPriceText = orderPrice;
	if(priceType == 1) {
		orderPriceText = "市价";
	}
	var cls = "des-index" + designateIndex;
	var html = '<li    class = "' + cls + ' Guadan  myLi" " data-order-des = "' + orderId + '"  data-index-des = "' + designateIndex + '" data-tion-des= "' + contractCode + '">' +
		'	<a class="mui-navigate-right" >' +
		'		' +
		'			<span class = "desig0">' + contractCode + '</span>' +
		'			<span class = "desig1" data-drection = ' + drection + '>' + drectionText + '</span>' +
		'			<span class = "desig2" data-priceType = "' + priceType + '" data-orderPrice = "' + orderPrice + '">' + orderPriceText + '</span>' +
		'			<span class = "desig3">' + orderNum + '</span>' +
		'			<span class = "desig4">' + (orderNum - tradeNum) + '</span>' +
		'			<span class = "desig5 dateTimeL">' + insertDateTime + '</span>' +
		'			<span class = "desig6" style = "display:none;">' + orderSysId + '</span>' +
		'			<span class = "desig7" style = "display:none">' + commodityNo + '</span>' +
		'			<span class = "desig8" style = "display:none">' + contractNo + '</span>' +
		'         <span class = "desig9" style = "display:none">' + exchangeNo + '</span>' +
		'         <span class = "desig10" style = "display:none">' + orderId + '</span>' +
		'	        <span class = "desig11" style = "display:none;">' + triggerPrice + '</span>' +
		'		' +
		'	</a>' +
		'</li>';
	$("#postersOrder").append(html);
	// tabOn();
	localCacheDesignate[contractCode] = createDesignatesParam(param);
	localCachedesignateContractCode[designateIndex] = orderId;
	addDesignateBindClick(cls);
	updateDesignateIndex();
};
/**
 * 修改挂单中的订单信息
 * @param {Object} param
 */
function updateDesignatesDom(param) {
	var contractCode = param.ContractCode;
	var contractNo = param.ContractNo;
	var commodityNo = param.CommodityNo;
	var orderId = param.OrderID;
	var drection = param.Drection;
	var drectionText = analysisBusinessBuySell(drection);
	var orderNum = parseInt(param.OrderNum);
	var tradeNum = parseInt(param.TradeNum);
	var orderPrice = param.OrderPrice;
	var orderStatus = param.OrderStatus;
	var priceType = param.PriceType;
	var $gdNum = $("li[data-order-des='" + orderId + "'] span[class = 'desig4']");
	var $orderPrice = $("li[data-order-des='" + orderId + "'] span[class = 'desig2']");
	var $orderNum = $("li[data-order-des='" + orderId + "'] span[class = 'desig3']");
	var holdNum = orderNum - tradeNum;
	var localCommodity = getMarketCommdity(commodityNo + contractNo);
	var dotSize = 2;
	if(localCommodity != undefined) {
		dotSize = Number(localCommodity.DotSize);
	}
	var orderPriceText = orderPrice;
	orderPrice = parseFloat(orderPrice).toFixed(dotSize);
	if(holdNum == 0) {
		//当挂单为0时，清理dom节点和存储数据
		delDesignatesDom(contractCode);
		deleteDesignatesContractCode(contractCode);
	} else if(holdNum != 0) {
		$gdNum.text(holdNum);
		$orderNum.text(orderNum);
		$orderPrice.attr("data-orderPrice", orderPrice);
		$orderPrice.text(orderPrice);
		//更新储存数据
		var desiContract = localCacheDesignate[contractCode];
		desiContract.cdNum = holdNum;
		desiContract.drection = drectionText;
	}
};
/**
 * 成交记录索引
 */
var tradesIndex = 0;
/**
 * 添加用户成交记录信息
 * @param {Object} param
 */
function appendTradeSuccess(param) {
	var drection = param.Drection;
	var drectionText = analysisBusinessBuySell(drection);
	var orderId = param.OrderID;
	var contractCode = param.ContractCode;
	var dotSize = 2;
	var Dosize = getMarketCommdity(contractCode);
	if(Dosize != undefined) {
		dotSize = Number(Dosize.DotSize);
	}
	var tradePrice = Number(param.TradePrice);
	var tradeNum = param.TradeNum;
	var currencyNo = param.CurrencyNo;
	var tradeNo = param.TradeNo;
	var orderId = param.OrderID;

	var tradeTime = param.TradeDateTime;
	var exchangeNo = param.ExchangeNo;
	var cls = 'trade-index' + tradesIndex;
	var html = '<li  class = "' + cls + ' DealLi myLi" "   data-index-trade = "' + tradesIndex + '" data-tion-trade = "' + contractCode + '">' +
		'<a class="mui-navigate-right" >' +
		'	' +
		'		<span class = "trade0">' + contractCode + '</span>' +
		'		<span class = "trade1">' + drectionText + '</span>' +
		'      <span class = "trade2">' + tradePrice.toFixed(dotSize) + '</span>' +
		'		<span class = "trade3">' + tradeNum + '</span>' +
		'		<span class = "trade4 dateTimeL">' + tradeTime + '</span>' +
		'	' +
		'	</a>' +
		'</li>';
	$("#Deal").append(html);
	//tabOn();
	addTradeSuccessBindClick(cls);
	updateTradesIndex();
};
/**
 * 更新持仓合计
 * 
 * @param holdTotal	根据持仓合计推送信息更新持仓列表
 */
function updateHoldTotal(holdTotal) {
	var holdNum = parseInt(holdTotal.HoldNum);
	var commdityNo = holdTotal.CommodityNo;
	var contractNo = holdTotal.ContractNo;
	var contractCode = commdityNo + contractNo;
	if(holdNum == 0) { // 如果持仓手数为0则删除
		delPositionDom(contractCode);
		deletePositionsContractCode(contractCode);
		return;
	}

	// 无持仓：新增
	if(!validationPostionIsExsit(contractCode)) {
		addPostion(holdTotal);
	} else { // 有持仓：修改
		var drection = holdTotal.Drection;
		var holdAvgPrice = holdTotal.HoldAvgPrice;
		var $holdNum = $("li[data-tion-position='" + contractCode + "'] span[class = 'position2']");
		var $drection = $("li[data-tion-position='" + contractCode + "'] span[class = 'position1']");
		var $holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");

		// 持仓数量、方向、均价
		var drectionText = analysisBusinessDirection(drection);
		$holdNum.text(holdNum);
		$drection.html(drectionText);
		$drection.attr("data-drection", drection);

		holdAvgPrice = fixedPrice(holdAvgPrice, commdityNo, contractNo);
		$holdAvgPrice.text(holdAvgPrice);

		// 初始化浮动盈亏
		var floatingProft = 0.00;
		var floatP = 0.00;
		var localCommodity = getMarketCommdity(contractCode);
		if(localCommodity != undefined) {
			var localQuote = getLocalCacheQuote(contractCode);
			var contractSize = localCommodity.ContractSize;
			var miniTikeSize = localCommodity.MiniTikeSize;
			var currencyNo = localCommodity.CurrencyNo;
			floatP = doGetFloatingProfit(parseFloat(localQuote.LastPrice), holdAvgPrice, contractSize, miniTikeSize, holdNum, drection);
			if(isNaN(floatP)) {
				floatP = 0.00;
			}
			floatingProft = floatP + ":" + currencyNo;
		}
		var $floatP = $("li[data-tion-position='" + contractCode + "'] span[class = 'position8']");
		var $floatingProfit = $("#floatValue" + contractCode);

		$floatP.text(floatP);
		$floatingProfit.val(floatingProft);
		if(floatP < 0) {
			$floatingProfit.css("color", "green");
		} else if(floatP > 0) {
			$floatingProfit.css("color", "red");
		} else {
			$floatingProfit.css("color", "white");
		}

		//更新储存数据
		var postContract = localCachePostion[contractCode];
		postContract.holdNum = holdNum;
		postContract.drection = drectionText;
	}

}
/**
 * 缓存持仓的列表信息
 */
var localCachePostion = {};
/**
 * 缓存持仓列表品种+合约
 */
var localCachePositionContractCode = {};
/**
 * 全局的保存当前选中持仓的信息
 */
var selectPostion = {};
/**
 * 持仓信息的索引
 */
var postionIndex = 0;
/**
 * 重新加载最新持仓信息数据的保存
 */
var localCachePositionRecentData = {};
/**
 * 增加持仓信息
 * @param param
 */
function addPostion(param) {
	if(isJson(param)) {
		var accoutNo = param.AccountNo;
		var contractCode = param.ContractCode;
		var holdNum = param.HoldNum;
		var drection = param.Drection;
		var drectionText = analysisBusinessDirection(drection);
		var dotSize = 2;
		var Dosize = getMarketCommdity(contractCode);
		if(Dosize != undefined) {
			dotSize = Number(Dosize.DotSize);
		}
		var holdAvgPrice = param.HoldAvgPrice;
		var floatingProfit = param.FloatingProfit;
		var exchangeNo = param.ExchangeNo;
		var currencyNo = param.CurrencyNo;
		var commodityNo = param.CommodityNo;
		var contractNo = param.ContractNo;
		var openAvgPrice = param.OpenAvgPrice;
		if(holdNum == undefined) {
			holdNum = param.TradeNum;
		}
		if(openAvgPrice == undefined) {
			openAvgPrice = param.TradePrice;
		}
		if(holdAvgPrice == undefined) {
			holdAvgPrice = openAvgPrice;
		}
		var floatP = 0.00;
		var contractAndCommodity = commodityNo + contractNo;
		var localCommodity = getMarketCommdity(contractAndCommodity);
		if(localCommodity != undefined) {
			var lastPrice = getLocalCacheQuote(contractAndCommodity);
			var contractSize = localCommodity.ContractSize;
			var miniTikeSize = localCommodity.MiniTikeSize;
			currencyNo = localCommodity.CurrencyNo;
			exchangeNo = localCommodity.ExchangeNo;

			floatP = doGetFloatingProfit(parseFloat(lastPrice), holdAvgPrice, contractSize, miniTikeSize, holdNum, drection);
			if(isNaN(floatP)) {
				floatP = 0.00;
			}
			floatingProfit = floatP + ":" + currencyNo;
		}
		if(floatingProfit == undefined) {
			floatingProfit = 0;
		}
		if(currencyNo == undefined) {
			currencyNo = "";
		}
		var currcls = "position-currency" + currencyNo;
		var cls = "postion-index" + postionIndex;
		var clspo = 'position-index' + postionIndex;
		console.log()
		console.log(floatP);
		var html = '<li   class = "' + cls + ' ' + clspo + ' ' + currcls + ' tab_position PositionLi myLi"  data-index-position = "' + postionIndex + '" data-tion-position = "' + contractCode + '" id = "' + contractCode + '">' +
			'<a class="mui-navigate-right" >' +
			'		' +
			'			<span class = "position0">' + contractCode + '</span>' +
			'			<span class = "position1" data-drection = ' + drection + '>' + drectionText + '</span>' +
			'			<span class = "position2">' + holdNum + '</span>' +
			'			<span class = "position3">' + parseFloat(holdAvgPrice).toFixed(dotSize) + '</span>' +
			'			<span class = "position4 dateTimeL"><input readonly = "readonly" type="text" value = "' + floatingProfit + '" style="border-left:0px;border-top:0px;border-right:0px;border-bottom:1px ;background-color:transparent;font-size:12px;width:160px;" id = "floatValue' + contractCode + '" /></span>' +
			'			<span class = "position5" style = "display:none">' + commodityNo + '</span>' +
			'			<span class = "position6" style = "display:none">' + contractNo + '</span>' +
			'         <span class = "position7" style = "display:none">' + exchangeNo + '</span>' +
			'			<span class = "position8" style = "display:none">' + floatP + '</span>' +
			'     	<span class = "position9" style = "display:none">' + currencyNo + '</span>' +
			'     	<span class = "position10" style = "display:none">' + accoutNo + '</span>' +
			'		' +
			'	</a>' +
			'</li>';
		$("#positionList").append(html);
		/*tabOn();*/
		//存储数据
		localCachePostion[contractCode] = createPostionsParam(param);
		localCachePositionContractCode[postionIndex] = contractCode;
		addPositionBindClick(cls);
		updatePositionIndex();
	}
}
/**
 * 更新持仓信息
 * @param param
 */
function updatePostion(param) {
	var contractCode = param.ContractCode;
	var holdNum = parseInt(param.HoldNum);
	var drection = param.Drection;
	var holdAvgPrice = param.HoldAvgPrice;
	var exchangeNo = param.ExchangeNo;
	var currencyNo = param.CurrencyNo;
	var openAvgPrice = param.OpenAvgPrice;
	if(isNaN(holdNum)) {
		holdNum = parseInt(param.TradeNum);
	}
	if(openAvgPrice == undefined) {
		openAvgPrice = param.TradePrice;
	}
	var localCommodity = getMarketCommdity(contractCode);
	var doSize = 0;
	if(localCommodity != undefined) {
		doSize = Number(localCommodity.DotSize);
	}
	var $holdNum = $("li[data-tion-position='" + contractCode + "'] span[class = 'position2']");
	var $drection = $("li[data-tion-position='" + contractCode + "'] span[class = 'position1']");
	var $holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");
	var $floatP = $("li[data-tion-position='" + contractCode + "'] span[class = 'position8']");
	var $floatingProfit = $("#floatValue" + contractCode);
	var oldHoldNum = parseInt($holdNum.text());
	var oldDrection = parseInt($drection.attr("data-drection"));
	var oldPrice = parseFloat($holdAvgPrice.text()).toFixed(doSize) * oldHoldNum;
	var price = parseFloat(openAvgPrice).toFixed(doSize) * holdNum;
	if(oldDrection == drection) {
		oldHoldNum = oldHoldNum + holdNum;
		price = parseFloat(price + oldPrice).toFixed(doSize);

		var openAvgPrice = doGetOpenAvgPrice(price, oldHoldNum, doSize);
		$holdAvgPrice.text(openAvgPrice);
		var commdityNo = param.CommodityNo;
		var contractNo = param.ContractNo;
		var floatingProft = 0.00;
		var floatP = 0.00;
		var contractAndCommodity = commdityNo + contractNo;
		var localCommodity = getMarketCommdity(contractAndCommodity);
		if(localCommodity != undefined) {
			var lastPrice = getLocalCacheQuote(contractAndCommodity);
			var contractSize = localCommodity.ContractSize;
			var miniTikeSize = localCommodity.MiniTikeSize;
			var currencyNo = localCommodity.CurrencyNo;
			floatP = doGetFloatingProfit(parseFloat(lastPrice), openAvgPrice, contractSize, miniTikeSize, holdNum, drection);
			if(isNaN(floatP)) {
				floatP = 0.00;
			}
			floatingProft = floatP + ":" + currencyNo;
		}
		$floatingProfit.val(floatingProft);
		$floatP.text(floatP);
		if(floatP < 0) {
			$floatingProfit.css("color", "green");
		} else if(floatP > 0) {
			$floatingProfit.css("color", "red");
		} else {
			$floatingProfit.css("color", "white");
		}
	} else {
		oldHoldNum = oldHoldNum - holdNum;
		//当持仓为空时，清理dom节点和存储数据
		if(oldHoldNum == 0) {
			delPositionDom(contractCode);
			deletePositionsContractCode(contractCode);
			//当drection为0时，上一次更新数据为’多‘，holdNum 小于0时表示这次这次更新数据买卖方向变为’空‘
		} else if(oldHoldNum < 0 && oldDrection == 0) {
			drectionText = kong;
			drection = 1;
			//当drection为1时，上一次数据更新为’空‘，holdNum小于0时表示这次更新数据买卖方向变为’多‘
		} else if(oldHoldNum < 0 && oldDrection == 1) {
			drectionText = duo;
			drection = 0;
		} else if(oldHoldNum > 0 && oldDrection == 0) {
			drectionText = duo;
			drection = 0;
		} else if(oldHoldNum > 0 && oldDrection == 1) {
			drectionText = kong;
			drection = 1;
		}
	}
	if(oldHoldNum != 0) {
		var drectionText = analysisBusinessDirection(drection);
		$holdNum.text(Math.abs(oldHoldNum));
		$drection.html(drectionText);
		$drection.attr("data-drection", drection);
		//更新储存数据
		var postContract = localCachePostion[contractCode];
		postContract.holdNum = oldHoldNum;
		postContract.drection = drectionText;
	}
}
/**
 * 缓存最新持仓信息
 * @param param
 */
function loadCachecentPositionData(param) {
	var commodityNo = param.CommodityNo;
	var contractNo = param.ContractNo;
	var contractCode = commodityNo + contractNo;
	var cache = localCachePositionRecentData[contractCode];
	if(cache == undefined) {
		var array = new Array();
		array[0] = param;
		localCachePositionRecentData[contractCode] = array;
	} else {
		cache[cache.length] = param;
	}
}
/**
 * 交易成功更新持仓信息(计算开仓（持仓）均价)
 */
function updateOrderUpdatePosition(param) {
	$(".tab_position").each(function() {
		var $this = $(this);
		var contractCode = $this.attr("data-tion-position");
		var cache = localCachePositionRecentData[contractCode];
		if(cache == undefined) {
			delPositionDom(contractCode);
			deletePositionsContractCode(contractCode);
		} else {
			var length = cache.length;
			var price = 0.00;
			var holdNum = 0;
			for(var i = 0; i < length; i++) {
				var data = cache[i];
				holdNum = holdNum + data.HoldNum;
				price = price + data.HoldAvgPrice * data.HoldNum;
			}
			var localCommodity = getMarketCommdity(contractCode);
			var doSize = 2;
			if(localCommodity != undefined) {
				doSize = Number(localCommodity.DotSize);
			}
			var holdAvgPrice = doGetOpenAvgPrice(price, holdNum, doSize);
			var $openAvgPrice = $("ul[data-tion-position='" + contractCode + "'] li[class = 'position3']");
			var $holdNum = $("ul[data-tion-position='" + contractCode + "'] li[class = 'position2']");
			$openAvgPrice.text(holdAvgPrice);
		}
	});
}
/**
 * 根据行情更新持仓列表
 * @param param
 */
function updatePositionByQuote(param) {
	var commodityNo = param.CommodityNo;
	var contractNo = param.ContractNo;
	var currencyNo = param.CurrencyNo;
	var exchangeNo = param.ExchangeNo;
	var contractCode = commodityNo + contractNo;
	var positionDom = $("li[data-tion-position='" + contractCode + "']");
	if(positionDom.html() == undefined) {
		return;
	}
	var localCommodity = getLocalCacheCommodity(contractCode);
	if(localCommodity != undefined) {
		currencyNo = localCommodity.CurrencyNo;
	}
	var $exchangeNo = $("li[data-tion-position='" + contractCode + "'] span[class = 'position7']");
	var $currencyNo = $("li[data-tion-position='" + contractCode + "'] span[class = 'position9']");
	var $commodityNo = $("li[data-tion-position='" + contractCode + "'] span[class = 'position5']");
	var $contractNo = $("li[data-tion-position='" + contractCode + "'] span[class = 'position6']");
	$exchangeNo.text(exchangeNo);
	$currencyNo.text(currencyNo);
	$commodityNo.text(commodityNo);
	$contractNo.text(contractNo);
}
/**
 * 根据行情更新挂单列表
 * @param param
 */
function updateDesignateByQuote(param) {
	var commodityNo = param.CommodityNo;
	var contractNo = param.ContractNo;
	var exchangeNo = param.ExchangeNo;
	var contractCode = commodityNo + contractNo;
	var designateDom = $("li[data-tion-des='" + contractCode + "']");
	if(designateDom.html() == undefined) {
		return;
	}
	var $exchangeNo = $("li[data-tion-des='" + contractCode + "'] span[class = 'desig9']");
	var $commodityNo = $("li[data-tion-des='" + contractCode + "'] span[class = 'desig7']");
	var $contractNo = $("li[data-tion-des='" + contractCode + "'] span[class = 'desig8']");
	$commodityNo.text(commodityNo);
	$contractNo.text(contractNo);
	$exchangeNo.text(exchangeNo);
}
/**
 * 增加止损录入单的列表
 * @param {Object} param
 */
/**
 * 止损单的索引
 */
var stoplossIndex = 0;
/**
 * 缓存选中的止损单列
 */
var selectStopLoss = {};
/**
 * 缓存止损单的信息
 */
var localCahceStopLossNo = {};
/**
 * 全局保存选中止损单的操作类型 0 - 修改，1-删除 ， 2-暂停
 */
var operationStopLossType = undefined;

function appendStopLossData(param) {
	var contractCode = param.CommodityNo + param.ContractNo;
	var stopLossNo = param.StopLossNo;
	var status = param.Status;
	var statusText = analysisStopLossStatus(status);
	var exchangeNo = param.ExchangeNo;
	var num = param.Num;
	var stopLossType = param.StopLossType;
	var stopLossTypeText = analysisStopLossType(stopLossType);
	var orderType = param.OrderType;
	var orderTypeText = lossOrderType(orderType);
	var holdAvgPrice = param.HoldAvgPrice;
	var holdDrection = param.HoldDrection;
	var holdDrectionText = analysisBusinessDirection(holdDrection);
	var insertTime = param.InsertDateTime;
	var dynamicPrice = param.DynamicPrice;
	var stopLossPrice = param.StopLossPrice;
	stopLossPrice = parseFloat(stopLossPrice).toFixed(getMarketCommdity(contractCode).DotSize);
	var stopLossDiff = param.StopLossDiff;
	stopLossDiff = parseFloat(stopLossDiff).toFixed(getMarketCommdity(contractCode).DotSize);
	var stopLossPriceText = "触发价:";
	if(stopLossType == 2) {
		stopLossPriceText = "追踪价差:";
		stopLossPrice = stopLossDiff;
	}
	var cls = "stoploss-00" + stoplossIndex;
	var html = '<tr class="testclick1 ' + cls + '" data-tion-index = "' + stoplossIndex + '" id = "' + stopLossNo + '">' +
		'	<td class = "stoploss0">' + contractCode + '</td>' +
		'  <td class = "stoploss1" data-tion-status="' + status + '">' + statusText + '</td>' +
		'	<td class = "stoploss2" data-tion-drection="' + holdDrection + '">' + holdDrectionText + '</td>' +
		'	<td class = "stoploss3" data-tion-lossType="' + stopLossType + '">' + stopLossTypeText + '</td>' +
		'	<td class = "stoploss4">' + num + '</td>' +
		'	<td class = "stoploss5" data-tion-price="' + stopLossPrice + '">' + stopLossPriceText + stopLossPrice + '</td>' +
		'	<td class = "stoploss6" data-tion-orderType = "' + orderType + '">' + orderTypeText + '</td>' +
		'	<td class = "stoploss9">永久有效</td>' +
		'	<td class = "stoploss7">' + insertTime + '</td>' +
		'  <td class = "stoploss8" style = "display:none;">' + stopLossDiff + '</td>' +
		'</tr>';
	
	
	if(status == 0 || status == 1) {
		$("#clickTableBody").append(html);
		addStopLossBindClick(cls);
	} else if(status == 2 || status == 3 || status == 4 || status == 5) {
		$("#over-clickTableBody").append(html);
	}
	stoplossIndex++;
	localCahceStopLossNo[stopLossNo] = param;
}
/**
 * 更新止损单信息
 * @param {Object} param
 */
function updateStopLossData(param) {
	var stopLossNo = param.StopLossNo;
	var contractCode = param.CommodityNo + param.ContractNo;
	var stopLossNo = param.StopLossNo;
	var status = param.Status;
	var statusText = analysisStopLossStatus(status);
	var exchangeNo = param.ExchangeNo;
	var num = param.Num;
	var stopLossType = param.StopLossType;
	var stopLossTypeText = analysisStopLossType(stopLossType);
	var stopLossDiff = param.StopLossDiff;
	var orderType = param.OrderType;
	var orderTypeText = lossOrderType(orderType);
	var holdAvgPrice = param.HoldAvgPrice;
	var holdDrection = param.HoldDrection;
	var holdDrectionText = analysisBusinessDirection(holdDrection);
	var insertTime = param.InsertDateTime;
	var dynamicPrice = param.DynamicPrice;
	var stopLossPrice = param.StopLossPrice;
	var stopLossPriceText = "触发价:";
	if(stopLossType == 2) {
		stopLossPriceText = "追踪价差:";
		stopLossPrice = stopLossDiff;
	}
	var $status = $("#" + stopLossNo + " td[class = 'stoploss1']");
	var $holdDrection = $("#" + stopLossNo + " td[class = 'stoploss2']");
	var $stopLossType = $("#" + stopLossNo + " td[class = 'stoploss3']");
	var $num = $("#" + stopLossNo + " td[class = 'stoploss4']");
	var $stopLossPrice = $("#" + stopLossNo + " td[class = 'stoploss5']");
	var $orderType = $("#" + stopLossNo + " td[class = 'stoploss6']");
	var $insertTime = $("#" + stopLossNo + " td[class = 'stoploss7']");
	$status.text(statusText);
	$status.attr("data-tion-status", status);
	$holdDrection.html(holdDrectionText);
	$holdDrection.attr("data-tion-drection", holdDrection);
	$stopLossType.text(stopLossTypeText);
	$stopLossType.attr("data-tion-lossType", stopLossType);
	$num.text(num);
	$stopLossPrice.attr("data-tion-price", stopLossPrice);
	stopLossPrice = parseFloat(stopLossPrice).toFixed(getMarketCommdity(contractCode).DotSize);
	$stopLossPrice.text(stopLossPriceText + stopLossPrice);
	$orderType.text(orderTypeText);
	$insertTime.text(insertTime);
	if(status == 2 || status == 3 || status == 4 || status == 5) {
		var html = $("#" + stopLossNo).html();
		$("#over-clickTableBody").append("<tr class = 'testclick1' id = '" + stopLossNo + "'>" + html + "</tr>");
		$("#" + stopLossNo).remove();
		isTableIndex = true;
		selectStopLoss = {};
	} else {
		if(status == 0) {
			$("#suspendCondition1").val(2);
			$("#suspendCondition1").text("暂停");
		} else if(status == 1) {
			$("#suspendCondition1").val(3);
			$("#suspendCondition1").text("启动");
		}
	}
}
/**
 * 增加条件单
 * @param {Object} param
 */
/**
 * 条件单列表索引
 */
var conditionIndex = 0;
/**
 * 缓存的条件单信息
 */
var localCacheCondition = {};
/**
 * 缓存选定的列表数据
 * @param {Object} param
 */
var selectCondition = {};
/**
 * 条件单操作标识：0-修改 1-删除 2-暂停 3-启动
 */
var operateConditionType = undefined;

function appendCondition(param) {
	var commodityNo = param.CommodityNo;
	var contractNo = param.ContractNo;
	var exchangeNo = param.ExchangeNo;
	var conditionNo = param.ConditionNo;
	var status = param.Status;
	var statusText = analysisConditionStatus(status);
	var num = param.Num;
	var contractCode = commodityNo + contractNo;
	var conditionType = param.ConditionType;
	var conditionTypeText = analysisConditionType(conditionType);
	var priceTriggerPonit = param.PriceTriggerPonit;
	var compareType = param.CompareType
	var compareTypeText = analysisConditionCompareType(compareType);
	var timeTriggerPoint = param.TimeTriggerPoint;
	var abBuyPoint = param.AB_BuyPoint;
	var abSellPoint = param.AB_SellPoint;
	var orderType = param.OrderType;
	var drection = param.Drection;
	var stopLossType = param.StopLossType;
	var stopLossDiff = param.StopLossDiff;
	var stopWinDiff = param.StopWinDiff;
	var insertTime = param.InsertDateTime;
	if(status >= 2) {
		insertTime = param.TriggedTime
	}
	var additionFlag = param.AdditionFlag;
	var additionType = param.AdditionType;
	var additionTypeText = "";
	var additionPrice = param.AdditionPrice;
	if(additionFlag == 1) {
		additionTypeText = "&nbsp;&nbsp;" + analysisConditionCompareType(additionType) + additionPrice;
	}
	if(conditionType == 0) {
		compareTypeText = compareTypeText + priceTriggerPonit;
	} else if(conditionType == 1) {
		timeTriggerPoint = timeTriggerPoint.replace(/-/g, "/");
		compareTypeText = formatDateHHMMSS(new Date(timeTriggerPoint));
		
	}
	compareTypeText = compareTypeText + additionTypeText;
	var inserOrderText = analysisBusinessBuySell(drection) + "," + lossOrderType(orderType) + "," + num + "手";
	var cls = "condition" + conditionIndex;
	var html = '<tr class="testclick tab_condition ' + cls + '" id = "' + conditionNo + '">' +
		'<td class = "condition0">' + contractCode + '</td>' +
		'<td class = "condition1" data-tion-status = "' + status + '">' + statusText + '</td>' +
		'<td class = "condition2" data-tion-conditionType = "' + conditionType + '">' + conditionTypeText + '</td>' +
		'<td class = "condition3" data-tion-compareType = "' + compareType + '">' + compareTypeText + '</td>' +
		'<td class = "condition4">' + inserOrderText + '</td>' +
		'<td class = "condition5">永久有效</td>' +
//		'<td class = "condition6">' + insertTime + '</td>' +
		'<td class = "condition6">' + nullOrInsertTime(insertTime,param.StatusMsg) + '</td>' +
		'</tr>';
	if(status == 0 || status == 1) {
		$("#thodyCondition").append(html);
		addConditionBindClick(cls);
	} else if(status == 2 || status == 3 || status == 4 || status == 5) {
		$("#over-thbodyCondition").append(html);
	}
	localCacheCondition[conditionNo] = param;
	conditionIndex++;
}
/**
 * 修改条件单列表信息
 * @param {Object} param
 */
function updateConditionList(param) {
	var commodityNo = param.CommodityNo;
	var contractNo = param.ContractNo;
	var exchangeNo = param.ExchangeNo;
	var conditionNo = param.ConditionNo;
	var status = param.Status;
	var statusText = analysisConditionStatus(status);
	var num = param.Num;
	var contractCode = commodityNo + contractNo;
	var conditionType = param.ConditionType;
	var conditionTypeText = analysisConditionType(conditionType);
	var priceTriggerPonit = param.PriceTriggerPonit;
	var compareType = param.CompareType
	var compareTypeText = analysisConditionCompareType(compareType);
	var timeTriggerPoint = param.TimeTriggerPoint;
	var abBuyPoint = param.AB_BuyPoint;
	var abSellPoint = param.AB_SellPoint;
	var orderType = param.OrderType;
	var drection = param.Drection;
	var stopLossType = param.StopLossType;
	var stopLossDiff = param.StopLossDiff;
	var stopWinDiff = param.StopWinDiff;
	var insertTime = param.InsertTime;
	var additionFlag = param.AdditionFlag;
	var additionType = param.AdditionType;
	var additionTypeText = "";
	var additionPrice = param.AdditionPrice;
	if(additionFlag == 1) {
		additionTypeText = "&nbsp;&nbsp;" + analysisConditionCompareType(additionType) + additionPrice;
	}
	if(conditionType == 0) {
		compareTypeText = compareTypeText + priceTriggerPonit;
	} else if(conditionType == 1) {
		timeTriggerPoint = timeTriggerPoint.replace(/-/g, "/");
		compareTypeText = formatDateHHMMSS(new Date(timeTriggerPoint));
	}
	compareTypeText = compareTypeText + additionTypeText;
	var inserOrderText = analysisBusinessBuySell(drection) + "," + lossOrderType(orderType) + "," + num + "手";
	$("#" + conditionNo + " td[class = 'condition1']").text(statusText);
	$("#" + conditionNo + " td[class = 'condition1']").attr("data-tion-status", status);
	$("#" + conditionNo + " td[class = 'condition2']").text(conditionTypeText);
	$("#" + conditionNo + " td[class = 'condition2']").attr("data-tion-conditionType", conditionType);
	$("#" + conditionNo + " td[class = 'condition3']").html(compareTypeText);
	$("#" + conditionNo + " td[class = 'condition3']").attr("data-tion-compareType", compareType);
	$("#" + conditionNo + " td[class = 'condition4']").text(inserOrderText);
	if(status == 2 || status == 3 || status == 4 || status == 5) {
		var html = $("#" + conditionNo).html();
		$("#over-thbodyCondition").append("<tr class = 'testclick1' id = '" + conditionNo + "'>" + html + "</tr>");
		$("#" + conditionNo).remove();
		selectCondition = {};
	} else {
		if(status == 0) {
			$("#suspendCondition").val(2);
			$("#suspendCondition").text("暂停");
		} else if(status == 1) {
			$("#suspendCondition").val(3);
			$("#suspendCondition").text("启动");
		}
	}
	localCacheCondition[conditionNo] = param;
}
/**
 * 验证持仓信息是否存在 
 */
function validationPostionIsExsit(contractCode) {
	var positionParam = localCachePostion[contractCode];
	if(positionParam == undefined || positionParam == "undefined" || positionParam == null || $("ul[data-tion-position='" + contractCode + "']").html == undefined) {
		return false;
	} else {
		return true;
	}
}
/**
 * 验证资金明细是否存在 
 */
function validationFundDetailsIsExsit(param) {
	var currencyNo = param.CurrencyNo;
	var fundDetails = localCacheFundDetail[currencyNo];
	if(fundDetails == undefined || fundDetails == "undefined" || fundDetails == null) {
		return true;
	} else {
		return false;
	}
}
/**
 * 生成持仓信息表头
 */
function generatePostionTitle() {
	var html = '<ul class="tab_lis">' +
		'	<li class="ml" style="width: 80px;">合约代码</li>' +
		'	<li style="width: 80px;">持仓数量</li>' +
		'	<li style="width: 80px;">买卖</li>' +
		'	<li style="width: 100px;">持仓均价</li>' +
		'	<li style="width: 160px;">浮动盈利</li>' +
		'	<li style="width: 80px;">交易所</li>' +
		'	<li style="width: 80px;">币种</li>' +
		'</ul>';
	$("#hold_gdt1").html(html);
}
/**
 * 生成委托信息表头
 */
function generateOrderTitle() {
	var html = '<ul class="tab_lis">' +
		'	<li class="ml">合约代码</li>' +
		'	<li  style = "width:50px;">买卖</li>' +
		'	<li  style="width: 50px;">委托价</li>' +
		'	<li style = "width:70px;">委托量</li>' +
		'	<li style="width: 70px;">订单类型</li>' +
		'	<li  style="width: 70px;">委托状态</li>' +
		'	<li style = "width:70px;" >成交均价</li>' +
		'	<li style = "width:50px;"  >成交量</li>' +
		'	<li style = "width:120px;">撤单时间</li>' +
		'	<li style = "width:80px;">订单号</li>' +
		'   <li style="width: 80px;">反馈信息</li>' +
		'</ul>';
	$("#order_gdt1").html(html);
}
/**
 * 生成挂单信息表头
 */
function generateDesignateTitle() {
	var html = '<ul class="tab_lis">' +
		'	<li class="ml">合约代码</li>' +
		'	<li>合约名称</li>' +
		'	<li>买卖</li>' +
		'	<li  style="width: 120px;">委托价</li>' +
		'	<li>委托量</li>' +
		'	<li>挂单量</li>' +
		'</ul>';
	$("#des_gdt1").html(html);
}
/**
 * 生成成交记录表头
 */
function generateTradeSuccessTitle() {
	var html = '<ul class="tab_lis">' +
		'	<li class="ml">合约代码</li>' +
		'	<li  style="width: 40px;">买卖</li>' +
		'	<li  style="width: 70px;">成交均价</li>' +
		'	<li  style="width: 50px;">成交量</li>' +
		/*'	<li  style="width: 70px;">币种</li>'+*/
		'	<li  style="width: 250px;">成交编号</li>' +
		'	<li  style="width: 80px;">订单号</li>' +
		'	<li  style="width: 120px;">成交时间</li>' +
		'	<li  style="width: 40px;">交易所</li>' +
		'</ul>';
	$("#trade_gdt1").append(html);
}
/**
 * 生成资金明细表头
 */
function generateAccountTitle() {
	var html = '<ul class="tab_lis">' +
		'	<li class="ml">币种</li>' +
		'	<li>今权益</li>' +
		'	<li>今可用</li>' +
		'	<li>保证金</li>' +
		'	<li>今日浮盈</li>' +
		'	<li>维持保证金</li>' +
		'	<li>昨权益</li>' +
		'	<li>昨结存</li>' +
		'	<li>今结存</li>' +
		'	<li>冻结资金</li>' +
		'	<li>盈利率</li>' +
		'</ul>';
	$("#account_gdt1").append(html);
}
/**
 * 生成持仓操作节点
 */
function generateHoldHandleDom() {
	var html = '<ul class="caozuo" style = "display:none;">' +
		'	<li><a href="javascript:void(0);" id = "allPosition">全部平仓</a></li>' +
		'	<li><a href="javascript:void(0);" id = "aPosition">平仓</a></li>' +
		'	<li><a href="javascript:void(0);" id = "positionBckhand">反手</a></li>' +
		'</ul>';
	$("#hold_title").append(html);
}
/**
 * 生成挂单操作节点
 */
function generateDesHandleDom() {
	var html = '<ul class="caozuo"  style = "display:none;">' +
		'	<li><a href="javascript:void(0);" id = "allDesOrder">全撤</a></li>' +
		'	<li><a href="javascript:void(0);" id = "desOrder">撤单</a></li>' +
		'	<li><a href="javascript:void(0);" id = "updateDesOrder">改单</a></li>' +
		'</ul>';
	$("#des_title").append(html);
}
/**
 * 绑定持仓列表的点击事件
 * @param str
 */
function addPositionBindClick(cls) {
	$("." + cls + "").bind("click", function() {
		var $this = $(this);
		selectPostion["contractCode"] = $this.attr("data-tion-position");
		selectPostion["postionIndex"] = $this.attr("data-index-position");
		$this.addClass("toggleClassBack").siblings().removeClass("toggleClassBack");
	});
}
/**
 * 绑定委托点击事件
 * @param {Object} cls
 */
function addOrderBindClick(cls) {
	$(function() {
		$("." + cls + "").bind("click", function() {
			var $this = $(this);
			$this.addClass("toggleClassBack").siblings().removeClass("toggleClassBack");
		});
	});
}
/**
 * 绑定挂单点击事件
 * @param {Object} cls
 */
function addDesignateBindClick(cls) {
	$(function() {
		$("." + cls + "").bind("click", function() {
			var $this = $(this);
			$this.addClass('selected');
			$this.siblings().removeClass('selected');
			var orderId = $this.attr("data-order-des");
			selectDesgnate["contraction"] = $this.attr("data-tion-des");
			selectDesgnate["designateIndex"] = $this.attr("data-index-des");
			var orderPrice = $("li[data-order-des='" + orderId + "'] span[class = 'desig2']").text();
			var orderNum = $("li[data-order-des='" + orderId + "'] span[class = 'desig3']").text();
			var orderId = $("li[data-order-des='" + orderId + "'] span[class = 'desig10']").text();
			selectDesgnate["orderPrice"] = orderPrice;
			selectDesgnate["orderNum"] = orderNum;
			selectDesgnate["orderId"] = orderId;
			$this.addClass("toggleClassBack").siblings().removeClass("toggleClassBack");
		});
	});
}
/**
 * 绑定交易成功点击事件
 * @param cls
 */
function addTradeSuccessBindClick(cls) {
	$(function() {
		$("." + cls + "").bind("click", function() {
			var $this = $(this);
			$this.addClass("toggleClassBack").siblings().removeClass("toggleClassBack");
		});
	});
}
/**
 * 绑定资金明细点击事件
 * @param cls
 */
function addFundDetailBindClick(cls) {
	$(function() {
		$("." + cls + "").bind("click", function() {
			var $this = $(this);
			$this.addClass("toggleClassBack").siblings().removeClass("toggleClassBack");
		});
	});
}
/**
 * 绑定止损单列表点击事件
 * @param {Object} cls
 */
var num = 0;

function addStopLossBindClick(cls) {
	$("." + cls).on("tap", function() {
		var $this = $(this);
		selectStopLoss["stopLossNo"] = $this.attr("id");
		var status = $("#" + selectStopLoss["stopLossNo"] + " td[class = 'stoploss1']").attr("data-tion-status");
		if(status == 0) {
			$("#suspendCondition1").val(2);
			$("#suspendCondition1").text("暂停");
		} else if(status == 1) {
			$("#suspendCondition1").val(3);
			$("#suspendCondition1").text("启动");
		}
	});
}
/**
 * 绑定条件单列表点击事件
 * @param {Object} cls
 */
function addConditionBindClick(cls) {
	$("." + cls).bind("click", function() {
		var $this = $(this);
		selectCondition["conditionNo"] = $this.attr("id");
		var status = $("#" + selectCondition["conditionNo"] + " td[class = 'condition1']").attr("data-tion-status");
		if(status == 0) {
			$("#suspendCondition").val(2);
			$("#suspendCondition").text("暂停");
		} else if(status == 1) {
			$("#suspendCondition").val(3);
			$("#suspendCondition").text("启动");
		}
	});
}
/**
 * 更新持仓索引
 */
function updatePositionIndex() {
	postionIndex++;
}
/**
 * 更新委托索引
 */
function updateOrderIndex() {
	orderIndex++;
}
/**
 * 更新挂单索引
 */
function updateDesignateIndex() {
	designateIndex++;
}
/**
 * 更新成交记录索引
 * @returns
 */
function updateTradesIndex() {
	tradesIndex++;
}
/**
 * 更新资金列表索引
 */
function updateFundsDetailsIndex() {
	fundsDetailsIndex++;
}
/**
 * 删除持仓中的元素节点 
 * @param {Object} 删除节点
 */
function delPositionDom(contractCode) {
	$("li[data-tion-position='" + contractCode + "']").remove();
}
/**
 * 删除挂单中的元素节点 
 * @param {Object} orderId
 */
function delDesignatesDom(orderId) {
	$("li[data-order-des='" + orderId + "']").remove();
}
/**
 * 移除全局缓存持仓的品种合约
 * @param {Object} param
 */
function deletePositionsContractCode(param) {
	if(!delete localCachePostion[param]) {
		localCachePostion[param] = null;
	}
}
/**
 * 初始化全局缓存持仓合约的对象数组
 */
function deleteAllPositionsLocalCache() {
	localCachePostion = {};
}
/**
 * 初始化缓存持仓列表品种+合约
 */
function deleteAllPositionContractCode() {
	localCachePositionContractCode = {};
}
/**
 * 清除选中的持仓合约
 */
function deleteSelectPostion() {
	selectPostion = {};
}

/**
 * 移除全局缓存挂单的品种合约
 * @param {Object} param
 */
function deleteDesignatesContractCode(param) {
	if(!delete localCacheDesignate[param]) {
		localCacheDesignate[param] = null;
	}
}
/**
 * 初始化全局缓存挂单合约的对象数组
 */
function deleteAllDesgnatesLocalCache() {
	localCacheDesignate = {};
}
/**
 * 初始化缓存挂单列表信息的品种+合约
 */
function deleteAllDesgnatesContractCode() {
	localCachedesignateContractCode = {};
}
/**
 * 清除选中的持仓合约
 */
function deleteSelectDesgnate() {
	selectDesgnate = {};
}

function addBindsss(cls) {
	$("." + cls + "").bind("click", function() {
		var $this = $(this);
		var text = $this.text();
		$("#quotation_account").val(text);
		$("#more_account").css("display", "none");
	});
}
/**
 * 加载持仓的标题
 */
function loadPositionTitle() {
	var html = ' <li class="PositionLi" ><a class="mui-navigate-right"><span>合约名称</span><span>多空</span><span>手数</span><span>持仓均价</span><span class="dateTimeFloat">浮动盈亏</span></a></li>';
	$("#positionList").html(html);
}
/**
 * 加载用户的账户信息
 */
function loadOperateLogin() {
	$.ajax({
		url: basepath + "/user/operateLogin",
		type: "get",
		success: function(result) {
			if(result) {
				var _data = result.data;
				if(_data != undefined) {
					var data = _data.data;
					var dataLength = data.length;
					for(var i = 0; i < dataLength; i++) {
						var _data = data[i];
						var cls = "selectAccount" + i;
						var html = '<p class = "' + cls + '">' + _data.tranAccount + '</p>';
						$("#more_account").append(html);
						addBindsss(cls);
					}
				}
			}
		}
	});
}
/**
 * 条件单操作的类型0-增加，1-修改
 */
var insertConditionCount = 0;
$(function() {
	bindOpertion();
	
	function plusReady(){
		var satartCheckTime = new Date().getTime();
		plus.nativeUI.showWaiting("行情服务器连接中...");
		var checkQuoteConnect = setInterval(function(){
			if (username == null) {	// 不存在账号则不尝试登录
				plus.nativeUI.closeWaiting();
				$("#switchAccount").text("登录账号");
				window.clearInterval(checkQuoteConnect); // 关闭尝试
				return;
			}
			
//			console.log("等待行情连接时间（毫秒）：" + (new Date().getTime() - satartCheckTime));
			if (new Date().getTime() - satartCheckTime >= 6000) {	// 尝试连接超过6秒既重新登录
				window.clearInterval(checkQuoteConnect); // 关闭尝试
				plus.nativeUI.closeWaiting();
				$("#switchAccount").text("登录账号");
				mui.toast("交易服务器连接失败，请重新登录！");
				openLogin();
				return;
			}
			
			// 等待行情连接成功后，连接交易服务器
			if(getQueryCommodityIsFlag()) {
				plus.nativeUI.closeWaiting();  // 关闭行情连接提+示
				plus.nativeUI.showWaiting("交易服务器连接中...");
				
				window.clearInterval(checkQuoteConnect); // 关闭尝试
				
				/**
				 * 初始化交易配置 --> trade.config
				 */
				initTradeConfig();
				validateIsGetVersion();
				getVersion(); // 更新交易连接地址
			}
		}, 500); // 500毫秒尝试一次检查
	}
	if(window.plus){
		plusReady();
	}else{
		document.addEventListener('plusready',plusReady,false);
	}
	
	$("#switchAccount").click(function() {
		if(isLogin) {
			alertProtype("是否切换当前账号", "提示", Btn.confirmedAndCancle(), switchAccount, null, null);
		} else {
			loginOut();
			openLogin();
		}
	});
	$("#choiceStopPrices").change(function() {
		var $this = $(this);
		var val = $this.val();
		if(val == 2) {
			var a0 = $("#stopEvenTd").text();
			var miniTikeSize = CacheQuoteBase11.getCacheContractAttribute(a0.substring(0,a0.length-4),'MiniTikeSize');
			$("#stopChoicePrices1").val(miniTikeSize);
			$("#Increase").val(0);
		} else if(val == 0) {
			$("#stopChoicePrices1").val($("#stopEvenPrice").text());
		}
	});
	$("#choiceStopPrices2").change(function() {
		var $this = $(this);
		var val = $this.val();
		var con = $('#stopEvenTd1').text();
		var miniTikeSize0 = CacheQuoteBase11.getCacheContractAttribute(con.substring(0,con.length-4),'MiniTikeSize');
		var dotSize0 =CacheQuoteBase11.getCacheContractAttribute(con.substring(0,con.length-4),'DotSize'); 
		if(val == 2) {
			
			$("#stopChoicePrices3").val(parseFloat(miniTikeSize0).toFixed(dotSize0));
			$("#Increase2").val(0);
		} else if(val == 0) {
			$("#stopChoicePrices3").val(parseFloat($("#stopEvenPrice1").text()).toFixed(dotSize0));
		}
	});
	$("#chioceTimeAdditional").change(function() {
		var $this = $(this);
		var val = $this.val();
		if(val == -1) {
			$("#ConditoionTimePricesInput").hide();
		} else {
			$("#ConditoionTimePricesInput").show();
		}
	})
	$("#chioceAdditional").change(function() {
		var $this = $(this);
		var val = $this.val();
		if(val == -1) {
			$("#ConditoionPricesInput1").hide();
		} else {
			$("#ConditoionPricesInput1").show();
		}
	})
	/**
	 * 增加止损单监听文本框
	 */
	$("#stopChoicePrices1").bind("input", function() {
		$("#Increase").text(0);
		var contractCode = $("#stopEvenTd").text();
		var localCommodity = getMarketCommdity(contractCode);
		if(localCommodity == undefined) {
			tip("无效的合约");
			return;
		}
		var dotSize = localCommodity.DotSize;
		var holdAvgPrice = $("#stopHoldAvgPrice").val();
		var stopChoicePrices1 = $("#stopChoicePrices1").val();
		if(stopChoicePrices1 <= 0 || stopChoicePrices1.length == 0) {
			tip("请输入正确价格");
			return;
		}
		stopChoicePrices1 = replaceNum(stopChoicePrices1, dotSize);
		var stopEvenPrice = $("#stopEvenPrice").text();
		var stopType = $("#choiceStopPrices").val();
		var stopDrection = $("#stopBorderLeft").attr("data-tion-drection");
		var scale = 0.00;
		if(stopType == 0) {
			/*var chaPrice = stopEvenPrice - stopChoicePrices1;
			if(stopDrection == 0){
				if(chaPrice <= 0){
					tip("输入价格已不合适宜");
					return;
				}
			}else if(stopDrection == 1){
				if(chaPrice >= 0){
					tip("输入价格已不合适宜");
					return;
				}
			}*/
			if(stopDrection == 0) {
				scale = (stopChoicePrices1 - holdAvgPrice) / holdAvgPrice * 100;
			} else if(stopDrection == 1) {
				scale = (stopChoicePrices1 - holdAvgPrice) / holdAvgPrice * 100;
			}
		} else if(stopType == 2) {
			scale = stopChoicePrices1 / stopEvenPrice * 100;
		}
		$("#Increase").text(parseFloat(Math.abs(scale)).toFixed(2) + "%");
		$("#stopChoicePrices1").val(stopChoicePrices1);
	});
	/**
	 * 修改止损单监听文本框
	 */
	$("#stopChoicePrices3").bind("input", function() {
		$("#Increase2").text(0);
		var contractCode = $("#stopEvenTd1").text();
		var localCommodity = getMarketCommdity(contractCode);
		if(localCommodity == undefined) {
			tip("无效的合约");
			return;
		}
		var dotSize = localCommodity.DotSize;
		var holdAvgPrice = $("#stopHoldAvgPrice1").val();
		var stopChoicePrices3 = $("#stopChoicePrices3").val();
		if(stopChoicePrices3 <= 0 || stopChoicePrices3.length == 0) {
			tip("请输入正确价格");
			return;
		}
		stopChoicePrices3 = replaceNum(stopChoicePrices3, dotSize);
		var stopEvenPrice = $("#stopEvenPrice1").text();
		var stopType = $("#choiceStopPrices2").val();
		var stopDrection = $("#stopBorderLeft1").attr("data-tion-drection");
		var scale = 0.00;
		if(stopType == 0) {
			/*var chaPrice = stopEvenPrice - stopChoicePrices3;
			if(stopDrection == 0){
				if(chaPrice <= 0){
					tip("输入价格已不合适宜");
					return;
				}
			}else if(stopDrection == 1){
				if(chaPrice >= 0){
					tip("输入价格已不合适宜");
					return;
				}
			}*/
			if(stopDrection == 0) {
				scale = (stopChoicePrices3 - holdAvgPrice) / holdAvgPrice * 100;
			} else if(stopDrection == 1) {
				scale = (stopChoicePrices3 - holdAvgPrice) / holdAvgPrice * 100;
			}
		} else if(stopType == 2) {
			scale = stopChoicePrices3 / stopEvenPrice * 100;
		}
		$("#Increase2").text(parseFloat(Math.abs(scale)).toFixed(2) + "%");
		$("#stopChoicePrices3").val(stopChoicePrices3);
	});
	/**
	 * 增加止盈 彈框，監聽止盈輸入
	 */
	$("#lossChoicePrices2").bind("input", function() {
		$("#lossIncrease1").text(0);
		var contractCode = $("#lossContractCode").text();
		var localCommodity = getMarketCommdity(contractCode);
		if(localCommodity == undefined) {
			tip("无效的合约");
			return;
		}
		var dotSize = localCommodity.DotSize;
		var lossChoicePrices2 = $("#lossChoicePrices2").val();
		if(lossChoicePrices2 <= 0 || lossChoicePrices2.length == 0) {
			tip("请输入正确价格");
			return;
		}
		lossChoicePrices2 = replaceNum(lossChoicePrices2, dotSize);
		var drection = $("#lossDrection").attr("data-tion-drection");
		var lossEventPrice = $("#lossEventPrice").text();
		var holdAvgPrice = $("#lossHoldAvgPrice").val();
		var chaPrice = lossEventPrice - lossChoicePrices2;
		/*if(drection == 0){
			if(chaPrice >= 0){
				tip("输入价格已不合适宜");
				return;
			}
		}else if(drection == 1){
			if(chaPrice <= 0){
				tip("输入价格已不合适宜");
				return;
			}
		}*/
		var scale = 0.00;
		if(drection == 0) {
			scale = (holdAvgPrice - lossChoicePrices2) / holdAvgPrice * 100;
		} else if(drection == 1) {
			scale = (holdAvgPrice - lossChoicePrices2) / holdAvgPrice * 100;
		}
		$("#lossIncrease1").text(parseFloat(Math.abs(scale)).toFixed(2) + "%");
		$("#lossChoicePrices2").val(lossChoicePrices2);
	});
	/**
	 * 修改止盈单窗口监听输入框
	 */
	$("#uLossPrice").bind("input", function() {
		$("#lossIncrease2").text(0);
		var contractCode = $("#ulossContractCode").text();
		var localCommodity = getMarketCommdity(contractCode);
		if(localCommodity == undefined) {
			tip("无效的合约");
			return;
		}
		var dotSize = localCommodity.DotSize;
		var uLossPrice = $("#uLossPrice").val();
		if(uLossPrice <= 0 || uLossPrice.length == 0) {
			tip("请输入正确价格");
			return;
		}
		uLossPrice = replaceNum(uLossPrice, dotSize);
		var drection = $("#uDrection").attr("data-tion-drection");
		var lossEventPrice = $("#uEvenPrice").text();
		var holdAvgPrice = $("#ulossHoldAvgPrice1").val();
		var chaPrice = lossEventPrice - uLossPrice;
		/*if(drection == 0){
			if(chaPrice >= 0){
				tip("输入价格已不合适宜");
				return;
			} 
		}else if(drection == 1){
			if(chaPrice <= 0){
				tip("输入价格已不合适宜");
				return;
			}
		}*/
		var scale = 0.00;
		if(drection == 0) {
			scale = (holdAvgPrice - uLossPrice) / uLossPrice * 100;
		} else if(drection == 1) {
			scale = (holdAvgPrice - uLossPrice) / uLossPrice * 100;
		}
		$("#lossIncrease2").text(parseFloat(Math.abs(scale)).toFixed(2) + "%");
		$("#uLossPrice").val(uLossPrice);
	});
	$("#chioceContract").change(function() {
		var $this = $(this);
		var contractCode = $this.val();
		var localQuote = getLocalCacheQuote(contractCode);
		
		if(localQuote != undefined) {
//			$('#showConditionPrice').text(parseFloat(localQuote.LastPrice).toFixed(CacheQuoteBase.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4), "DotSize")));
//			$("#ConditoionPricesInput").val(parseFloat(localQuote.LastPrice).toFixed(CacheQuoteBase.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4), "DotSize")));
			var lastprice = CacheQuoteBase00.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4),'LastPrice');
			var dotsize = CacheQuoteBase11.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4),'DotSize')
			$('#showConditionPrice').text(parseFloat(lastprice).toFixed(dotsize));
			$("#ConditoionPricesInput").val(parseFloat(lastprice).toFixed(dotsize));
		}

	});
	$("#chioceContract1").change(function(){
		var $this = $(this);
		var contractCode = $this.val();
		var localQuote = getLocalCacheQuote(contractCode);
		
		if(localQuote != undefined){
			var lastprice = CacheQuoteBase00.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4),'LastPrice');
			var dotsize = CacheQuoteBase11.getCacheContractAttribute(contractCode.substring(0,contractCode.length-4),'DotSize')
			$('#showConditionPrice1').text(parseFloat(lastprice).toFixed(dotsize));
			$("#ConditoionPricesInput").val(localQuote.LastPrice);
		}else{
			
		}
		$("#ConditoionTimePricesInput").val(0);
	});
});
/**
 * 初始化增加条件单弹出框
 */
function initConditionData() {
	var chioceContract = $("#chioceContract").val();
	var localQuote = getLocalCacheQuote(chioceContract);
	if(localQuote != undefined) {
		$('#showConditionPrice').text(parseFloat(localQuote.LastPrice).toFixed(CacheQuoteBase.getCacheContractAttribute(chioceContract.substring(0,2), "DotSize")));
		$('#showConditionPrice1').text(parseFloat(localQuote.LastPrice).toFixed(CacheQuoteBase.getCacheContractAttribute(chioceContract.substring(0,2), "DotSize")));
		$("#ConditoionPricesInput").val(parseFloat(localQuote.LastPrice).toFixed(CacheQuoteBase.getCacheContractAttribute(chioceContract.substring(0,2), "DotSize")));
	}
	var chioceContractTime = $("#chioceContract1").val();
	localQuote = getLocalCacheQuote(chioceContractTime);	
	if(localQuote != undefined) {
		$("#ConditoionTimePricesInput").val(localQuote.LastPrice);	
	}
	$("#chiocePrices").val(0);
	$("#shopDrection").val(0);
	$("#chiocePricesSelect").val(1);
	$("#ConditoionPricesInput3").val(1);
	$("#chioceAdditional").val(-1);
	$("#ConditoionPricesInput1").val("");
	$("#chiocePricesSelectTime").val(1);
	$("#insertTimeInput").val("");
	$("#chioceTimeAdditional").val(-1);
	$("#shopDrectionTime").val(0);
	$("#ConditoionTimeInput").val(1);
	insertConditionCount = 0;
	$("#ConditoionPricesInput1").hide();
	$("#ConditoionTimePricesInput").hide();
	$("#chioceContract").attr("disabled", false);
	$("#chioceContract1").attr("disabled", false);
}

function initSocketTrade() {
	setTradeConfig(tradeWebSocketIsMock);
	/**
	 * 初始化交易
	 */
	initTrade();
}

function selectCommodity(param) {
	var contractCode = param;
	var localCommodity = localCacheCommodity[contractCode];
	var localQoute = localCacheQuote[contractCode];
	var miniTikeSize = localCommodity.MiniTikeSize;
	var lastPrice = localQoute.LastPrice;
	var dotSize = Number(localCommodity.DotSize);
	$("#trade_data #lastPrice").val(lastPrice);
	$("#trade_data #miniTikeSize").val(miniTikeSize);
	$("#trade_data #contractSize").val(localCommodity.ContractSize);
	$("#trade_data #exchangeNo").val(localCommodity.ExchangeNo);
	$("#trade_data #commodeityNo").val(localCommodity.CommodityNo);
	$("#trade_data #contractNo").val(localCommodity.MainContract);
	$("#trade_data #doSize").val(Number(localCommodity.DotSize));
	$("#money_number").val(localQoute.LastPrice);
	$("#commodity_title").text(localCommodity.CommodityName + "  " + contractCode);
	$("#float_buy").text(doGetMarketPrice(lastPrice, miniTikeSize, 0, dotSize));
	$("#float_sell").text(doGetMarketPrice(lastPrice, miniTikeSize, 1, dotSize));
	setMoneyNumberIndex(0);
	var left_xiangmu = $(".futuresList .left_xiangmu");
	left_xiangmu.each(function() {
		left_xiangmu.removeClass('on');
	});
	var obj = $("ul[data-tion-com='" + contractCode + "']");
	obj.addClass('on');
	obj.click();
	setLocalCacheSelect(contractCode);
	clearRightData();
	updateRight(localQoute);
}
/**
 * 绑定交易操作事件
 */
/**
 * 标识是否是改单操作
 * 
 */
var isUpdateOrder = false;
var buyOrderPrice = 0.00;

function bindOpertion() {
	$(".buy").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			if(validationLastPrice()) {
				mui.toast("最新价格错误,请稍后重试!");
				return;
			}
			var $this = $(this);
			var orderNum = $("#orderNumber").val();
			if(orderNumber <= 0) {
				mui.toast("请输入正确的手数");
				return;
			}
			if(orderNumber > 200) {
				mui.toast("最多只能输入200手");
				return;
			}
			var priceType = $("input[type='radio']:checked").val();
			var orderPrice = $("#orderPrice").val();
			var tradeDrection = $this.attr("data-tion-buy");
			var lastPrice = $("#lastPrice").text();
			var miniTikeSize = $("#miniTikeSize").val();
			var commodityNo = $("#commodeityNo").val();
			var contractNo = $("#contractNo").val();
			var dotSize = 2;
			var localCommodity = getMarketCommdity(commodityNo + contractNo);
			if(localCommodity != undefined) {
				dotSize = Number(localCommodity.DotSize);
			}
			if(priceType == 0) {
				if(orderPrice <= 0 || orderPrice.length <= 0) {
					mui.toast("请输入正确的价格");
					return;
				}
			} else if(priceType == 1) {
				orderPrice = doGetMarketPrice(lastPrice, miniTikeSize, tradeDrection, dotSize);
			}
			buyOrderPrice = orderPrice;
			if(priceType == 1) {
				orderPrice = "市价";
			}
			var content = "确认提交订单：【" + commodityNo + contractNo + "】,价格【" + orderPrice + "】,手数【" + orderNum + "】,方向【" + analysisBusinessBuySell(tradeDrection) + "】?";
			alertProtype(content, "确认下单？", Btn.confirmedAndCancle(), doInsertOrder, null, $this);
		}
	});
	$("#allOpen").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var tab_position = $(".tab_position");
			if(tab_position.length <= 0) {
				tip("没有需要平仓的数据");
				return;
			}
			var tipContent = "此操作将平掉持仓列表中所有合约，请您慎重选择。是否确认将所有合约全部平仓？";
			alertProtype(tipContent, "确认全部平仓？", Btn.confirmedAndCancle(), doInsertAllSellingOrder);
		}
	});

	$("#Open").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var contractCode = selectPostion["contractCode"];
			var postionIndex = selectPostion["postionIndex"];
			if(contractCode == undefined || $(".postion-index" + postionIndex + "").html() == undefined) {
				tip("请选择一项需要平仓的数据");
				return;
			}
			var holdNum = $("li[data-tion-position='" + contractCode + "'] span[class = 'position2']").text();
			var tipContent = "确认平仓合约【" + contractCode + "】，价格【市价】，手数【" + holdNum + "】";
			alertProtype(tipContent, "确认平仓？", Btn.confirmedAndCancle(), doInsertSellingOrder);
		}
	});
	$("#positionBckhand").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var contractCode = selectPostion["contractCode"];
			var postionIndex = selectPostion["postionIndex"];
			if(contractCode == undefined || $(".postion-index" + postionIndex + "").html() == undefined) {
				tip("请选择一项需要反手的数据");
				return;
			}
			var tipContent = "确认反手操作合约【" + contractCode + "】";
			tipConfirm(tipContent, doInsertBackhandOrder, cancleCallBack);
		}
	});
	$("#fullWithdrawal").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			if(designateIndex == 0) {
				tip("没有需要撤单的数据");
				return;
			}
			var designateFlag = false;
			for(var i = 0; i < designateIndex; i++) {
				if($(".des-index" + i + "").html() == undefined) {
					continue;
				} else {
					designateFlag = true;
				}
			}
			if(!designateFlag) {
				tip("没有需要撤单的数据");
				return;
			}
			var tipContent = "此操作将撤销挂单中所有合约，请您慎重选择。是否确认将所有合约全部撤销？";
			alertProtype(tipContent, "确认全部撤单？", Btn.confirmedAndCancle(), doInsertAllCancleOrder, cancleCallBack);
		}
	});
	$("#kilAnorder").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var contractCode = selectDesgnate["contraction"];
			var designateIndex = selectDesgnate["designateIndex"];
			if(contractCode == undefined || $(".des-index" + designateIndex + "").html() == undefined) {
				tip("请选择一项需要撤单的数据");
				return;
			}
			var holdNum = selectDesgnate["orderNum"];
			var tipContent = "确认撤单合约【" + contractCode + "】，手数【" + holdNum + "】";
			alertProtype(tipContent, "确认撤单?", Btn.confirmedAndCancle(), doInsertCancleOrder);
		}
	});
	$(".marketBuy").bind("click", function() {
//		if(!mui.cacheUser.isLogin()){
//			mui.confirm("您还未登录平台，请先登录","提示",["确认","取消"],function(e){
//				if (e.index != 1) {
//	                        mui.openWindow({
//	                        	url:"../login/login.html",
//	                        	id:"login.html"
//	                        })
//	                    } 
//			},false)
//		}else if(plus.webview.currentWebview()){
//			mui.app_request("/user/ftrade/list",{stateType:4},function(result){
//				if(result.data.tradeList == ''){
//					mui.confirm("您您还未申请过交易账户开户或已终结开户的方案，请先去申请","提示",['确认','取消'],function(e){
//						if(e.index!=1){
//							mui.openWindow({
//								url:"../future/cp.html",
//								id:"../future/cp.html"
//							})
//						}
//					},false)
//				}else{
//					if(vadationIsLogin()) {
//						var $this = $(this);
//						var lastPrice = $("#freshPrices").text();
//						if(lastPrice <= 0 || lastPrice == undefined || lastPrice == null || isNaN(lastPrice)) {
//							alertProtype("交易错误", "提示", Btn.confirmed());
//							return;
//						}
//						var commodityNo = $("#commodeityNo").val();
//						var contractNo = $("#contractNo").val();
//						var orderNum = $("#orderNum").val();
//						var miniTikeSize = $("#miniTikeSize").val();
//						var orderNum = $("#orderNum").val();
//						if(orderNum <= 0) {
//							mui.toast("请输入正确的手数");
//							return;
//						}
//						if(orderNum > 200) {
//							mui.toast("最多只能输入200手");
//							return;
//						}
//						var drection = $this.attr("data-tion-buy");
//						var localCommodity = getMarketCommdity(commodityNo + contractNo);
//						var dotSize = 2;
//						if(localCommodity != undefined) {
//							dotSize = Number(localCommodity.DotSize);
//						}
//						var limitPrice = doGetMarketPrice(lastPrice, miniTikeSize, drection, dotSize);
//						buyOrderPrice = limitPrice;
//						var content = "确认提交订单：【" + commodityNo + contractNo + "】,价格【市价】,手数【" + orderNum + "】,方向【" + analysisBusinessBuySell(drection) + "】?";
//						var isFlag = alertProtype(content, "确认下单?", Btn.confirmedAndCancle(), marketBuy, null, $this);
//					}
//				}
//			},function(result){
//				return;
//			})
//		}
		if(vadationIsLogin()) {
			var $this = $(this);
			var lastPrice = $("#freshPrices").text();
			if(lastPrice <= 0 || lastPrice == undefined || lastPrice == null || isNaN(lastPrice)) {
				alertProtype("交易错误", "提示", Btn.confirmed());
				return;
			}
			var commodityNo = $("#commodeityNo").val();
			var contractNo = $("#contractNo").val();
			var orderNum = $("#orderNum").val();
			var miniTikeSize = $("#miniTikeSize").val();
			var orderNum = $("#orderNum").val();
			if(orderNum <= 0) {
				mui.toast("请输入正确的手数");
				return;
			}
			if(orderNum > 200) {
				mui.toast("最多只能输入200手");
				return;
			}
			var drection = $this.attr("data-tion-buy");
			var localCommodity = getMarketCommdity(commodityNo + contractNo);
			var dotSize = 2;
			if(localCommodity != undefined) {
				dotSize = Number(localCommodity.DotSize);
			}
			var limitPrice = doGetMarketPrice(lastPrice, miniTikeSize, drection, dotSize);
			buyOrderPrice = limitPrice;
			var content = "确认提交订单：【" + commodityNo + contractNo + "】,价格【市价】,手数【" + orderNum + "】,方向【" + analysisBusinessBuySell(drection) + "】?";
			var isFlag = alertProtype(content, "确认下单?", Btn.confirmedAndCancle(), marketBuy, null, $this);
		}
	})
	$("#changeSingle").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			
			var contractCode = selectDesgnate["contraction"];
			var designateIndex = selectDesgnate["designateIndex"];
			if(contractCode == undefined || $(".des-index" + designateIndex + "").html() == undefined) {
				tip("请选择一项需要改单的数据");
				return;
			}
			var orderPrice;
			var orderNum;
//			var orderPrice = selectDesgnate["orderPrice"];
//			var orderNum = selectDesgnate["orderNum"];
			if($('#postersOrder').children().hasClass('selected')){
				$('#postersOrder').children().each(function(){
					var _this = $(this);
					if(_this.hasClass('selected')){
						orderPrice=_this.children().children('.desig2').text();
						orderNum = _this.children().children('.desig3').text();
					}
				});
			}
			
			if(orderPrice == undefined) {
				orderPrice = 0;
			}
			if(orderNum == undefined) {
				orderNum = 0;
			}
			var col1 = $("#col1");
			var col2 = $("#col2");
			var add_div = $("#add_div");
			//清空数据
			col1.val(orderPrice);
			col2.val(orderNum);
			add_div.removeClass("mui-hidden");
			mui("#popover").popover("toggle");
			
		}
	});
	/**
	 * 添加止损单
	 */
	$("#insertStopData").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var contractCode = selectPostion["contractCode"];
			if(contractCode == undefined) {
				tip("请选择一条信息");
				return;
			}
			var localQuote = getLocalCacheQuote(contractCode);
			if(localQuote == undefined) {
				tip("无效的合约");
				return;
			}
			var lastPrice = $("#stopEvenPrice").text();
			var stopChoicePrices1 = $("#stopChoicePrices1").val();
			var contractObject = getMarketCommdity(contractCode);
			var a0 =  (formatFloat(stopChoicePrices1,contractObject.DotSize)*10000).toFixed(0);
			var b0 = formatFloat(contractObject.MiniTikeSize,contractObject.DotSize)*10000;
			if(stopChoicePrices1 <= 0 || stopChoicePrices1.length == 0) {
				tip("请输入正确的回撤价");
				return;
			}else if(a0%b0!=0){
				tip('不符合最小变动价,请重新输入,最小变动价为:'+contractObject.MiniTikeSize);
				return;
			}
			var stopNumber = $("#stopNumber").val();
			if(isNaN(stopNumber) || stopNumber <= 0 || stopNumber.length == 0) {
				tip("请输入手数");
				return;
			}
			var stopDrection = $("#stopBorderLeft").attr("data-tion-drection");
			var stopLossType = $("#choiceStopPrices").val();
			var stopLossDiff = 0;
			var typeText = "限价止损";
			if(stopLossType == 0) {
				if(stopDrection == 0) {
					if(Number(lastPrice) <= Number(stopChoicePrices1)) {
						tip("输入价格应小于最新价");
						return;
					}
				} else if(stopDrection == 1) {
					if(Number(lastPrice) >= Number(stopChoicePrices1)) {
						tip("输入价格应大于最新价");
						return;
					}
				}
				stopLossDiff = lastPrice - stopChoicePrices1;
			} else if(stopLossType == 2) {
				stopLossDiff = stopChoicePrices1;
				typeText = "动态止损";
			}
			if(stopLossDiff == 0) {
				alertProtype("止损价差会导致立即触发,请重新设置", "提示", Btn.confirmed());
				return;
			}
			alertProtype("是否添加" + typeText, "提示", Btn.confirmedAndCancle(), doGetInsertStopLoss);
		}
	});
	/**
	 * 修改止损-动态单
	 */
	$("#insertStopData1").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var stopLossNo = selectStopLoss["stopLossNo"];
			if(stopLossNo == undefined) {
				tip("请选择一条信息");
				return;
			}
			var contractCode = $("#stopEvenTd1").text();
			var localQuote = getLocalCacheQuote(contractCode);
			if(localQuote == undefined) {
				tip("无效的合约");
				return;
			}
			var lastPrice = $("#stopEvenPrice1").text();
			var stopChoicePrices3 = $("#stopChoicePrices3").val();
			var contractObject = getMarketCommdity(contractCode);
			var a2 = (formatFloat(stopChoicePrices3,contractObject.DotSize)*10000).toFixed(0);
			var b2 = formatFloat(contractObject.MiniTikeSize,contractObject.DotSize)*10000;
			if(stopChoicePrices3 <= 0 || stopChoicePrices3.length == 0) {
				tip("请输入正确的回撤价");
				return;
			}else if(a2%b2!=0){
				tip('止损价不符合最小变动价,最小变动价为:'+contractObject.MiniTikeSize);
				return;
			}
			var stopNumber = $("#stopNumber1").val();
			if(isNaN(stopNumber) || stopNumber <= 0 || stopNumber.length == 0) {
				tip("请输入手数");
				return;
			}
			var stopDrection = $("#stopBorderLeft1").attr("data-tion-drection");
			var stopLossType = $("#choiceStopPrices2").val();
			var stopLossDiff = 0;
			var typeText = "限价止损";
			if(stopLossType == 0) {
				var chaPrice = lastPrice - stopChoicePrices3;
				if(stopDrection == 0) {
					if(chaPrice <= 0) {
						tip("输入价格应小于最新价");
						return;
					}
				} else if(stopDrection == 1) {
					if(chaPrice >= 0) {
						tip("输入价格应大于最新价");
						return;
					}
				}
				stopLossDiff = lastPrice - stopChoicePrices1;
			} else if(stopLossType == 2) {
				stopLossDiff = stopChoicePrices1;
				typeText = "动态止损";
			}
			if(stopLossDiff == 0) {
				alertProtype("止损价差会导致立即触发,请重新设置", "提示", Btn.confirmed());
				return;
			}
			alertProtype("是否修改【" + contractCode + "】" + typeText, "提示", Btn.confirmedAndCancle(), doUpdateModifyStopLoss);
		}
	});
	/**
	 * 添加止盈单
	 */
	$("#insertLossData").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var contractCode = selectPostion["contractCode"];
			if(contractCode == undefined) {
				tip("请选择一条信息");
				return;
			}
			var localQuote = getLocalCacheQuote(contractCode);
			if(localQuote == undefined) {
				tip("无效的合约");
				return;
			}
			var lastPrice = $("#lossEventPrice").text();
			var lossChoicePrices2 = $("#lossChoicePrices2").val();
			var contractObject = getMarketCommdity(contractCode);
			
			var a4 = (formatFloat(lossChoicePrices2,contractObject.DotSize)*10000).toFixed(0);
			var b4 = formatFloat(contractObject.MiniTikeSize,contractObject.DotSize)*10000;
			if(lossChoicePrices2 <= 0 || lossChoicePrices2.length == 0) {
				tip("请输入正确的回撤价");
				return;
			}else if(a4%b4!=0){
				tip('止盈价不符合最小变动价,最小变动价为:'+contractObject.MiniTikeSize);
				return;
			}
			var stopNumber = $("#lossNumber").val();
			if(isNaN(stopNumber) || stopNumber <= 0 || stopNumber.length == 0) {
				tip("请输入手数");
				return;
			}
			var lossDrection = $("#lossDrection").attr("data-tion-drection");
			var stopLossDiff = 0;
			var chaPrice = lastPrice - lossChoicePrices2;
			if(lossDrection == 0) {
				if(chaPrice >= 0) {
					tip("输入价格应大于最新价");
					return;
				}
			} else if(lossDrection == 1) {
				if(chaPrice <= 0) {
					tip("输入价格应小于最新价");
					return;
				}
			}
			stopLossDiff = lossChoicePrices2 - lastPrice;
			if(stopLossDiff == 0) {
				alertProtype("止盈价差会导致立即触发,请重新设置", "提示", Btn.confirmed());
				return;
			}
			alertProtype("是否添加止盈价?", "提示", Btn.confirmedAndCancle(), doGetInsertLossLoss);
		}
	});
	/**
	 * 修改止盈单
	 */
	$("#uinsertLossData1").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var stopLossNo = selectStopLoss["stopLossNo"];
			if(stopLossNo == undefined) {
				tip("请选择一条信息");
				return;
			}
			var contractCode = $("#stopEvenTd1").text();
			var localQuote = getLocalCacheQuote(contractCode);
			if(localQuote == undefined) {
				tip("无效的合约");
				return;
			}
			var lastPrice = $("#uEvenPrice").text();
			var stopChoicePrices3 = $("#uLossPrice").val();
			var contractObject = getMarketCommdity(contractCode);
			var a3 = (formatFloat(stopChoicePrices3,contractObject.DotSize)*10000).toFixed(0);
			var b3 = formatFloat(contractObject.MiniTikeSize,contractObject.DotSize)*10000;
			if(stopChoicePrices3 <= 0 || stopChoicePrices3.length == 0) {
				tip("请输入正确的回撤价");
				return;
			}else if(a3%b3!=0){
				tip('止盈价不符合最小变动价,最小变动价为:'+contractObject.MiniTikeSize);
				return;
			}
			var stopNumber = $("#ulossNumber").val();
			if(isNaN(stopNumber) || stopNumber <= 0 || stopNumber.length == 0) {
				tip("请输入手数");
				return;
			}
			var stopDrection = $("#uDrection").attr("data-tion-drection");
			var chaPrice = lastPrice - stopChoicePrices3;
			if(stopDrection == 0) {
				if(chaPrice >= 0) {
					tip("输入价格应大于最新价");
					return;
				}
			} else if(stopDrection == 1) {
				if(chaPrice <= 0) {
					tip("输入价格应小于最新价");
					return;
				}
			}
			var stopLossDiff = lastPrice - stopChoicePrices1;
			if(stopLossDiff == 0) {
				alertProtype("止盈价差会导致立即触发,请重新设置", "提示", Btn.confirmed());
				return;
			}
			alertProtype("是否修改【" + contractCode + "】止盈单", "提示", Btn.confirmedAndCancle(), doUpdateModifyLoss);
		}
	});
	/**
	 * 赋值，确定操作是修改-删除-暂停
	 */
	$(".updateStopLoss").bind("tap", function() {
		if(vadationIsLoginMuiTip()) {
			var stopLossNo = selectStopLoss["stopLossNo"];
			if(stopLossNo == undefined) {
				tip("请选择一行数据");
				return;
			}
			var $this = $(this);
			var modifyFlag = $this.val();
			var textAll = $("#" + stopLossNo + " td[class = 'stoploss3']").text();
			var textTip = "止损"
			operationStopLossType = modifyFlag;
			var operationText = "";
			if(operationStopLossType == undefined) {
				tip("请重新操作");
				return;
			} else if(operationStopLossType == 0) {
				operationText = "修改";
			} else if(operationStopLossType == 1) {
				operationText = "删除";
			} else if(operationStopLossType == 2) {
				operationText = "暂停";
			} else if(operationStopLossType == 3) {
				operationText = "启动";
			}
			for(var i = 0; i < textList.length; i++) {
				if(textAll.indexOf(textList[i]) >= 0) {
					textTip = textList[i];
				}
			}
			alertProtype("是否" + operationText + textTip + "单？", "提示", Btn.confirmedAndCancle(), doStopAndDelModifyStopLoss);
		}

	});
	/**
	 * 修改止损/止盈单，显示修改止损、止盈单窗口
	 */
	$("#modifyCondition1").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			operationStopLossType = 0;
			var stopLossNo = selectStopLoss["stopLossNo"];
			if(stopLossNo == undefined) {
				tip("请选择一行数据");
				return;
			}
			var status = $("#" + stopLossNo + " td[class = 'stoploss1']").attr("data-tion-status");
			if(status == 0) {
				tip("运行中的止损/止盈单不能修改,请先暂停");
				return;
			}
			var contractCode = $("#" + stopLossNo + " td[class = 'stoploss0']").text();
			var localQuote = getLocalCacheQuote(contractCode);
			if(localQuote == undefined) {
				tip("无效的合约");
				return;
			}
			var holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");
			if(holdAvgPrice == undefined) {
				tip("无效持仓合约");
				return;
			}
			holdAvgPrice = holdAvgPrice.text();
			var stopDrection = $("#" + stopLossNo + " td[class = 'stoploss2']");
			var drection = stopDrection.attr("data-tion-drection");
			var drectionText = stopDrection.text();
			var stopChoicePrices1 = $("#" + stopLossNo + " td[class = 'stoploss5']").attr("data-tion-price");
			var num = $("#" + stopLossNo + " td[class = 'stoploss4']").text();
			var orderType = $("#" + stopLossNo + " td[class = 'stoploss6']").attr("data-tion-orderType");
			var stopEvenPrice = localQuote.LastPrice;
			var stoplossType = $("#" + stopLossNo + " td[class = 'stoploss3']");
			var lossType = stoplossType.attr("data-tion-lossType");
			$("#stopHoldAvgPrice1").val(holdAvgPrice);
			$("#stopEvenTd1").text(contractCode);
			$("#stopBorderLeft1").text(drectionText);
			$("#stopBorderLeft1").attr("data-tion-drection", drection);
			$("#stopEvenPrice1").text(stopEvenPrice);

			$("#stopChoicePrices1").text(stopEvenPrice);
			$("#choiceStopPrices2").val(lossType);
			$("#stopChoicePrices3").val(stopChoicePrices1);
			$("#stopNumber1").val(num);

			$("#stopHoldAvgPrice1").val(holdAvgPrice);
			$("#choiceStopPrices3").val(orderType);
			$("#ulossContractCode").text(contractCode);
			$("#uDrection").text(drectionText);
			$("#uDrection").attr("data-tion-drection", drection);
			$("#uEvenPrice").text(stopEvenPrice);
			$("#uLossPrice").val(stopChoicePrices1);
			$("#ulossNumber").val(num);
			$("#uchoiceLossPrices").val(orderType);
			$("#ulossHoldAvgPrice1").val(stopEvenPrice);
			var scale = 0.00;
			var chaPrice = stopEvenPrice - stopChoicePrices1;
			if(lossType == 0) {
				scale = (holdAvgPrice - stopChoicePrices1) / stopChoicePrices1 * 100;
				$("#Increase2").text(parseFloat(scale).toFixed(2) + "%");
			} else if(lossType == 1) {
				scale = (stopChoicePrices1 - holdAvgPrice) / stopChoicePrices1 * 100;
				$("#lossIncrease2").text(parseFloat(scale).toFixed(2) + "%");
			} else if(lossType == 2) {
				scale = stopChoicePrices1 / stopEvenPrice * 100;
				$("#Increase2").text(parseFloat(scale).toFixed(2) + "%");
			}
			mui("#popoverLoss1").popover("toggle");
			if(lossType == 0 || lossType == 2) {
				$(".ustopTitle").show();
				$(".ulossTitle").hide();
			} else if(lossType == 1) {
				$(".ustopTitle").hide();
				$(".ulossTitle").show();
			}
		}
	});
	/**
	 * 添加条件单(价格条件)
	 */
	$("#insertConditionTable").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var chioceAdditional = $("#chioceAdditional").val();
			var conditoionPricesInput1 = 0;
			var chiocePrices = $("#chiocePrices").val();
			var conditoionPricesInput = $("#ConditoionPricesInput").val();
			if(conditoionPricesInput == null || conditoionPricesInput.length == 0) {
				tip("触发价格错误");
				return;
			}
			if(chioceAdditional != -1) {
				conditoionPricesInput1 = $("#ConditoionPricesInput1").val();
				if(conditoionPricesInput1 <= 0 || conditoionPricesInput1.length == 0) {
					tip("附加触发价格错误");
					return;
				}
				var flag = validationPriceCondition(chiocePrices, conditoionPricesInput, chioceAdditional, conditoionPricesInput1);
				if(!flag) {
					return;
				}
			}
			var conditoionPricesInput3 = $("#ConditoionPricesInput3").val();
			if(conditoionPricesInput3 <= 0 || conditoionPricesInput3.length == 0) {
				tip("手数输入错误");
				return;
			}
			var chioceContract = $("#chioceContract").val();
			var MiniTikeSize = CacheQuoteBase.getCacheContractAttribute(chioceContract.substring(0,chioceContract.length-4), "MiniTikeSize");
			var DotSize = CacheQuoteBase.getCacheContractAttribute(chioceContract.substring(0,chioceContract.length-4), "DotSize");
			var conditoionPricesInput00 = Number(conditoionPricesInput);
			var a = formatFloat(conditoionPricesInput00,DotSize)*10000;
			var b = formatFloat(MiniTikeSize,DotSize)*10000;
			if(parseFloat(a%b).toFixed(5)!=0){
				tip('输入价格不符合最小变动价,最小变动价为:'+MiniTikeSize);
				return;
			}
			
			if(insertConditionCount == 0) {
				alertProtype("你确定要提交【" + chioceContract + "】条件单?", "提示", Btn.confirmedAndCancle(), doInsertConditionByPrice);
			} else if(insertConditionCount == 1) {
				alertProtype("你确定要修改【" + chioceContract + "】条件单?", "提示", Btn.confirmedAndCancle(), doUpdateConditionByPrice);
			}
		}
	});
	/**
	 * 添加条件单(时间条件)
	 */
	$("#insertConditionTable1").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var chioceTimeAdditional = $("#chioceTimeAdditional").val();
			if(chioceTimeAdditional != -1) {
				var conditoionTimePricesInput = $("#ConditoionTimePricesInput").val();
				if(conditoionTimePricesInput <= 0 || conditoionTimePricesInput.length == 0) {
					tip("附加触发价格错误");
					return;
				}
			}
			var ConditoionTimeInput = $("#ConditoionTimeInput").val();
			var inserTimeInput = $("#insertTimeInput").val();
			if(inserTimeInput.length == 0) {
				tip("请选择时间");
				return;
			}
			var flag = validationtimeCondition($("#insertTimeInput").val());
			if(!flag) {
				tip("设置时间必须大于当前时间");
				return;
			}
			if(ConditoionTimeInput <= 0 || ConditoionTimeInput.length == 0) {
				tip("手数输入错误");
				return;
			}
			var chioceContract = $("#chioceContract").val();
			if(insertConditionCount == 0) {
				alertProtype("你确定要提交【" + chioceContract + "】条件单?", "提示", Btn.confirmedAndCancle(), doInsertConditionByTime);
			} else if(insertConditionCount == 1) {
				alertProtype("你确定要修改【" + chioceContract + "】条件单?", "提示", Btn.confirmedAndCancle(), doUpdateConditionByTime);
			}
		}
	});
	/**
	 * 修改条件单显示窗口
	 */
	$("#modifyCondition").bind("click", function() {
		if(vadationIsLoginMuiTip()) {
			var conditionNo = selectCondition["conditionNo"];
			if(conditionNo == undefined) {
				tip("请选择一条数据");
				return;
			}
			var param = localCacheCondition[conditionNo];
			if(param == undefined) {
				tip("无效数据");
				return;
			}
			var conditionType = param.ConditionType;
			var commodityNo = param.CommodityNo;
			var contractNo = param.ContractNo;
			var contractCode = commodityNo + contractNo;
			var num = param.Num;
			var priceTriggerPonit = param.PriceTriggerPonit;
			var compareType = param.CompareType;
			var timeTriggerPoint = param.TimeTriggerPoint;
			var abBuyPoint = param.AB_BuyPoint;
			var abSellPoint = param.AB_SellPoint;
			var orderType = param.OrderType;
			var drection = param.Drection;
			var additionType = param.AdditionType;
			var additionPrice = param.AdditionPrice;
			var df = new Date(timeTriggerPoint);
			var time =timeTriggerPoint.split(" ")[1];
			$("#chioceContract").val(contractCode);
			$("#chiocePrices").val(compareType);
			$("#ConditoionPricesInput").val(priceTriggerPonit);
			$("#shopDrection").val(drection);
			$("#chiocePricesSelect").val(orderType);
			$("#ConditoionPricesInput3").val(num);
			if(additionPrice == undefined || additionPrice == 0 || additionPrice.length == 0) {
				$("#chioceTimeAdditional").val(-1);
				$("#chioceAdditional").val(-1);
				$("#ConditoionPricesInput1").val("");
				$("#ConditoionTimePricesInput").val("");
			} else {
				$("#chioceTimeAdditional").val(additionType);
				$("#chioceAdditional").val(additionType);
				$("#ConditoionPricesInput1").val(additionPrice);
				$("#ConditoionTimePricesInput").val(additionPrice);
			}
			$("#chiocePricesSelectTime").val(orderType);
			$("#chioceContract1").val(contractCode);
			$("#insertTimeInput").val(time);
			$("#shopDrectionTime").val(drection);
			$("#ConditoionTimeInput").val(num);
			insertConditionCount = 1;
			$("#chioceContract").attr("disabled", true);
			$("#chioceContract1").attr("disabled", true);
			if(conditionType == 0) { //价格
				$("#ConditoionTitlePrices").addClass("mui-active");
				$("#plan_conditionTitlePrice").addClass("mui-active").css("display", "table-cell").text("修改条件单");
				$("#plan_conditionTitleTime").removeClass("mui-active").css("display", "none");
				$("#ConditoionTitleTime").removeClass("mui-active");
				$("#insertConditionTable").text("修改");
			} else if(conditionType == 1) { //时间
				$("#plan_conditionTitlePrice").css("display", "none").removeClass("mui-active");
				$("#ConditoionTitlePrices").removeClass("mui-active");
				$("#plan_conditionTitleTime").addClass("mui-active").css("display", "table-cell").text("修改条件单");
				$("#ConditoionTitleTime").addClass("mui-active");
				$("#insertConditionTable1").text("修改");
			}
			mui("#popoverConditoion").popover("toggle");
		}
	});
	/**
	 * 暂停-2，删除-1
	 */
	$(".updateCondition").bind("click", function() {
		var conditionNo = selectCondition["conditionNo"];
		if(conditionNo == undefined) {
			tip("请选择一行数据");
			return;
		}
		var $this = $(this);
		var modifyFlag = $this.val();
		operateConditionType = modifyFlag;
		if(operateConditionType == undefined) {
			tip("请重新操作");
			return;
		}
		var modifyFlagText = "";
		if(operateConditionType == 1) {
			modifyFlagText = "删除";
		} else if(operateConditionType == 2) {
			modifyFlagText = "暂停";
		} else if(operateConditionType == 3) {
			modifyFlagText = "启动";
		}
		alertProtype("是否要" + modifyFlagText + "条件单?", "提示", Btn.confirmedAndCancle(), doUpdateAndDelCondition);
	});
}

$("#add").bind("click", function() {
	var contractCode = selectDesgnate["contraction"];
	var oldOrderPrice = selectDesgnate["orderPrice"];
	var oldOrderNum = selectDesgnate["orderNum"];
	
	var orderPrice = $("#col1").val();
	var orderNum = $("#col2").val();
	var tipContent = "确认将原合约【" + contractCode + "】，价格【" + oldOrderPrice + "】，手数【" + oldOrderNum + "】\n改为：价格【" + orderPrice + "】，手数【" + orderNum + "】";
	alertProtype(tipContent, "确认改单?", Btn.confirmedAndCancle(), doInsertChangeSingleOrder, cancleCallBack);
	var add_div = $("#add_div");
	add_div.addClass("mui-hidden");
	mui("#popover").popover("toggle");
});
/**
 * 显示止损盈亏的窗口
 */
$("#stopLoss").bind("click", function() {
	if(vadationIsLoginMuiTip()) {
		var contractCode = selectPostion["contractCode"];
		if(contractCode == undefined) {
			tip("请选择一条信息");
			return;
		}
		
		var contractCode = selectPostion["contractCode"];
		var postionIndex = selectPostion["postionIndex"];
		if(contractCode == undefined || $(".postion-index" + postionIndex + "").html() == undefined) {
			tip("请选择一项数据");
			return;
		}
		var $contractCode = $("li[data-tion-position='" + contractCode + "'] span[class = 'position0']");
		var $drection = $("li[data-tion-position='" + contractCode + "'] span[class = 'position1']");
		var $holdNum = $("li[data-tion-position='" + contractCode + "'] span[class = 'position2']");
		var $holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");
		var localQuote = getLocalCacheQuote($contractCode.text());
		if(localQuote == undefined) {
			tip("无效的品种合约");
			return;
		}
		var lastPrice = localQuote.LastPrice;
		$("#choiceStopPrices").val(0);
		$("#stopEvenTd").text($contractCode.text());
		$("#stopBorderLeft").text($drection.text());
		$("#stopBorderLeft").attr("data-tion-drection", $drection.attr("data-drection"));
		$("#stopEvenPrice").text(lastPrice);
		$("#stopNumber").val($holdNum.text());
		$("#stopHoldAvgPrice").val($holdAvgPrice.text());
		$("#stopChoicePrices1").val(lastPrice);
		$("#lossContractCode").text($contractCode.text());
		$("#lossDrection").text($drection.text());
		$("#lossDrection").attr("data-tion-drection", $drection.attr("data-drection"));
		$("#lossNumber").val($holdNum.text());
		$("#lossEventPrice").text(lastPrice);
		$("#lossChoicePrices2").val(lastPrice);
		$("#lossHoldAvgPrice").val($holdAvgPrice.text());
		mui("#popoverLoss").popover("toggle");
	}
});
/**
 * 下单
 */
/**
 * 是否是下单操作
 */
var isBuy = false;

function doInsertOrder(param) {
	if(validationLastPrice()) {
		alertProtype("交易错误", "提示", Btn.confirmed());
		return;
	}
	var $this = param;
	var tradeDrection = $this.attr("data-tion-buy");
	var orderNumber = $("#orderNumber").val();
	var priceType = $("input[type='radio']:checked").val();
	if(orderNumber == null || isNaN(orderNumber) || orderNumber <= 0 || orderNumber.length <= 0) {
		alertProtype("手数输入错误数量", "提示", Btn.confirmed());
		return;
	}
	/*if(priceType == 1){
		src=" = doGetMarketPrice($("#lastPrice").text(),$("#miniTikeSize").val(),tradeDrection);
	}*/
	if(buyOrderPrice == null || isNaN(buyOrderPrice) || buyOrderPrice <= 0 || buyOrderPrice.length <= 0) {
		alertProtype("价格输入错误", "提示", Btn.confirmed());
		return;
	}
	var exchanageNo = $("#exchangeNo").val();
	var commodeityNo = $("#commodeityNo").val();
	var contractNo = $("#contractNo").val();
	Trade.doInsertOrder(exchanageNo, commodeityNo, contractNo, orderNumber, tradeDrection, priceType, buyOrderPrice, 0, doGetOrderRef());
	isBuy = true;
}
/**
 * 全部平仓操作
 */
function doInsertAllSellingOrder() {
	for(var i = 0; i < postionIndex; i++) {
		document.getElementById("show_allClose").style.display="none";
		var contractCode = localCachePositionContractCode[i];
		if(contractCode == undefined || $(".postion-index" + i + "").html() == undefined) {
			continue;
		}
		var tradeParam = doGetSellingBasicParam(contractCode);
		if(!tradeParam) {
			continue;
		}
		var param = new Array();
		param[0] = tradeParam;
		closing(param);
	}
}
/**
 * 平仓操作
 */
function doInsertSellingOrder() {
	var contractCode = selectPostion["contractCode"];
	var postionIndex = selectPostion["postionIndex"];
	if(contractCode == undefined) {
		tip("未选择平仓信息");
		return;
	}
	var tradeParam = doGetSellingBasicParam(contractCode);
	if(!tradeParam) {
		return;
	}
	var param = new Array();
	param[0] = tradeParam;
	closing(param);
	document.getElementById("show_allClose").style.display="none"
}
/**
 * 反手操作
 */
function doInsertBackhandOrder() {
	var contractCode = selectPostion["contractCode"];
	var postionIndex = selectPostion["postionIndex"];
	if(contractCode == undefined) {
		tip("未选择反手信息");
		return;
	}
	var tradeParam = doGetSellingBasicParam(contractCode);
	var exchangeNo = tradeParam.ExchangeNo;
	var commodityNo = tradeParam.CommodityNo;
	var contractNo = tradeParam.ContractNo;
	var orderNum = tradeParam.OrderNum * 2;
	var tradeDrection = tradeParam.Drection;
	var contractCode = commodityNo + contractNo;
	var orderPrice = tradeParam.LimitPrice;
	Trade.doInsertOrder(exchangeNo, commodityNo, contractNo, orderNum, tradeDrection, 0, orderPrice, 0, doGetOrderRef());
	isBuy = true;
}
/**
 * 全部撤单操作
 */
function doInsertAllCancleOrder() {
	for(var i = 0; i < designateIndex; i++) {
		var order = localCachedesignateContractCode[i];
		if(order == undefined || $(".des-index" + i + "").html() == undefined) {
			continue;
		}
		var tradeParam = doGetCancleOrderBasicParam(order);
		var param = new Array();
		param[0] = tradeParam
		cancleOrder(param);
		document.getElementById("showRevocation").style.display="none"
	}
}
/**
 * 撤单操作
 */
function doInsertCancleOrder() {
	var orderId = selectDesgnate["orderId"];
	var contractCode = selectDesgnate["contraction"];
	var designateIndex = selectDesgnate["designateIndex"];
	if(contractCode == undefined || $(".des-index" + designateIndex + "").html() == undefined) {
		return;
	}
	var tradeParam = doGetCancleOrderBasicParam(orderId);
	var param = new Array();
	param[0] = tradeParam
	cancleOrder(param);
	document.getElementById("showRevocation").style.display="none"
}
/**
 * 改单操作
 */
function doInsertChangeSingleOrder() {
	var orderId = selectDesgnate["orderId"];
	var contractCode = selectDesgnate["contraction"];
	var designateIndex = selectDesgnate["designateIndex"];
	if(contractCode == undefined || $(".des-index" + designateIndex + "").html() == undefined) {
		return;
	}
	var orderPrice = $("#col1").val();
	var orderNum = $("#col2").val();
	if(validationInputPrice(orderPrice)) {
		tip("改单价格错误");
		return;
	}
	if(validationInputPrice(orderNum)) {
		tip("改单数量错误");
		return;
	}
	var tradeParam = doGetModifyOrderBasicParam(orderId);
	tradeParam.orderPrice = orderPrice;
	tradeParam.orderNum = orderNum;
	var param = new Array();
	param[0] = tradeParam;
	modifyOrder(param);
	isUpdateOrder = true;
	document.getElementById("showRevocation").style.display="none"
}
/**
 * 添加止损操作
 */
function doGetInsertStopLoss() {
	if(vadationIsLoginMuiTip()) {
		var contractCode = selectPostion["contractCode"];
		var $drection = $("li[data-tion-position='" + contractCode + "'] span[class = 'position1']");
		var $holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");
		var localQuote = getLocalCacheQuote(contractCode);
		var lastPrice = $("#stopEvenPrice").text();
		var stopChoicePrices1 = $("#stopChoicePrices1").val();
		var stopNumber = $("#stopNumber").val();
		var stopLossType = $("#choiceStopPrices").val();
		var choiceStopPrices1 = $("#choiceStopPrices1").val();
		var stopLossDiff = 0;
		var drection = $drection.attr("data-drection");
		if(stopLossType == 0) {
			stopLossDiff = lastPrice - stopChoicePrices1;
		} else if(stopLossType == 2) {
			stopLossDiff = stopChoicePrices1;
			if(drection == 0) {
				stopChoicePrices1 = Number(lastPrice) - Number(stopChoicePrices1);
			} else if(drection == 1) {
				stopChoicePrices1 = Number(stopChoicePrices1) + Number(lastPrice);
			}
		}
		var exchangeNo = localQuote.ExchangeNo;
		var commodityNo = localQuote.CommodityNo;
		var contractNo = localQuote.ContractNo;
		var contractObject = getMarketCommdity(contractCode);
		/*
		var tradeparam = createInsertStopLossParam(exchangeNo, commodityNo, 
			contractNo, stopNumber, stopLossType, 
			parseFloat(Math.abs(stopLossDiff)).toFixed(2), 
			$holdAvgPrice.text(), drection, choiceStopPrices1, 
			parseFloat(stopChoicePrices1).toFixed(2));
		*/
		/*
		if((stopChoicePrices1*10000)%(contractObject.MiniTikeSize*10000)!=0){
			mui.toast('止损价不符合最小变动价,最小变动价为:'+contractObject.MiniTikeSize);
			return;
		}
		*/
		var tradeparam = createInsertStopLossParam(exchangeNo, commodityNo, 
				contractNo, stopNumber, stopLossType, 
				parseFloat(Math.abs(stopLossDiff)).toFixed(contractObject.DotSize), 
				$holdAvgPrice.text(), drection, 1, 
				parseFloat(stopChoicePrices1).toFixed(contractObject.DotSize));
		if(tradeparam == undefined) {
			tip("交易错误,请重试");
		}
		inserStopLoss(tradeparam);
		$("#ustopTitle").addClass("mui-active");
		$("#ulossTitle").removeClass("mui-active");
		$("#stopTitle1").addClass("mui-active");
		$("#lossTitle1").removeClass("mui-active");
		document.getElementById("show_allClose").style.display="none"
	}
}
/**
 * 添加止盈操作
 */
function doGetInsertLossLoss() {
	if(vadationIsLoginMuiTip()) {
		var contractCode = selectPostion["contractCode"];
		var $drection = $("li[data-tion-position='" + contractCode + "'] span[class = 'position1']");
		var $holdNum = $("li[data-tion-position='" + contractCode + "'] span[class = 'position2']");
		var $holdAvgPrice = $("li[data-tion-position='" + contractCode + "'] span[class = 'position3']");
		var localQuote = getLocalCacheQuote(contractCode);
		var lastPrice = $("#lossEventPrice").text();
		var lossChoicePrices2 = $("#lossChoicePrices2").val();
		var stopNumber = $("#lossNumber").val();
		var stopLossType = 1;
		var choiceStopPrices4 = $("#choiceStopPrices4").val();
		var drection = $drection.attr("data-drection");
		var stopLossDiff = lossChoicePrices2 - lastPrice;
		var exchangeNo = localQuote.ExchangeNo;
		var commodityNo = localQuote.CommodityNo;
		var contractNo = localQuote.ContractNo;
		var tradeparam = createInsertStopLossParam(exchangeNo, commodityNo, contractNo, stopNumber, stopLossType, parseFloat(Math.abs(stopLossDiff)).toFixed(4), $holdAvgPrice.text(), drection, 1, parseFloat(lossChoicePrices2).toFixed(CacheQuoteBase.getCacheContractAttribute(contractCode.substring(0,2), "DotSize")));
		if(tradeparam == undefined) {
			tip("交易错误,请重试");
		}
		inserStopLoss(tradeparam);
		$("#ustopTitle").addClass("mui-active");
		$("#ulossTitle").removeClass("mui-active");
		$("#stopTitle1").addClass("mui-active");
		$("#lossTitle1").removeClass("mui-active");
		document.getElementById("show_allClose").style.display="none"
	}
}
/**
 * 修改止损操作
 */
function doUpdateModifyStopLoss() {
	if(vadationIsLoginMuiTip()) {
		var stopLossNo = selectStopLoss["stopLossNo"];
		if(stopLossNo == undefined) {
			tip("请选择一行数据");
			return;
		}
		if(operationStopLossType == undefined) {
			tip("请重新操作");
			return;
		}
		var modifyFlag = operationStopLossType;
		var num = $("#stopNumber1").val();
		var stopLossType = $("#choiceStopPrices2").val();
		var orderType = $("#choiceStopPrices3").val();
		var lastPrice = $("#stopEvenPrice1").text();
		var stopChoicePrices3 = $("#stopChoicePrices3").val();
		var drection = $("#stopBorderLeft1").attr("data-tion-drection");
		var stopLossDiff = 0;
		if(stopLossType == 0) {
			stopLossDiff = lastPrice - stopChoicePrices3;
		} else if(stopLossType == 2) {
			stopLossDiff = stopChoicePrices3;
			if(drection == 0) {
				stopChoicePrices3 = Number(lastPrice) - Number(stopChoicePrices3);
			} else if(drection == 1) {
				stopChoicePrices3 = Number(stopChoicePrices3) + Number(lastPrice);
			}
		}
		var contract = $('#stopEvenTd1').text();
		var dotsize01 = CacheQuoteBase11.getCacheContractAttribute(contract.substring(0,contract.length-4),'DotSize');
		var tradeParam = createModifyStopLossParam(stopLossNo, modifyFlag, num, stopLossType, orderType, parseFloat(stopLossDiff).toFixed(dotsize01), stopChoicePrices3);
		doModifyStopLoss(tradeParam)
	}
}
/**
 * 暂停-删除止损单操作
 */
function doStopAndDelModifyStopLoss() {
	var stopLossNo = selectStopLoss["stopLossNo"];
	if(stopLossNo == undefined) {
		tip("请选择一行数据");
		return;
	}
	if(operationStopLossType == undefined) {
		tip("请重新操作");
		return;
	}
	var contractCode = $("#" + stopLossNo + " td[class = 'stoploss0']").text();
	var localQuote = getLocalCacheQuote(contractCode);
	if(localQuote == undefined) {
		tip("无效的合约");
		return;
	}
	var lastPrice = localQuote.LastPrice;
	var modifyFlag = operationStopLossType;
	var num = $("#" + stopLossNo + " td[class = 'stoploss4']").text();
	var stopLossType = $("#" + stopLossNo + " td[class = 'stoploss3']").attr("data-tion-lossType");
	var orderType = $("#" + stopLossNo + " td[class = 'stoploss6']").attr("data-tion-orderType");
	var stopLossDiff = $("#" + stopLossNo + " td[class = 'stoploss8']").text();
	var stopLossPrice = $("#" + stopLossNo + " td[class = 'stoploss5']").attr("data-tion-price");
	if(stopLossDiff == 0) {
		stopLossDiff = lastPrice - stopLossPrice;
	}
	var tradeParam = createModifyStopLossParam(stopLossNo, modifyFlag, num, stopLossType, orderType, Math.abs(stopLossDiff), stopLossPrice);
	doModifyStopLoss(tradeParam);
}
/**
 * 修改止盈操作
 */
function doUpdateModifyLoss() {
	if(vadationIsLoginMuiTip()) {
		var stopLossNo = selectStopLoss["stopLossNo"];
		if(stopLossNo == undefined) {
			tip("请选择一行数据");
			return;
		}
		if(operationStopLossType == undefined) {
			tip("请重新操作");
			return;
		}
		var modifyFlag = operationStopLossType;
		var num = $("#ulossNumber").val();
		var stopLossType = 1;
		var orderType = $("#uchoiceLossPrices").val();
		var lastPrice = $("#uEvenPrice").text();
		var uLossPrice = $("#uLossPrice").val();
		var drection = $("#stopBorderLeft1").attr("data-tion-drection");
		var lossDiff = lastPrice - uLossPrice;
		var tradeParam = createModifyStopLossParam(stopLossNo, modifyFlag, num, stopLossType, orderType, parseFloat(Math.abs(lossDiff)).toFixed(2), uLossPrice);
		doModifyStopLoss(tradeParam)
	}
}
/**
 * 添加条件单操作（价格条件）
 */
function doInsertConditionByPrice() {
	if(vadationIsLoginMuiTip()) {
		var contractCode = $("#chioceContract").val();
		var compareType = $("#chiocePrices").val();
		var priceTriggerPonit = $("#ConditoionPricesInput").val();
		var additionType = $("#chioceAdditional").val();
		var additionPrice = $("#ConditoionPricesInput1").val();
		var drection = $("#shopDrection").val();
		var orderType = $("#chiocePricesSelect").val();
		var num = $("#ConditoionPricesInput3").val();
		//1-有附加条件，0-没有附加条件
		var flag = 1;
		if(additionType == -1) {
			additionPrice = 0;
			flag = 0;
			additionType = 0
		}
		var localCommdity = getMarketCommdity(contractCode);
		if(localCommdity == undefined) {
			tip("无效的合约");
			return;
		}
		var exchangeNo = localCommdity.ExchangeNo;
		var commodityNo = localCommdity.CommodityNo;
		var contractNo = localCommdity.MainContract;
		var tradeparam = createInsertCondition(exchangeNo, commodityNo, contractNo, num, 0, priceTriggerPonit, compareType, "", 0, 0, orderType, drection, 0, 0, 0, flag, additionType, additionPrice);
		insertCondition(tradeparam);
	}
}
/**
 * 增加条件单操作（时间格式）
 */
function doInsertConditionByTime() {
	if(vadationIsLoginMuiTip()) {
		var contractCode = $("#chioceContract1").val();
		var timeTriggerPoint = formatDateYYYMMDD(new Date) + " " + $("#insertTimeInput").val();
		var additionType = $("#chioceTimeAdditional").val();
		var additionPrice = $("#ConditoionTimePricesInput").val();
		var drection = $("#shopDrectionTime").val();
		var orderType = $("#chiocePricesSelectTime").val();
		var num = $("#ConditoionTimeInput").val();
		var flag = 1;
		if(additionType == -1) {
			additionPrice = 0;
			flag = 0;
			additionType = 0
		}
		var localCommdity = getMarketCommdity(contractCode);
		if(localCommdity == undefined) {
			tip("无效的合约");
			return;
		}
		var exchangeNo = localCommdity.ExchangeNo;
		var commodityNo = localCommdity.CommodityNo;
		var contractNo = localCommdity.MainContract;
		var tradeParam = createInsertCondition(exchangeNo, commodityNo, contractNo, num, 1, 0, 0, timeTriggerPoint, 0, 0, orderType, drection, 0, 0, 0, flag, additionType, additionPrice);
		insertCondition(tradeParam);
	}
}
/**
 * 修改条件单（价格条件）
 */
function doUpdateConditionByPrice() {
	if(vadationIsLoginMuiTip()) {
		var conditionNo = selectCondition["conditionNo"];
		if(conditionNo == undefined) {
			tip("请选择一条数据");
			return;
		}
		var contractCode = $("#chioceContract").val();
		var compareType = $("#chiocePrices").val();
		var priceTriggerPonit = $("#ConditoionPricesInput").val();
		var additionType = $("#chioceAdditional").val();
		var additionPrice = $("#ConditoionPricesInput1").val();
		var drection = $("#shopDrection").val();
		var orderType = $("#chiocePricesSelect").val();
		var num = $("#ConditoionPricesInput3").val();
		var flag = 1;
		if(additionType == -1) {
			additionPrice = 0;
			flag = 0;
			additionType = 0
		}
		var tradeParam = createUpdateConditioin(conditionNo, 0, num, 0, priceTriggerPonit, compareType, "", 0, 0, orderType, drection, 0, 0, 0, flag, additionType, additionPrice);
		updateCondition(tradeParam);
		operateConditionType = 0;
	}
}
/**
 * 修改条件单（时间条件）
 */
function doUpdateConditionByTime() {
	if(vadationIsLoginMuiTip()) {
		var conditionNo = selectCondition["conditionNo"];
		if(conditionNo == undefined) {
			tip("请选择一条数据");
			return;
		}
		var contradeCode = $("#chioceContract1").val();
		var timeTriggerPoint = formatDateYYYMMDD(new Date) + " " + $("#insertTimeInput").val();
		var additionType = $("#chioceTimeAdditional").val();
		var additionPrice = $("#ConditoionTimePricesInput").val();
		var drection = $("#shopDrectionTime").val();
		var orderType = $("#chiocePricesSelectTime").val();
		var num = $("#ConditoionTimeInput").val();
		var flag = 1;
		if(additionType == -1) {
			additionPrice = 0;
			flag = 0;
			additionType = 0
		}
		var tradeParam = createUpdateConditioin(conditionNo, 0, num, 1, 0, 0, timeTriggerPoint, 0, 0, orderType, drection, 0, 0, 0, flag, additionType, additionPrice);
		updateCondition(tradeParam);
		operateConditionType = 0;
	}
}
/**
 * 暂停-删除-启动条件单
 */
function doUpdateAndDelCondition() {
	var conditionNo = selectCondition["conditionNo"];
	var tradeparam = createUpdateConditioin(conditionNo, operateConditionType, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	updateCondition(tradeparam);
}
/**
 * 获取平仓的基本信息
 * @param obj
 */
function doGetSellingBasicParam(obj) {
	var contract = obj;
	var $contractCode = contract;
	var $drection = $("li[data-tion-position='" + contract + "'] span[class = 'position1']").attr("data-drection");
	var $holdNum = $("li[data-tion-position='" + contract + "'] span[class = 'position2']").text();
	var $openAvgPrice = $("li[data-tion-position='" + contract + "'] span[class = 'position3']").text();
	var $commodityNo = $("li[data-tion-position='" + contract + "'] span[class = 'position5']").text();
	var $contractNo = $("li[data-tion-position='" + contract + "'] span[class = 'position6']").text();
	var $exchangeNo = $("li[data-tion-position='" + contract + "'] span[class = 'position7']").text();
	var drection = 0;
	if($drection == 0) {
		drection = 1;
	}
	var contractCode = $commodityNo + $contractNo;
	var localCommodity = getMarketCommdity(contractCode);
	var localQuote = getLocalCacheQuote(contractCode);
	var miniTikeSize = 0.00;
	var lastPrice = 0.00;
	var dotSize = 2;
	if(localCommodity != undefined && localQuote != undefined) {
		miniTikeSize = localCommodity.MiniTikeSize;
		lastPrice = localQuote.LastPrice;
		dotSize = localCommodity.DotSize;
	}
	if(validationInputPrice(lastPrice)) {
		tip("最新价格错误");
		return false;
	}
	var limitPirce = doGetMarketPrice(lastPrice, miniTikeSize, drection, dotSize);
	if(validationInputPrice(limitPirce)) {
		tip("平仓价格错误");
		return false;
	}
	var sellingParam = createSellingParam($exchangeNo, $commodityNo, $contractNo, $holdNum, drection, 1, Math.abs(limitPirce), 0, doGetOrderRef());
	return sellingParam;
}
/**
 * 获取撤单的基本信息
 * @param obj
 */
function doGetCancleOrderBasicParam(obj) {
	var contract = obj;
	var $orderId = contract;
	var $drection = $("li[data-order-des='" + contract + "'] span[class = 'desig1']").attr("data-drection");
	var $orderPrice = $("li[data-order-des='" + contract + "'] span[class = 'desig2']").text();
	var $orderNum = $("li[data-order-des='" + contract + "'] span[class = 'desig3']").text();
	var $cdNum = $("li[data-order-des='" + contract + "'] span[class = 'desig4']").text();
	var $OrderSysID = $("li[data-order-des='" + contract + "'] span[class = 'desig6']").text();
	var $commodityNo = $("li[data-order-des='" + contract + "'] span[class = 'desig7']").text();
	var $contractNo = $("li[data-order-des='" + contract + "'] span[class = 'desig8']").text();
	var $exchangeNo = $("li[data-order-des='" + contract + "'] span[class = 'desig9']").text();
	var $orderId = $("li[data-order-des='" + contract + "'] span[class = 'desig10']").text();
	var cancleOrderParam = createCancleOrderParam($OrderSysID, $orderId, $exchangeNo, $commodityNo, $contractNo, $orderNum, $drection, Math.abs($orderPrice));
	return cancleOrderParam;
}
/**
 * 获取改单的基本信息
 * @param obj
 */
function doGetModifyOrderBasicParam(obj) {
	var contract = obj;
	var $contractCode = contract;
	var $drection = $("li[data-order-des='" + contract + "'] span[class = 'desig1']").attr("data-drection");
	var $orderPrice = $("li[data-order-des='" + contract + "'] span[class = 'desig2']").text();
	var $orderNum = $("li[data-order-des='" + contract + "'] span[class = 'desig3']").text();
	var $cdNum = $("li[data-order-des='" + contract + "'] span[class = 'desig4']").text();
	var $OrderSysID = $("li[data-order-des='" + contract + "'] span[class = 'desig6']").text();
	var $commodityNo = $("li[data-order-des='" + contract + "'] span[class = 'desig7']").text();
	var $contractNo = $("li[data-order-des='" + contract + "'] span[class = 'desig8']").text();
	var $exchangeNo = $("li[data-order-des='" + contract + "'] span[class = 'desig9']").text();
	var $orderId = $("li[data-order-des='" + contract + "'] span[class = 'desig10']").text();
	var $triggerPrice = $("li[data-order-des='" + contract + "'] span[class = 'desig11']").text();
	var modifyOrderParam = createModifyOrderParam($OrderSysID, $orderId, $exchangeNo, $commodityNo, $contractNo, $orderNum, $drection, Math.abs($orderPrice), $triggerPrice);
	return modifyOrderParam;
}
/**
 * 行情页面买卖处理 
 * @param {Object} param
 */
function marketBuy(param) {
	var $this = param;
	var lastPrice = $("#freshPrices").text();
	if(lastPrice <= 0 || lastPrice == undefined || lastPrice == null || isNaN(lastPrice)) {
		alertProtype("交易错误", "提示", Btn.confirmed());
		return;
	}
	var exchangeNo = $("#exchangeNo").val();
	var commodityNo = $("#commodeityNo").val();
	var contractNo = $("#contractNo").val();
	var contractSize = $("#contractSize").val();
	var miniTikeSize = $("#miniTikeSize").val();
	var orderNum = $("#orderNum").val();
	var drection = $this.attr("data-tion-buy");
	//var localCommodity = getMarketCommdity(commodityNo+contractNo);
	/*var dotSize = 2;
	if(localCommodity != undefined){
		dotSize = localCommodity.DotSize;
	}*/
	//var limitPrice = doGetMarketPrice(lastPrice,miniTikeSize,drection,dotSize);
	var priceType = 0;
	Trade.doInsertOrder(exchangeNo, commodityNo, contractNo, orderNum, drection, 1, buyOrderPrice, 0, doGetOrderRef());
	/*tip("合约【"+commodityNo+contractNo+"】提交成功,等待交易");*/
}
/**
 * 计算列表的浮动盈亏总和
 */
function sumListfloatingProfit() {
	var positionDom = $(".tab_position");
	var price = 0.00;
	$.each(positionDom, function(i, item) {
		var $this = $(this);
		var $floatP = $this.find("span[class = 'position8']");
		var $contractCode = $this.find("span[class = 'position0']");
		var localCommodity = getMarketCommdity($contractCode.text());
		if(localCommodity != undefined) {
			var currencyNo = localCommodity.CurrencyNo;
			var currencyRate = localCacheCurrencyAndRate[currencyNo];
			price = price + Number($floatP.text() * currencyRate);
		}
	});
	if(isNaN(price)) {
		return;
	}
	$("#floatingProfit").val(parseFloat(price).toFixed(2));
}
/**
 * 更新持仓总盈亏
 */
function updateHoldProfit() {
	var price = 0.00;
	for(var i = 0; i < fundsDetailsIndex; i++) {
		if($(".funds-index" + i).html() != undefined) {
			var floatingProfit = $("#floatingProfit");
			var floating = $(".funds-index" + i + " li[class = 'detail_floatingProfit']").text();
			var currencyRate = $(".funds-index" + i + " li[class = 'detail_currencyRate']").text();
			var total = floating * currencyRate;
			if(isNaN(total)) {
				total = 0;
			}
			price = price + total;
			if(price < 0) {
				floatingProfit.css("color", "#0bffa4");
			} else if(price > 0) {
				floatingProfit.css("color", "#ff5500");
			} else if(price == 0) {
				floatingProfit.css("color", "#FFFFFF");
			}
			floatingProfit.text(parseFloat(price).toFixed(2));
		}
	}
}
/**
 * 更新账户资产 
 */
function updateAccountBalance() {
	if(isLogin) {
		var floatingProfit = $("#floatingProfit").val();
		var todayBalance = $("#todayBalance");
		var todayCanUse = $("#todayCanUse");
		todayBalance.text(parseFloat(loadCachTodayBanlance + Number(floatingProfit)).toFixed(2));
		
		var ForceLine = $('#loss-Open-line').text();
		ForceLine = Number(ForceLine);
		var num=parseFloat(loadCachTodayBanlance + Number(floatingProfit)).toFixed(2);
		if(isNaN((InitBalance-num)/(InitBalance-ForceLine)) ){
			$('#open-risk-degree').text('0.00%');
		}else{
//			if(isFinite(((ForceLine*100)/num).toFixed(2))){
//				
//				$('#open-risk-degree').text(((ForceLine*100)/num).toFixed(2)+'%');
//			}else{
//				$('#open-risk-degree').text('0.00%');
//			}
			if(((InitBalance-num)/(InitBalance-ForceLine))>0){
				$('#open-risk-degree').text(((InitBalance-num)*100/(InitBalance-ForceLine)).toFixed(2)+'%');
			}else{
				$('#open-risk-degree').text('0.00%');
			}
		}
		
		todayCanUse.text(parseFloat(loadCachTodayCanuse + Number(floatingProfit)).toFixed(2));
	}
}
/**
 * 更新止损止盈最新价格
 */
function updateStopAndLossLastPrice(param) {
	if(isLogin) {
		var lastPrice = param.LastPrice;
		var commodityNo = param.CommodityNo;
		var contractNo = param.ContractNo;
		var contractCode = commodityNo + contractNo;
		var ulossContractCode = $("#ulossContractCode").text();
		var stopEvenTd = $("#stopEvenTd").text();
		if(contractCode == ulossContractCode) {
			$("#stopEvenPrice1").text(lastPrice);
			$("#uEvenPrice").text(lastPrice);
		}
		if(contractCode == stopEvenTd) {
			$("#stopEvenPrice").text(lastPrice);
			$("#lossEventPrice").text(lastPrice);
		}
	}
}
//更新条件单最新价
//function updateShowRuleLastPrice(param) {
//	if(isLogin) {
//		var lastPrice = param.LastPrice;
//		var contractCode = $("#chioceContract").val();
//		var ulossContractCode = $("#ulossContractCode").text();
//		if(contractCode == ulossContractCode) {
//			$("#showConditionPrice").text(lastPrice);
//			$("#showConditionPrice").text(lastPrice);
//		}
//		if(contractCode == stopEvenTd) {
//			$("#showConditionPrice1").text(lastPrice);
//			$("#showConditionPrice1").text(lastPrice);
//		}
//	}
//}

/**
 * 清除交易列表的数据并生成操作按钮
 */
function clearTradListData() {
	$("#account_gdt1").html("");
	$("#order_gdt1").html("");
	$("#des_gdt1").html("");
	$("#trade_gdt1").html("");
	$("#hold_gdt1").html("");
	$("#todayBalance").html(0.00);
	$("#deposit").html(0.00);
	$("#todayCanUse").html(0.00);
	$("#floatingProfit").html(0.00);
	$("#closeProfit").html(0.00);
	$(".caozuo").hide();
	generatePostionTitle();
	generateDesignateTitle();
	generateAccountTitle();
	generateOrderTitle();
	generateTradeSuccessTitle();
}

function reconnectInit() {
	holdFirstLoadDataIndex = 0;
	accountFirstLoadDataIndex = 0;
	orderFirsetLoadDataIndex = 0;
	tradeFirsetLoadDataIndex = 0;
	stopLossLoadDataIndex = 0;
	conditionLoadDataIndex = 0;
}
/**
 * 清理全局缓存数据
 */
function clearLocalCacheData() {
	holdFirstLoadDataIndex = 0;
	accountFirstLoadDataIndex = 0;
	orderFirsetLoadDataIndex = 0;
	tradeFirsetLoadDataIndex = 0;
	deleteAllDesgnatesLocalCache();
	deleteAllDesgnatesContractCode();
	deleteSelectDesgnate();
	deleteAllPositionsLocalCache();
	deleteAllPositionContractCode();
	deleteSelectPostion();
	postionIndex = 0;
	designateIndex = 0;
	localCacheFundDetail = {};
	uehIndex = 0;
	loadCachBanlance = {};
	loadCachDeposit = {};
	loadCachCanuse = {};
	loadCurrencyRate = {};
	loadCachAccountNo = {};
	localCacheCurrencyAndRate = {};
	orderIndex = 0;
	fundsDetailsIndex = 0;
	loadCachFloatingProfit = {};
	loadCachCloseProfit = {};
	localCurrencyNo = [];
	loadCachTodayBanlance = 0;
	loadCachTodayCanuse = 0;
	tradeSuccessLoadFlag = false;
	localCachePositionRecentData = {};
	resultInsertOrderId = {};
	isUpdateOrder = false;
	isBuy = false;
	isGetVersion = false;
	buyOrderPrice = 0.00;
}
/**
 * 登录按钮事件
 */
function switchAccount() {
	tradeLoginOut();
	$("#switchAccount").text("登录账户");
	openLogin();
}
/**
 * 跳转到登录页面
 */
function openLogin() {
	loginOutFlag = true;
	loginOutTip = true;

	mui.openWindow({
		url: "../login/operateLogin.html",
		id: "operateLogin",
		extras: {
			commdityNo: $("#commodeityNo").val(),
			name: tranferParam,
			backpageID: "transactionDetails"
		}
	});
//	if(!isConnectionError) {
//		/*socket.onclose();*/
//	}
	loginOut();
	plus.nativeUI.closeWaiting();

}
/**
 * 验证最新价格 
 */
function validationLastPrice() {
	var lastPrice = $("#lastPrice").text();
	if(lastPrice == undefined || lastPrice == null || lastPrice.length == 0 || parseFloat(lastPrice) <= 0) {
		return true;
	} else {
		return false;
	}
}
/**
 * 条件单验证价格条件符合条件
 * @param {Object} priceType
 * @param {Object} price
 * @param {Object} addPriceType
 * @param {Object} addPrice
 */
/**
 * 验证价格的组合排列：第一位表示原始条件代码，第二位表示附加条件代码，第三位（原始价格-附加价格）如果结果小于0则为代码：0，如果大于0则为代码：1
 * 组合中的数组组合都是允许通过的选择和输入
 */
var priceConditionArr = ["010", "101", "030", "301", "301", "210", "211", "320", "321", "230", "231"];

function validationPriceCondition(priceType, price, addPriceType, addPrice) {
	var flag = false;
	if(priceType == addPriceType) {
		tip("初始条件和附加条件不能一致");
		return;
	}
	if(price == addPrice) {
		tip("初始价格和附加价格不能一致");
		return;
	}
	var chaPrice = price - addPrice;
	var code = 0;
	if(chaPrice > 0) {
		code = 1;
	}
	code = priceType + "" + addPriceType + "" + code;
	var size = priceConditionArr.length;
	for(var i = 0; i < size; i++) {
		if(priceConditionArr[i] == code) {
			flag = true;
			break;
		}
	}
	if(!flag) {
		tip("两个价格必须形成一个区间");
	}
	return flag;
}
/**
 * 条件单时间条件时间验证
 * @param {Object} param
 */
function validationtimeCondition(time) {
	var date = new Date();
	var now = date.getTime();
	var time = formatDateYYYMMDD(date) + " " + time;
	var timeDate = new Date(time).getTime();
	if(now > timeDate) {
		return false;
	}
	return true;
}
/**
 * 下单操作的tip遮罩层
 */
function setTimeOutInsertOrder() {
	tradeSetTimeOut = setTimeout(function() {
		plus.nativeUI.closeWaiting();
	}, 10000);
}
/**
 * 清理数据列表
 */
function clearTradListData() {
	$("#account_gdt1").html("");
	$("#Entrust").html("");
	$("#postersOrder").html("");
	$("#positionList").html("");
	$("#Deal").html("");
	$("#todayBalance").text("0.00");
	$("#deposit").text("0.00");
	$("#todayCanUse").text("0.00");
}

function tabOn() {
	/*交易ul li  odd even odd  li:nth-of-type(even)*/
	//$(".quotation_detailed .quotation_detailed_title .tab_content:even").addClass("even");
	$(".quotation_detailed .quotation_detailed_title .tab_content").click(function() {
		var _this = $(this);
		$(".quotation_detailed .quotation_detailed_title .tab_content").removeClass("on");
		_this.addClass("on");
	});
}

var date00 = new Date();//当前日期   
var nowDayOfWeek = date00.getDay(); //今天本周的第几天   
var nowDay = date00.getDate(); //当前日   
var nowMonth = date00.getMonth(); //当前月   
var nowYear = date00.getYear(); //当前年   
nowYear += (nowYear < 2000) ? 1900 : 0;
/**
 * 获取当前日期与时间
 */
function getCurrentDateAndTime(){
	
	return date00.getFullYear()+'-'+(date00.getMonth()+1)+'-'+date00.getDate()+' '+date00.getHours()+':'+date00.getMinutes()+':'+date00.getSeconds();
}

/**
 * 获取当前日期截取到当天23:59:59
 */
function getCurrentDate(){
	
	var weekStartDate = new Date(nowYear, nowMonth, nowDay);  
    return formatDate11(weekStartDate);   
}
/**
 * 获取当前日期与当前的日期的零点
 */
function getCurrentDateMidnight(){
	return date00.getFullYear()+'-'+(date00.getMonth()+1)+'-'+date00.getDate()+' '+'00:00:00';
}


function getWeekStartDate() {   
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - 7);   
    return formatDate(weekStartDate);   
} 

function getMonthStartDate(){
	
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - getCurrentMonthDays());   
    return formatDate(weekStartDate);   
}

/**
 * 获取昨天的日期
 */
function getYesterdayDate(){
	
	var yesterdayDate = new Date(nowYear, nowMonth, nowDay - 1);   
    return formatDate(yesterdayDate);   
}

/**
 * 获取当前月的天数
 */
function getCurrentMonthDays(){
	var CurrentDate = new Date(nowYear, nowMonth, nowDay); 
	
	return CurrentDate.getDate();
}



$('#directSeedTitle').children().on('tap',function(){
	var _this = $(this);
	if(_this.text()=='一周内'){
		$('#hisTradeList').children().remove();
		history_index=1;
		Trade.doQryHisTrade(username,getWeekStartDate(),getCurrentDate());
	}
	
	if(_this.text()=='一月内'){
		$('#hisTradeList').children().remove();
		history_index=1;
		Trade.doQryHisTrade(username,getMonthStartDate(),getCurrentDate());
	}
	
	if(_this.text()=='一天内'){
		$('#hisTradeList').children().remove();
		history_index=1;
		Trade.doQryHisTrade(username,getYesterdayDate(),getCurrentDate());
	}
	
});

function formatDate(date) {   
    var myyear = date.getFullYear();   
    var mymonth = date.getMonth() + 1;   
    var myweekday = date.getDate();   
    if (mymonth < 10) {   
        mymonth = "0" + mymonth;   
    }   
    if (myweekday < 10) {   
        myweekday = "0" + myweekday;   
    }   
    return (myyear + "-" + mymonth + "-" + myweekday+' '+'00:00:00');   
}

//获取当前最晚时间
function formatDate11(date) {   
    var myyear = date.getFullYear();   
    var mymonth = date.getMonth() + 1;   
    var myweekday = date.getDate();   
    if (mymonth < 10) {   
        mymonth = "0" + mymonth;   
    }   
    if (myweekday < 10) {   
        myweekday = "0" + myweekday;   
    }   
    return (myyear + "-" + mymonth + "-" + myweekday+' '+'23:59:59');   
}