<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/common.jsp"%>
<%@include file="../common/import-artDialog-js.jspf"%>
<%
String tab=(String)request.getParameter("tab");
tab=tab==null?"":tab;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>帮助中心 - 维胜</title>
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/public.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/help.css?20150806">
<script type="text/javascript" src="${ctx}/static/script/common/swfobject.js"></script>

<script type="text/javascript" src="${ctx}/static/script/help/help.js"></script>
<script type="text/javascript">
var tab="<%=tab%>";

</script>



</head>
<body>
<!--顶部 -->
<%@include file="../common/header.jsp"%>
<div class="help">
    <div class="hp_nav">
        <ul>
            <li><a href="javascript:void(0);" class="helpTitle" data-type="newbie">新手指南</a></li>
            <li><a href="javascript:void(0);" class=" helpTitle" data-type="configuration">港股操盘</a></li>
            <li><a href="javascript:void(0);" class="helpTitle" data-type="rule">期货操盘</a></li>
            <li><a href="javascript:void(0);" class="helpTitle" data-type="software">交易软件下载</a></li>
            <li><a href="javascript:void(0);" class="helpTitle" data-type="safety">安全保障</a></li>
        </ul>
    </div>
    <!--股票操盘-->
    <div class="hp_ctn configuration hp_content">
        <div class="hp_siderbar">
            <a href="javascript:void(0);"  data="1">什么是港股操盘</a>
            <a href="javascript:void(0);" data="2">港股新手指南</a>
            <a href="javascript:void(0);" data="3">港股操盘规则</a>
            <a href="javascript:void(0);" data="7">港股操盘限制</a>
            <a href="javascript:void(0);" data="10">港股黑名单</a>
            <a href="javascript:void(0);" data="4">港股收费介绍</a>
            <a href="javascript:void(0);" data="5">港股穿仓处理</a>
            <a href="javascript:void(0);" data="6">港股停牌股处理</a>
        </div>
        <div class="hp_mainbar  hp_mbox1">
            <h1>什么是港股操盘</h1>
            <p>港股操盘是维胜推出的国内第一个创新型港股投资产品。用户通过少量的人民币自有资金当本金，维胜平台提供一定倍数的港元，让投资者轻松操盘港股，实现更快捷、更丰富的投资收益。</p>
            <p>港股操盘的优势在于：</p>
            <p>1，免去繁杂的港股开户流程和手续</p>
            <p>2，免去人民币和港元的兑换手续，且无汇兑限制</p>
            <p>3，资金放大，收益翻几倍</p>
            <p>举个例子：假如您有1万元人民币本金，按实时汇率约11843港元，维胜提供约6万港元供您操盘，涨10%赚6000港元，折合5000元人民币收益，收益全归您，维胜只收取超低通道使用费、账户管理费和正常港股交易手续费。</p>
        </div>
        <div class="hp_mainbar hp_mbox2" style="display:none;">
            <h1>港股交易规则补充说明：</h1>
            <p>一，交易时间：9:30—12:00，13:00—16:00。</p>
            <p>二，涨跌显示：绿色为涨，红色为跌，与A股恰恰相反。但同花顺、通达信等软件，为了顺应内地投资者的习惯，在行情显示时改成了与A股一样，即红色为涨，绿色为跌。新手对于这一点要注意。</p>
            <p>三，证券代号：常见为五位，A股代号是六位。</p>
            <p>四，涨跌板限制：港股市所有交易品种均不设涨跌板限制，港股一个交易日内股价波动幅度从制度上没有限制。</p>
        	<p>五，买卖单位：每笔交易的数量必须为一个买卖单位或其倍数，一个买卖单位即一手，1手可能是400股、 500股、1000股、2000股等。 在买卖股票时，投资者一定要事先了解其最小买卖单位。 投资者可进入港交所网站(http://www.hkex.com.hk)的简体中文版，在交易资料一览中查询所有股票的最小买卖单位。</p>
        	<p>六，报价变动幅度：股票买卖报价的最小变动幅度，与股票当时所处的价格区间有关，1个价格变动幅度可能是1分、1角、2角等等。</p>
        	<p>七，上市公司信息披露（可选）：香港的定期报告法定信息披露为每年两次，与 A 股不同，目前港股季报属于自愿披露，大部分公司不披露季度报告。此外，与A股不同的是，港股的会计年度不是统一的1月1日-12月31日，有些公司公布全年业绩报告的时候，另外一些公司则在公布中期业绩报告。对临时信息披露，港股也有严格的要求，与A股类似。</p>
        	<p>八，港股常见品种（可选）</p>
        	<table width="98%" border="0" cellspacing="0" cellpadding="0" class="hp_m_list">
        		<tr>
        			<td width="20%">常见种类</td>
        			<td width="45%">定义</td>
        			<td width="15%">注册地</td>
        			<td width="20%">代表股票</td>
        		</tr>
        		<tr>
        			<td>蓝筹股</td>
        			<td class="sp">实力雄厚的上市公司发行的股票。又称为“绩优股”。恒生成分股一般被视为蓝筹股</td>
        			<td></td>
        			<td class="sp">长江实业<Br>汇丰控股</td>
        		</tr>
        		<tr>
        			<td>红筹股</td>
        			<td class="sp">指境外注册、香港上市的带有中国大陆概念的股票</td>
        			<td>境外</td>
        			<td class="sp">中国移动<Br>中国石油</td>
        		</tr>
        		<tr>
        			<td>国企股（H股）</td>
        			<td class="sp">获中国证监会核准到香港上市的国有企业，它亦可称为H股，指在香港上市的国企股</td>
        			<td>内地</td>
        			<td class="sp">中国银行<Br>中国人寿</td>
        		</tr>
        		<tr>
        			<td>创业板</td>
        			<td class="sp">创业板是香港联合交易所（联交所）于1999年第四季度推出的一个新股票市场。创业板上市资格比主板低，以增长公司为目标，行业及规模不限</td>
        			<td></td>
        			<td class="sp">世大控股<Br>裕兴科技</td>
        		</tr>
        		<tr>
        			<td>仙股</td>
        			<td>股价较低不到1元的股票。</td>
        			<td></td>
        			<td class="sp">佑威国际<Br>福邦控股</td>
        		</tr>
        	</table>
        </div>
        <div class="hp_mainbar hp_mbox3" style="display:none;">
            <h1>港股操盘规则</h1>
            <p>注意：港股交易日和国内A股交易日略有不同，以下的交易日均指港股交易日。</p>   
            <p>一，操盘方案：操盘方案在交易日的15点45分之前生成可以当日交易，之后生成只能是下个交易日交易，当日无法登录且不会扣除当日的相关费用。</p>
            <p>二，交易账号：在工作时间内提交的操盘申请，通常会在30分钟内开通股票交易账户，其他时间下个交易日09:15前开通。交易账户开户成功后我们将短信通知您。您也可以登录维胜 → 账户首页 → 港股方案 → 对应的操盘方案 → 操盘详情页，查询到交易账号和密码。</p>         
            <p>三，持仓限制：港股交易使用T+0的规则，当日购买的股票可以当日卖出。不同的操盘金额，不同的仓位限制，盈利100%归您所有。为了保证您的权益，部分限制股无法购买。详见港股黑名单。</p>
            <p>四，风控警戒线：当账户净资产小于警戒线，系统会限制客户买入；每日收盘前10分钟，账户净资产低于警戒线，且客户不再补充保证金，为控制隔夜风险，系统会进行股票平仓；当客户的账户净资产触及到平仓线，系统会进行股票平仓。</p>
            <p>五，操盘天数：当您的方案到期，系统会对您的方案自动延期，最长延期时间可以在维胜的操盘详细页里查询。方案还未到期就终止操盘，已缴纳的通道使用费不退，账户管理费从终止操盘后的次日不再扣除。</p>
			<p>六，追加保证金：当您的净资产触及到警戒线或者平仓线，需要通过维胜追加保证金到交易账户，每次追加保证金建议追加至配资初始金额。</p>
			<p>七，方案结算：当您的港股方案申请终结后，您的操盘盈亏是港元，我们会按照该方案申请终结那天的港元汇率进行结算；港股交易是T+0，但交易到账是T+2，有2个交易日的在途股票，但维胜为提供优质服务，我们将比港交所更快结算。工作日17:30前的终结申请，当日结算；工作日17:30后的终结申请，下个工作日17:30前结算。</p>
        </div>
        <div class="hp_mainbar hp_mbox4" style="display:none;">
            <h1>港股收费介绍</h1>
            <p>一，账户管理费：即交易账户的使用费，会在国家规定的港股交易日每天从平台余额自动扣除固定的费用。如果您在维胜的平台余额不够扣除管理费，那么维胜会先限制买入，两日后会按照港股操盘用户协议对交易账户强制平仓并终止方案。</p>
			<p>二，通道使用费：用户通过维胜分发的交易账户进行港股操盘，需要缴纳给软件公司和证券公司通道使用费，由维胜代收。通道使用费会在方案生成的时候按照客户选择的天数一次性扣除，而当方案在自动延期后，收取规则是按天（自然日）扣除，具体数额 =总通道使用费/天数。</p>
			<p>三，交易手续费：手续费包含交易佣金、印花税、交易征费、交易费和交收费，直接由交易系统扣取，维胜平台不会再收取额外费用。手续费具体项目、收取部门及对应收费比例，详见下表：</p>
			<table width="98%" border="0" cellspacing="0" cellpadding="0" class="hp_m_list">
				<tr>
					<td>项目</td>
					<td>收费（按成交金额计算）</td>
					<td>最低收费</td>
					<td>最高收费</td>
				</tr>
				<tr>
					<td>交易佣金（由券商收取）</td>
					<td>0.03%</td>
					<td>HK$15</td>
					<td>--</td>
				</tr>
				<tr>
					<td>印花税（由香港特区政府收取）</td>
					<td>0.100%（不足一元亦作一元计算）</td>
					<td>--</td>
					<td>--</td>
				</tr>
				<tr>
					<td>交易征费（由香港证监会收取）</td>
					<td>0.0027%</td>
					<td>--</td>
					<td>--</td>
				</tr>
				<tr>
					<td>交易费（由联交所收取）</td>
					<td>0.005%</td>
					<td>--</td>
					<td>--</td>
				</tr>
				<tr>
					<td>中央结算系统股份交收费</td>
					<td>0.002%（代香港结算所收取）</td>
					<td>HK$3</td>
					<td>HK$200</td>
				</tr>
			</table>
        </div>        
        <div class="hp_mainbar hp_mbox5" style="display:none;">
            <h1>港股穿仓处理</h1>
            <p>如果您买的股票出现快速下跌，或者您来不及卖出股票，或者您忘了卖出股票，我们也来不及平仓处理（我们有权平仓，但不保证平仓价格），出现的超额亏损由操盘人承担超额亏损金，所以请养成及时关注股票情况，及时追加操盘保证金的良好投资习惯。</p>            
        </div>      
        <div class="hp_mainbar hp_mbox6" style="display:none;">
            <h1>港股停牌股处理</h1>
            <p>若客户所购股票因包括但不限于异常波动、上市公司涉嫌违规需要进行调查以及突发性事件或不可抗力等原因导致该股票停牌的，客户必须继续持有该股票，操盘期限自动延期，客户应继续按协议约定支付应付的通道使用费和账户管理费等相应款项，否则视为客户已自欠付款项之日起放弃方案中股票的持有权利。</p>
            <p>同时因违反欠费约定，客户应及时将账户内其他股票平仓，否则维胜有权依据协议约定将交易账户的全部股票变现为货币资金并办理客户操盘账户内资产的清算手续，并按照协议约定顺序清偿相关债务，客户所欠的债务全部清偿完毕，剩余部分返还至客户指定账户内。</p>
            <p>客户也可选择全额购回该停牌股票，购回次日起无需支付通道使用费和账户管理费。股票复牌之日起五个交易日内客户需卖出该股票并通知维胜进行清算，按复牌实际交易日以原方案扣除账户管理费后的剩余部分返还至客户指定账户内。</p>
        </div>             
        <div class="hp_mainbar hp_mbox10" style="display:none;">
            <h1>港股黑名单</h1>
            <p>1，在黑名单中的港股，因流动性差，易造成穿仓，根据操盘协议不能买入；</p>
            <p>2，黑名单每月更新一次，每月第1个交易日公示黑名单。从公布日起5个交易日后（包括公布日），若客户仍然持有黑名单里的股票，将被强平。</p>
       		<p><a href="http://update.tzdr.com/Future/download/hk/港股黑名单.xlsx" style="font-size: 14px;color: #3dbff6; font-weight: bold; margin-left: 20px;">点击下载港股黑名单.xlsx</a></p>
       		<p>3，若客户所购股票因包括但不限于异常波动、上市公司涉嫌违规需要进行调查以及突发性事件或不可抗力等原因导致该股票进入黑名单的，客户必须继续持有该股票，操盘期限自动延期，客户应继续按协议约定支付应付的通道使用费和账户管理费等相应款项，否则视为客户已自欠付款项之日起放弃方案中股票的持有权利。</p>
			<p style="margin-left:20px;">同时因违反欠费约定，客户应及时将账户内其他股票平仓，否则维胜有权依据协议约定将交易账户的全部股票变现为货币资金并办理客户操盘账户内资产的清算手续，并按照协议约定顺序清偿相关债务，客户所欠的债务全部清偿完毕，剩余部分返还至客户指定账户内。</p>
			<p style="margin-left:20px;">客户也可选择全额购回该进入黑名单的股票，购回次日起无需支付通道使用费和账户管理费。自该股票可交易之日起五个交易日内客户需卖出该股票并通知维胜进行清算，按可交易的实际交易日以原方案扣除账户管理费后的剩余部分返还至客户指定账户内。</p>
        </div>  
        <div class="hp_mainbar hp_mbox7" style="display:none;">
            <h1>港股操盘限制</h1>
            <p>一，只允许购买香港主板股票且不得购买黑名单里的股票；</p>
			<p>二，不得购买首日上市新股或复牌首日股票；</p>
			<p>三，借款金额10万以上至50万港币，单只股票不得超过账户总资产的70%（10万或以下不受限制）；</p>
			<p>四，借款金额50万以上至100万港币，单只股票不得超过账户总资产的50%（50万或以下不受此限制）；</p>
			<p>五，借款金额100万以上港币，单只股票不得超过账户总资产的33%（100万或以下不受此限制）；</p>
			<p>六，不得进行坐庄、对敲、接盘、大宗交易、内幕信息等违反股票交易法律法规及证券公司规定的交易。</p>
        </div>
    </div>
    <!-- 期指操盘 -->    
    <div class="hp_ctn rule hp_content" style="display: none">
    	<div class="hp_siderbar rule_siderbar">
            <a href="javascript:void(0)" data="5">国际综合</a>
            <a href="javascript:void(0)" data="0">富时A50</a>
            <a href="javascript:void(0)" data="9">恒指操盘</a>
            <a href="javascript:void(0)" data="8">国际原油</a>
            <a href="javascript:void(0)" data="2">商品综合</a>
        </div>
        <div class="hp_mainbar hp_mbox0" style="display:none;">        	
            <h1>富时A50</h1>     
            <p>新华富时中国A50指数包含了中国A股市场市值最大 的50家公司，其总市值占A股总市值的33%，是最能代表中国A股市场的指数，许多国际投资者把这一指数看作是衡量中国市场的精确指标。</p>  
            <h2>富时A50操盘流程：</h2>	
            <p>1、申请操盘：进入首页-富时A50，您可以随心随意的选择不同的开仓手数，支付不同的保证金。</p>            
            <img src="${ctx }/static/images/help/new_05.gif" width="700">           
            <p>2、操盘账号：操盘发起成功后，进入我的账户-富时A50等待发放账号。</p>           
            <img src="${ctx }/static/images/help/new_06.gif" width="700">    
            <p>3、开户处理时间：交易时间：系统将在30分钟内下发操盘账户；非交易时间：系统将在次日开盘前下发操盘账户。</p>
            <p>注意事项：如遇市场行情好，开户数多时可能遇到排队的情况，开户可能会有延迟。我们会按照发起时间顺序在第一时间为您开出。在等待开户时，您可以先去了解<a href="${ctx}/help?tab=software&leftMenu=8">富时A50交易软件</a></p>
       		<h2>富时A50操盘规则：</h2>
       		<p>1)交易品种为富时A50当期主力合约，以平台实际公示可交易品种为准。</p>	
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供交易策略服务。</p>	
       		<p>3)如交易时间内您需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
       		<p>4)交易A50合约时间为9:05-15:50和16:45-23:55，每日该时间段届满前应对账户中所有交易平仓，未能按时平仓的所有仓单系统将强制平仓。交易实行每日无负债结算制度。</p>	
       		<p>5)系统平仓线以乙方操盘账户内的总操盘金每手少于或等于2500美元时触发强制平仓线指令，系统自动对账户内所有合约按照市价平仓，最终成交价以实际成交为准。</p>	
       		<p>6)您应遵循下列交易限制：</p>
       		<p>a）不得参与集合竞价买入和卖出；</p>	
       		<p>b）可开仓最大手数由申请并成功支付的操盘保证金决定；一天之内可多次开仓，次数不限。</p>
       		<p>c）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        	<p>8)富时A50收取技术服务费每手58元。</p>        	
        </div>              
        <div class="hp_mainbar hp_mbox8" style="display:none;">        	
            <h1>国际原油</h1>     
            <p>在石油期货合约之中，原油期货是交易量最大的品种，我们推出的国际原油是投资世界交易量最大、影响力最广泛的纽约商业交易所轻原油期货合约。该合约规格为每手1000桶，报价单位为美元/桶，价格波动最小单位为1美分，当初一推出后交易活跃，为有史以来最成功的国际商品期货合约，它的成交价格成为国际石油市场关注的焦点。国际原油投资特点：1，全球性市场，操作简单  2，T+0模式，每天可多次交易，增加获利几率  3，杠杆交易原理，以小博大  4，几乎24小时交易，时间自由   5，无涨停板和交割时间限制，特别适合做短线投资。</p>  
            <h2>国际原油操盘流程：</h2>	
            <p>1、申请操盘：进入首页-国际原油，您可以随心随意的选择不同的开仓手数，支付不同的保证金。</p>            
            <img src="${ctx }/static/images/help/cl_01.gif" width="700">           
            <p>2、操盘账号：操盘发起成功后，进入我的账户-国际原油等待发放账号。</p>           
            <img src="${ctx }/static/images/help/cl_02.gif" width="700">    
            <p>3、开户处理时间：交易时间：系统将在30分钟内下发操盘账户；非交易时间：系统将在次日开盘前下发操盘账户。</p>
            <p>注意事项：如遇市场行情好，开户数多时可能遇到排队的情况，开户可能会有延迟。我们会按照发起时间顺序在第一时间为您开出。在等待开户时，您可以先去了解<a href="${ctx}/help?tab=software&leftMenu=8">易盛外盘交易软件</a></p>
       		<h2>国际原油操盘规则：</h2>
       		<p>1)交易品种为CME美原油期货当期主力合约，以平台实际公示可交易品种为准。</p>	
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供交易策略服务。</p>	
       		<p>3)如交易时间内乙方需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
       		<p>4)交易美原油期货合约时间为9:05-23:55，申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。交易实行T+2日结算制度。</p>	
       		<p>5)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</p>	
       		<p>6)您应遵循下列交易限制：</p>
       		<p>a）不得参与集合竞价买入和卖出；</p>	
       		<p>b）可开仓最大手数由申请并成功支付的操盘保证金决定；一天之内可多次开仓，次数不限。</p>
       		<p>c）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        	<p>8)国际原油收取技术服务费每手125元。</p>        	
        </div>                      
        <div class="hp_mainbar hp_mbox9" style="display:none;">        	
            <h1>恒指期货</h1>     
            <p>香港股市价格的重要指标，指数由若干只成份股（即蓝筹股）市值计算出来的，代表了香港交易所所有上市公司的12个月平均市值涵盖率的63%，恒生指数由恒生银行下属恒生指数有限公司负责计算及按季检讨，公布成份股调整。该指数于1969年11月24日首次公开发布。</p>  
            <h2>恒指期货操盘流程：</h2>	
            <p>1、申请操盘：进入首页-恒指期货，您可以随心随意的选择不同的开仓手数，支付不同的保证金。</p>            
            <img src="${ctx }/static/images/help/hsi_01.gif" width="700">           
            <p>2、操盘账号：操盘发起成功后，进入我的账户-恒指期货等待发放账号。</p>           
            <img src="${ctx }/static/images/help/hsi_02.gif" width="700">    
            <p>3、开户处理时间：交易时间：系统将在30分钟内下发操盘账户；非交易时间：系统将在次日开盘前下发操盘账户。</p>
            <p>注意事项：如遇市场行情好，开户数多时可能遇到排队的情况，开户可能会有延迟。我们会按照发起时间顺序在第一时间为您开出。在等待开户时，您可以先去了解<a href="${ctx}/help?tab=software&leftMenu=8">易盛外盘交易软件</a></p>
       		<h2>恒指期货操盘规则：</h2>
       		<p>1)交易品种为香港交易所恒生指数期货当期主力合约，以平台实际公示可交易品种为准。</p>	
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供交易策略服务。</p>	
       		<p>3)如交易时间内乙方需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
       		<p>4)交易恒生指数期货合约时间为9:20-11:55,13:05-16:00，17:05-22:55，申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。交易实行T+1日结算制度。</p>	
       		<p>5)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</p>	
       		<p>6)您应遵循下列交易限制：</p>
       		<p>a）不得参与集合竞价买入和卖出；</p>	
       		<p>b）可开仓最大手数由申请并成功支付的操盘保证金决定；一天之内可多次开仓，次数不限。</p>
       		<p>c）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        	<p>8)恒生指数收取技术服务费每手79元。</p>        	
        </div>      
        <div class="hp_mainbar hp_mbox7" style="display:none;">        	
            <h1>商品期货操盘细则</h1>     
            <table width="98%" border="0" cellspacing="0" cellpadding="0" class="hp_m_list">
			  <tr>
			    <td width="20%"></td>
			    <td width="20%;">沪金</td>
			    <td width="20%">沪银</td>
			    <td width="20%">沪铜</td>
			    <td width="20%">橡胶</td>
			  </tr>
			  <tr>
			    <td>最小波动价</td>
			    <td>0.05指数点(50元)</td>
			    <td>1个指数点(15元)</td>
			    <td>10个指数点(50元)</td>
			    <td>1个指数点(50元)</td>
			  </tr>
			  <tr>
			    <td>合约乘数</td>
			    <td>1000元/点</td>
			    <td>15元/点</td>
			    <td>5元/点</td>
			    <td>10元/点</td>
			  </tr>
			  <tr>
			    <td>交易时间</td>
			    <td>9:05-14:55,21:05-23:55</td>
			    <td>9:05-14:55,21:05-23:55</td>
			    <td>9:05-14:55,21:05-23:55</td>
			    <td>9:05-14:55,21:05-22:25</td>
			  </tr>
			  <tr>
			    <td>涨跌幅限制</td>
			    <td>开盘价格上升或下跌5%</td>
			    <td>开盘价格上升或下跌6%</td>
			    <td>开盘价格上升或下跌6%</td>
			    <td>开盘价格上升或下跌6%</td>
			  </tr>
			  <tr>
			    <td>单手保证金</td>
			    <td>1600元</td>
			    <td>400元</td>
			    <td>1700元</td>
			    <td>1000元</td>
			  </tr>
			  <tr>
			    <td>手续费</td>
			    <td>50元/手</td>
			    <td>30元/手</td>
			    <td>50元/手</td>
			    <td>50元/手</td>
			  </tr>
			</table>
			<br>
            <h2>商品期货操盘流程：</h2>	
            <p>1、选择品种申请操盘：进入首页-商品期货，在下拉导航选择您要选择的交易品种，您可以随心随意的选择不同的开仓手数，支付不同的保证金。</p>            
            <img src="${ctx }/static/images/help/pro_01.gif" width="700">           
            <p>2、操盘账号：操盘发起成功后，进入我的账户-商品期货，选择不同的交易品种，等待发放账号。</p>           
            <img src="${ctx }/static/images/help/pro_02.gif" width="700">    
            <p>3、开户处理时间：交易时间：系统将在30分钟内下发操盘账户；非交易时间：系统将在次日开盘前下发操盘账户。</p>
            <p>注意事项：如遇市场行情好，开户数多时可能遇到排队的情况，开户可能会有延迟。我们会按照发起时间顺序在第一时间为您开出。在等待开户时，您可以先去了解<a href="${ctx}/help?tab=software&leftMenu=9" target="_blank">鑫管家博易大师交易软件</a></p>
       		<h2>商品期货注意事项：</h2>
       		<p>1)交易品种为沪金期货、沪银期货、沪铜期货、橡胶期货当期主力合约，以平台实际公示可交易品种为准。</p>	
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供交易策略服务。</p>	
       		<p>3)如交易时间内您需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
       		<p>4)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</p>	
       		<p>5)您应遵循下列交易限制：</p>
       		<p>a)不得参与集合竞价买入和卖出；</p>	
       		<p>b)可开仓最大手数由申请并成功支付的操盘保证金决定；</p>
       		<p>c)实盘交易期货合约每次开仓手数不能大于可开仓最大手数；最大持仓手数也不能大于可开仓最大手数；一天之内可多次开仓，次数不限。</p>
       		<p>d)沪金期货交易标的当日涨跌幅达到4.5%时，禁止开仓；当涨跌幅达到4.8%时，将强行平仓所有持仓合约，盈亏自负。沪银、沪铜、橡胶期货交易标的当日涨跌幅达到5.5%时，禁止开仓；当涨跌幅达到5.8%时，将强行平仓所有持仓合约，盈亏自负。</p>
       		<p>e)乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>6)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        </div>
        <div class="hp_mainbar hp_mbox5" style="display:none;">        	   	
            <h1>国际综合操盘细则</h1>    
            <table width="95%" border="0" cellspacing="0" cellpadding="0" class="hp_m_list">
			  <tr>
			    <td width="12%">期货产品</td>
			    <td width="12%;">最小波动点</td>
			    <td width="12%;">最小波动价</td>
			    <td width="23%">交易时间</td>
			    <td width="26%">涨跌幅</td>
			    <td width="15%">手续费</td>
			  </tr>
			  <tr>
			  	<td>富时A50</td>
			  	<td>1个指数点</td>
			  	<td>2.5美元</td>
			  	<td>9:05-15:50,16:45-23:55</td>
			  	<td class="sp">当涨跌幅±10%和±15%时<Br>分别熔断10分钟<Br>之后无涨跌幅限制</td>
			  	<td>58元/手</td>
			  </tr>
			  <tr>
			  	<td>恒指期货</td>
			  	<td>1个指数点</td>
			  	<td>50港元</td>
			  	<td class="sp">9:20-11:55,13:05-16:10,17:05-23:40</td>
			  	<td class="sp">无涨跌幅限制</td>
			  	<td>79元/手</td>
			  </tr>
			  <tr>
			  	<td>国际原油</td>
			  	<td>0.01个指数点</td>
			  	<td>10美元</td>
			  	<td>9:05-23:55</td>
			  	<td class="sp">±10美元，暂停交易5分钟后再扩大±10美元，以此循环</td>
			  	<td>125元/手</td>
			  </tr>
			  <tr>
			  	<td>迷你道琼</td>
			  	<td>1个指数点</td>
			  	<td>5美元</td>
			  	<td>9:05-23:55</td>
			  	<td>7%,13%,20%(仅跌停)三级熔断</td>
			  	<td>125元/手</td>
			  </tr>
			  <tr>
			  	<td>迷你纳斯达克</td>
			  	<td>0.25个指数点</td>
			  	<td>5美元</td>
			  	<td>9:05-23:55</td>
			  	<td>7%,13%,20%(仅跌停)三级熔断</td>
			  	<td>125元/手</td>
			  </tr>
			  <tr>
			  	<td>迷你标普</td>
			  	<td>0.25个指数点</td>
			  	<td>12.5美元</td>
			  	<td>9:05-23:55</td>
			  	<td>7%,13%,20%(仅跌停)三级熔断</td>
			  	<td>125元/手</td>
			  </tr>
			  <tr>
			  	<td>德国DAX</td>
			  	<td>0.5个指数点</td>
			  	<td>12.5美元</td>
			  	<td>14:05-23:55</td>
			  	<td>无</td>
			  	<td>125元/手</td>
			  </tr>
			  <tr>
			  	<td>日经225</td>
			  	<td>5个指数点</td>
			  	<td>2500日元</td>
			  	<td>09:05-14:20，15:20-23:55</td>
			  	<td class="sp">±7.5%,±12.5%<br>(熔断均为15分钟;即月合约在最后交易日无涨跌停)</td>
			  	<td>125元/手</td>
			  </tr>
			</table>
			<br>
			<h2>国际综合期货操盘流程：</h2>
			<p>1、申请操盘：进入首页-国际综合，您可以随心随意的选择不同操盘保证金。操盘保证金不同，总操盘金、平仓线、初始可开仓手数不同。注：国际综合没有开仓手数限制!</p>            
            <img src="${ctx }/static/images/help/cpx_01.gif" width="700">           
            <p>2、操盘账号：操盘发起成功后，进入我的账户-国际期货，等待发放账号。</p>           
            <img src="${ctx }/static/images/help/cpx_02.gif" width="700">    
            <p>3、开户处理时间：交易时间：系统将在30分钟内下发操盘账户；非交易时间：系统将在次日开盘前下发操盘账户。</p>			
			<h2>国际综合期货注意事项：</h2>
       		<p>1)交易品种：美原油（CME CL）、富时A50（SGX CN）、恒生指数期货（HKE HSI）、日经指数225（SGX NK）、迷你道琼（CME-CBOT YM）、迷你纳指（CME NQ）、迷你标普（CME ES）、德国DAX指数（EUREX FDAX）当月主力合约，以平台实际公示可交易品种为准。</p>	
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段，可提供交易策略服务。</p>	
       		<p>3)如交易时间内乙方需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
       		<p>4)交易时长：恒生指数期货合约时间为：9:20-11:55，13:05-16:10，17:05-23:40；富时A50合约时间为：9:05--15:50，16:45-23:55；日经指数225合约时间为：09:05-14:25，15:20-23:55；美原油、迷你道琼、迷你纳指、迷你标普合约时间为：09:05-23:55；德国DAX指数合约时间为：15:05-23:55；申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。交易实行T+1日结算制度。<br>根据风控需求，在各品种停止交易的5分钟内，所有品种只能平仓，不能开仓，即11:55-12:00,14:25-14:30, 15:50-15:55, 16:10-16:15, 23:40-23:45五个时段，所有品种只能开仓，不能平仓。</p>	
       		<p>5)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</p>
       		<p>6)乙方应遵循下列交易限制：</p>
       		<p>a）不得参与集合竞价买入和卖出；</p>	
       		<p>b）可开仓最大手数由申请并成功支付的操盘保证金决定；一天之内可多次开仓，次数不限。</p>
       		<p>c）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        </div>  
        <div class="hp_mainbar hp_mbox2" style="display:none;">
        	<h1>商品综合操盘细则</h1>    
        	<table width="98%" border="0" cellspacing="0" cellpadding="0" class="hp_m_list">
        		<thead>
        			<td>期货产品</td>
        			<td>代码</td>
        			<td>最小波动点</td>
        			<td>最小波动价</td>
        			<td>交易时间</td>
        			<td>涨跌幅限制</td>
        		</thead>
        		<tr>
        			<td>黄金</td>
        			<td>AU</td>
        			<td>0.05</td>
        			<td>50元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>白银</td>
        			<td>AG</td>
        			<td>1</td>
        			<td>15元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌6%</td>
        		</tr>
        		<tr>
        			<td>铜</td>
        			<td>CU</td>
        			<td>10</td>
        			<td>50元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌6%</td>
        		</tr>
        		<tr>
        			<td>橡胶</td>
        			<td>RU</td>
        			<td>5</td>
        			<td>50元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌6%</td>
        		</tr>
        		<tr>
        			<td>铝</td>
        			<td>AL</td>
        			<td>5</td>
        			<td>25元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>沥青</td>
        			<td>BU</td>
        			<td>2</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌6%</td>
        		</tr>
        		<tr>
        			<td>热卷</td>
        			<td>HC</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>镍</td>
        			<td>NI</td>
        			<td>10</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌6%</td>
        		</tr>
        		<tr>
        			<td>螺纹钢</td>
        			<td>RB</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>锌</td>
        			<td>ZN</td>
        			<td>5</td>
        			<td>25元</td>
        			<td>9:05-14:55,21:05-00:55</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>豆</td>
        			<td>A</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>玉米</td>
        			<td>C</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>玉米淀粉</td>
        			<td>CS</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>铁矿石</td>
        			<td>I</td>
        			<td>0.5</td>
        			<td>50元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>焦炭</td>
        			<td>J</td>
        			<td>0.5</td>
        			<td>50元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>鸡蛋</td>
        			<td>JD</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55</td>
        			<td>开盘价格上升或下跌5%</td>
        		</tr>
        		<tr>
        			<td>焦煤</td>
        			<td>JM</td>
        			<td>0.5</td>
        			<td>30元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>塑料</td>
        			<td>L</td>
        			<td>5</td>
        			<td>25元</td>
        			<td>9:05-14:55</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>豆粕</td>
        			<td>M</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>棕榈油</td>
        			<td>P</td>
        			<td>2</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>聚丙烯</td>
        			<td>PP</td>
        			<td>1</td>
        			<td>5元</td>
        			<td>9:05-14:55</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>豆油</td>
        			<td>Y</td>
        			<td>2</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>棉花</td>
        			<td>CF</td>
        			<td>5</td>
        			<td>25元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>玻璃</td>
        			<td>FG</td>
        			<td>1</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>甲醇</td>
        			<td>MA</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>菜油</td>
        			<td>OI</td>
        			<td>2</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>菜粕</td>
        			<td>RM</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>白糖</td>
        			<td>SR</td>
        			<td>1</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>PTA</td>
        			<td>TA</td>
        			<td>2</td>
        			<td>10元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>动力煤</td>
        			<td>ZC</td>
        			<td>0.2</td>
        			<td>20元</td>
        			<td>9:05-14:55,21:05-23:25</td>
        			<td>开盘价格上升或下跌4%</td>
        		</tr>
        		<tr>
        			<td>五年期国债</td>
        			<td>TF</td>
        			<td>0.005</td>
        			<td>50元</td>
        			<td>9:20-11:25,13:05-15:10</td>
        			<td>开盘价格上升或下跌1.2%</td>
        		</tr>
        		<tr>
        			<td>十年期国债</td>
        			<td>T</td>
        			<td>0.005</td>
        			<td>50元</td>
        			<td>9:20-11:25,13:05-15:10</td>
        			<td>开盘价格上升或下跌2%</td>
        		</tr>
        	</table>
       		<h2 style="margin-top: 20px;">商品综合期货注意事项：</h2>
       		<p>1)交易品种涵盖上海期货交易所、大连商品交易所、郑州商品交易所和中金所大部分品种，具体以商品综合页面显示品种为准，只能交易当期主力合约。</p>
       		<p>2)交易时段内申请并成功支付操盘保证金的，该时段内可提供商品综合投资策略服务；非交易时段内申请并成功支付操盘保证金的，在下一交易时段之前，可提供商品综合投资交易策略服务。</p>
       		<p>3)如交易时间内乙方需对账户进行结算的，须实盘账户已清仓，才可申请结算。</p>
        	<p>4)申请人在交易日该时间段届满前应对账户中所有交易进行平仓，未能按时平仓的所有仓单系统将强制平仓。交易日申请结束方案，可于申请当日进行结算；非交易日申请结束方案，于顺延第一个交易日进行结算。</p>
        	<p>5)当乙方操盘账户内的总操盘金少于或等于亏损平仓线时，系统将触发强制平仓指令，自动对账户内所有合约按照市价平仓，强平单的最终成交价以实际成交价为准，强平完成后，账户将被限制进行新的开仓交易。</p>
       		<p>6)乙方应遵循下列交易限制：</p>
       		<p>a）不得参与集合竞价买入和卖出；</p>
       		<p>b）可开仓最大手数由申请并成功支付的操盘保证金决定；</p>
       		<p>c）商品综合交易标的当日涨跌幅达到距交易所规定涨跌幅0.5%时，禁止开反向仓；当涨跌幅达到距交易所规定涨跌幅0.2%时，将强行平仓所有反向持仓的合约，盈亏自负。正向持仓不做此限制。例如：上海期货交易所规定沪金的当日涨跌幅是5%，那么，沪金涨幅达到4.5%时，禁止开空仓，但仍可以开多仓；当涨幅达到4.8%时，将强平空仓，但多仓仍可持有。</p>
       		<p>d）乙方自行设定的与交易有关的各项规则如与丙方在系统中设置的规则冲突时，乙方设置内容无效。</p>
       		<p>7)结算规则：操盘盈亏=账户所有持仓平仓结算后账户余额-操盘初始资金；如操盘盈利，则盈利作为报酬归乙方所有，如操盘亏损且亏损额度小于或等于操盘保证金金额的，则亏损由乙方承担，直接从操盘保证金中扣除；超出操盘保证金部分丙方保留追讨权利；乙方同意结算金额以交易系统后台清算数据为准。</p>
        </div> 
    </div>
    <!--安全保障  -->
    <div class="hp_ctn safety hp_content" style="display: none">
        <div class="hp_siderbar safety_siderbar">
            <a href="javascript:void(0);" class="on" data="1">安全保障</a>
            <a href="javascript:void(0);" data="2">法律保障</a>
            <a href="javascript:void(0);" data="3">资金安全保障</a>
            <a href="javascript:void(0);" data="4">信息安全保障</a>
            <a href="javascript:void(0);" data="5">交易安全保障</a>
            <a href="javascript:void(0);" data="6">专业风控保障</a>
             <a href="javascript:void(0);" data="7">协议安全保障</a>
        </div>
        <div class="hp_mainbar hp_mbox1">
        	<h1>安全保障</h1>
            <p>维胜对客户交易资金的管理完全按照"专户专款专用"的标准模式进行运作，并且实行三方监管——资金由银行监管，交易由券商监管，风控由维胜监管。交易委托使用交易软件系统实时进入股市，通过合作券商进行股票交易，确保交易安全、快捷。并通过自主企业出资，引入多级风控管理机制，降低投资风险和门槛。维胜提供的随心操盘服务效率高、收费透明、流程简单，用心帮助每一位客户实现财富梦想、走上人生巅峰。</p>
        </div>
        <div class="hp_mainbar hp_mbox2" style="display:none;">
        	<h1>法律保障</h1>
            <p>配资属于民间借贷的一种形式，根据《合同法》和《电子签名法》，合同严格地受法律保护，双方权益得到有力保障。电子合同和纸质合同具备同等法律效力。</p>
        </div>
        <div class="hp_mainbar hp_mbox3" style="display:none;">
        	<h1>资金安全保障</h1>
            <p>维胜网与招商银行达成合作关系，招商银行作为维胜网的第三方账户存管银行，有权对存管账户资金进出进行管理、对账户资金进行确认，确保客户的资金安全；客户在维胜的交易资金是可以完全放心的。</p>
        </div>
        <div class="hp_mainbar hp_mbox4" style="display:none;">
        	<h1>信息安全保障</h1>
            <p>我们严格遵守国家相关的法律法规，保护客户的隐私。未经您的同意，我们永不会向任何第三方公司、组织和个人披露您的个人信息、账户信息以及交易信息（法律法规另有规定的除外）。</p>
        </div>
        <div class="hp_mainbar hp_mbox5" style="display:none;">
        	<h1>交易安全保障</h1>
            <p>交易指令通过交易软件直接到券商席位下单，和直接在券商开户炒股完全一样；并受合作券商、沪深交易所和证监会三重监管。客户挂单真实可见，每一笔交易都可以在开通了Level2”功能的大智慧、同花顺等股票行情软件中查询。</p>
        </div>
        <div class="hp_mainbar hp_mbox6" style="display:none;">
        	<h1>专业风控保障</h1>
            <h2>为了保护操盘资金的安全，同时帮您养成良好的投资习惯，交易账户会设置亏损警戒线和亏损平仓线。</h2>
            <p>亏损警戒线：当总操盘资金低于警戒线以下时，只能平仓不能建仓，需要尽快补充风险保证金，以免低于亏损平仓线被平仓。</p>
            <p>亏损平仓线：当总操盘资金低于平仓线以下时，我们将有权把您的股票进行平仓，为避免平仓发生，请时刻关注风险保证金是否充足。</p>
        </div>
        <div class="hp_mainbar hp_mbox7" style="display:none;">
        	<h1>协议安全保障</h1>
            <div class="hp_safetitle">一、投融保交易电子数据保全，把交易合同锁进保险箱</div>
            <p>上海信闳投资管理有限公司联手重庆邮电大学电子数据保全中心，为投资者提供交易凭证保全服务。交易凭证（担保函、担保合同等信息）一旦保全，其内容、生成时间等信息将被加密固定，任何细微的修改都会 导致保全证书函数值的变化，预防遭人更改，且生成唯一的保全证书供下载。如发生司法纠纷，保全证书持有人可以通过电子数据保全中心提供的认证证书向法院或仲裁机构提供有效、可靠 的证据，从而获得举证的优势地位。</p>
            <div class="hp_safetitle">二、答题解惑</div>
            <h4>1.投资者如何检验保全证书真伪？</h4>
            <p>投资者拿到保全证书后，可以登录www.ebaoquan.org，录入证书上的备案号及上传被保全文件（如电子合同）进行真伪验证。或者从收到证书生成的邮件中， 点击查看“查看我的保全证书”，进入证书页面使用验证功能。</p>
            <h4>2.电子数据保全是否具有法律效力？</h4>
            <p>最新修正的《刑事诉讼法》《民事诉讼法》均将电子数据列为证据的一种。电子数据保全中心提供的保全证书，可作为司法人员和律师分析、认定案件事实的有效证据，让受保者在司法纠纷中占据有利地位。根据受保者需要，电子数据保全中心还可以为受保者提供合作机构出具的公证书或司法鉴定书。</p>
            <h4>3.为什么选择电子数据保全？</h4>
            <p>相较传统取证手段，电子数据保全具有低成本，高效率，保密（系统仅仅在本地生成数据的数字摘要，绝无泄露隐私、商业秘密、内容的风险）合法、权威等优势， 并且可通过事先存证来预防和化解纠纷，是互联网投资者保护交易证据安全的首选。</p>
            <div class="hp_safetitle">三、重庆邮电大学电子数据保全中心</div>
            <p>重庆邮电大学电子数据保全中心（ ebaoquan.org )是重庆邮电大学利用自研专利技术，建立的以电子数据第三方证明为核心的平台。该平台目前已获得三项专利，6项国家CNAS资格认证《电子数据保全及电子文件搜索》《录音真实性鉴定》《电子数据恢复和提取》《图像真实性鉴定》《电子数据的分析与鉴定》《电子邮件真实性鉴定》，拥有独立司法鉴定资格（国家颁发司法鉴定许可证）、与重庆版权局、公证处等单位达成合作协议，拥有专属绿色通道。</p>
            <div class="hp_safelink"><a href="https://www.ebaoquan.org/handbook" target="_blank">手把手教你做保全</a><a href="https://www.ebaoquan.org/" target="_blank">了解详情</a></div>
            <h4>重庆邮电大学电子数据保全中心提供什么？</h4>
            <div class="hp_safecqpic">
                <ul class="hp_safecqone">
                    <li class="hp_sfcq_img"><img src="${ctx }/static/images/help/cre_0.gif"></li>
                    <li class="hp_sfcq_font">
                        <em>电子数据保全证书</em>
                        <span>电子数据在线保全是指对以电子数据形式(包括文字、图形、字母、数字、三维标志、颜色组合和声音以及上述要素的组合等,下同)存在的各类电子数据信息，运用专利技术进行运算、加密固定，载明保全生成的标准时间、运算值、档案编号等，以防止被人篡改，确保电子数据的原始性、客观性的程序及方法。</span>
                    </li>
                </ul>
                <div class="hp_safecqtow">
                    <img src="${ctx }/static/images/help/cre_1.gif">
                    <span>获得国家颁发司法鉴定证书，拥有司法鉴定资格</span>
                </div>

            </div>
            <div class="hp_safetitle">四、鉴定中心资质</div>
            <div class="hp_safepic">
                <img src="${ctx }/static/images/help/cre_3.gif">
                <img src="${ctx }/static/images/help/cre_4.gif">
                <img src="${ctx }/static/images/help/cre_5.gif">
                <img src="${ctx }/static/images/help/cre_6.gif">
                <img src="${ctx }/static/images/help/cre_7.gif">
                <img src="${ctx }/static/images/help/cre_8.gif">
            </div>        	
        </div>        
    </div>
    <!--交易软件下载  -->
    <div class="hp_ctn software hp_content" style="display:none;">
        <div class="hp_siderbar software_siderbar">
            <a href="javascript:void(0)" class="on" data="1">股票交易系统</a>            
            <a href="javascript:void(0)" data="12">股票掌上交易系统</a>
            <a href="javascript:void(0)" data="8">国际期货交易系统</a>
            <a href="javascript:void(0)" data="9">商品期货交易系统</a>
        </div>
        <div class="hp_mainbar hp_mbox1" style="display:none;">
            <h1 style="border-bottom:1px solid #d1d1d1;">钱隆TTS股票交易系统<span style="font-size:16px; color:#f00; padding-left:10px;">请股票合买和港股操盘的用户下载此软件！</span></h1>    
            <div class="hp_tts">               
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">win XP用户安装时需注意</h6>   
                <p style="margin-bottom:40px; text-indent:0;">1，先下载并安装“<a href="http://update.tzdr.com/Future/download/.netFramework3.5.exe">.NET Framework 3.5</a>”；<br>2，再下载并安装“<a href="http://update.tzdr.com/Future/download/%E9%92%B1%E9%9A%86TTS.exe">钱隆TTS股票交易系统</a>”，然后启动程序。<br>若程序仍无法运行，请致电客服400-852-8008。</p>  
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">win 7用户安装时需注意</h6>  
                <p style="margin-bottom:40px; text-indent:0;">1，直接下载安装“<a href="http://update.tzdr.com/Future/download/%E9%92%B1%E9%9A%86TTS.exe">钱隆TTS股票交易系统</a>”，然后启动程序；<br>	2，若程序无法运行，请补充下载并安装“<a href="http://update.tzdr.com/Future/download/.netFramework3.5.exe">.NET Framework 3.5</a>”，再运行TTS系统。<br>若程序仍无法运行，请致电客服400-852-8008。</p> 
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">win 8用户安装时需注意</h6>      
                <p style="margin-bottom:40px; text-indent:0;">1，先下载并安装“<a href="http://update.tzdr.com/Future/download/vcredist_x86.zip">VC2005运行库</a>”；<br>2，再下载并安装“<a href="http://update.tzdr.com/Future/download/%E9%92%B1%E9%9A%86TTS.exe">钱隆TTS股票交易系统</a>”，然后启动程序。<br>若程序仍无法运行，请致电客服400-852-8008。</p>            
            	<h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">钱隆TTS本身不带行情，推荐第三方行情系统：</h6>   
            	<p style="text-indent:0;">选择一，<a href="http://zjcmpp.hexin.com.cn/soft/THS_freeldy.exe">“同花顺免费炒股软件”</a>，下载安装后无需登录即可打开软件<br>1，沪深A股和港股都可以看行情<br>2，港股实时行情，20只个股的展示限制，但可以手工查询指定的个股看实时行情，另外还需手动刷新行情。注意：手工查询时，应输入股票名称首字母，输入代码无效。</p>
            	<p style="text-indent:0;">选择二，<a href="http://www.tdx.com.cn/products/level2/new_tdx.exe">“通达信金融分析终端软件”</a>，下载安装、启动软件后选择“免费精选行情登录”，无需账号即可登录 <br>1，沪深A股和港股都可以看行情<br>2，港股行情延时15分钟，但会展示所有港股股票</p>
            </div>
            <ul class="hp_tts_down">
                <li>
                	<a href="javascript:void(0);" style="cursor:text;">钱隆TTS介绍</a>
                	<p>钱隆TTS资管之家客户端，是资管专用的投资交易委托下单系统， 支持股票交易相关买入、卖出、信息查询等功能，具有交易灵活可靠、交易速度快、 系统稳定等特点。</p>	
                </li>
                <li>
                    <a href="javascript:void(0);" style="cursor:text;">.Net Framework3.5介绍</a>
                    <p>.Net Framework3.5是支持和运行应用程序内部Windows的组件。运行钱隆TTS交易软件，电脑操作系统必须已安装.Net Framework3.5。</p>
                </li>
                <li>
                    <a href="javascript:void(0);" style="cursor:text;">VC2005运行库介绍</a>
                    <p>运行库是一个经过封装的程序模块，如果不使用运行库，操作系统在运行程序时找不到对应的运行库程序就无法运行。运行钱隆TTS交易软件，电脑系统必须已经安装VC运行库。</p>
                </li>
            </ul>    
        </div>
        <div class="hp_mainbar hp_mbox8" style="display:none;">
            <h1 style="border-bottom:1px solid #d1d1d1;">直达-快抢手快速下单软件</h1> 
            <div class="hp_tts">   
           		<h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">移动手机用户安装时需注意：</h6> 
           		<p style="margin-bottom:10px; text-indent:0;">1，安卓手机请扫描二维码下载、安装快抢手APP；</p>              
                <img src="${ctx}/static/images/help/softcode.png">
                <p style="margin-bottom:40px; text-indent:0;">2，iPhone手机暂不支持，iOS APP即将推出。</p>
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">Win XP用户安装时需注意：</h6>   
                <p style="margin-bottom:40px; text-indent:0;">1，先下载并安装“<a href="http://update.tzdr.com/Future/download/Microsoft.NET.exe">.NET Framework 4.0</a>”；<br>2，再下载并安装“<a href="http://update.tzdr.com/Future/download/快抢手快速下单软件V2.0.3.msi">快抢手快速下单软件</a>”，然后启动软件。</p>  
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">win 7用户安装时需注意</h6>  
                <p style="margin-bottom:40px; text-indent:0;">1，下载并安装“<a href="http://update.tzdr.com/Future/download/快抢手快速下单软件V2.0.3.msi">快抢手快速下单软件</a>”；<br>2，若软件提示“此安装程序需要.NET Framework 4.0”，再下载并安装“<a href="http://update.tzdr.com/Future/download/Microsoft.NET.exe">.NET Framework 4.0</a>”，再安装“快抢手快速下单软件”，然后启动软件。</p>
                <h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">Win 8/8.1、Win 10用户安装时需注意</h6>      
                <p style="margin-bottom:40px; text-indent:0;">1，先下载并安装“<a href="http://update.tzdr.com/Future/download/快抢手快速下单软件V2.0.3.msi">快抢手快速下单软件</a>”，安装时有风险预警，请继续选择安装；<br>2，更改软件以兼容模式运行，如下图，更改后再启动软件；：<br><img src="${ctx}/static/images/help/jr_01.gif" style="height:407px;margin-right: 20px;"><img src="${ctx}/static/images/help/jr_02.gif" style="width:320px;"><br>3，请务必更改兼容性！否则启动软件后，登录界面没有交易和行情服务器选择，无法登录软件。</p>            
            	<h6 style="font-weight:bold;color:#f00; margin-bottom:10px;">若程序仍无法运行，请致电客服400-852-8008。</h6>
            	<h6 style="font-weight:bold;color:#f00; margin-bottom:10px; margin-top:40px;">快抢手快速下单软件使用基本说明：</h6>
            </div>        
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">1，第一次登录软件后，默认是没有任何合约显示，黑色区域内单击右键，选择“设置合约显示”</h3>
            <img src="${ctx}/static/images/help/kq_01.gif">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">2，在设置合约的弹窗上，选择相应期货的主力合约：<br><span style="">A，富时A50，是在SGXQ[SGXQ]菜单下→A50<br>B，恒指期货，是在HKEX[HKEX]菜单→恒指<br>C，国际原油，是在CME[CME]菜单→原油</span></h3>
            <img src="${ctx}/static/images/help/kq_03.gif">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">3，当期货合约没有行情数据显示时，有可能是期货行情服务器已断开，重新连接即可。<br><span style="color:#f00;">注：行情信息属于公共信息，当行情波动大时，各个行情软件都可能会出现不能及时刷新等问题，具体成交点位，以交易软件成交为准。行情可参考第三方行情软件，比如文华财经等。</span></h3>
            <img src="${ctx}/static/images/help/kq_02.gif">          
        </div>        
        <div class="hp_mainbar hp_mbox9" style="display:none;">
            <h1 style="border-bottom:1px solid #d1d1d1;">先融期货-鑫管家博易大师</h1>
            <a href="http://update.tzdr.com/Future/download/boyidashi.exe"><img src="${ctx}/static/images/help/byds.gif" style="display:block; margin:30px auto 10px;" width="216" height="66"></a>
            <h1>博易大师说明</h1>
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">1，启动博易大师软件，弹出登录界面，填写一个公用的软件登录账号和密码。登录账号：10018019，登录密码：210926。</h3>
            <img src="${ctx}/static/images/help/by_01.jpg" width="606">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">2，请注意查看软甲最顶部的菜单栏，点击『交易』按钮，或者直接按键盘上的F12键，系统会弹出交易账户登录界面。</h3>
            <img src="${ctx}/static/images/help/by_02.png" width="606">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">3，在交易账户登录界面，使用我们分配给您的交易账号和密码进行登录。</h3>
            <img src="${ctx}/static/images/help/by_03.png" width="606">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">4，在交易软件的最左边，请选择『商品期货』标签，然后在黑色主界面选择商品期货（沪金、沪银、沪铜、橡胶）对应的主力合约。<br><span style="color:#f00;">注：行情信息属于公共信息，当行情波动大时，各个行情软件都可能会出现不能及时刷新等问题，具体成交点位，以交易软件成交为准。</span></h3>
            <img src="${ctx}/static/images/help/pro_04.gif" width="606">
            <h3 style="line-height:24px; margin:10px 0 15px; color:#333;">5，在软件左下方的下单区域，进行『买入』或『卖出』，开始正式的商品期货操盘。</h3>
            <img src="${ctx}/static/images/help/pro_05.gif" width="606">
        </div>        
        <div class="hp_mainbar hp_mbox12" style="display:none;">
        	<h1 style="border-bottom:1px solid #d1d1d1;">股票掌上交易系统<span style="font-size:16px; color:#f00; padding-left:10px;">股票合买的用户可以使用此软件！</span></h1>
        	<h1>一、如何进入掌上交易</h1>
        	<h4>1、关注微信（推荐）</h4>
        	<h3>第一步：在微信中搜索维胜或shxhtzdr，关注维胜微信公众号，或扫描下图二维码直接关注。</h3>
        	<img src="${ctx}/static/images/help/wx_tzdr.jpg" widht="280">
        	<h3>第二步：点击维胜微信菜单“我要操盘”-->“掌上交易”</h3>
        	<img src="${ctx}/static/images/help/wx_01.gif">        	
        	<h4>2、或直接扫描二维码进入掌上交易</h4>
        	<img src="${ctx}/static/images/help/wx.png">   	
        	<h4>3、在移动端直接输入网址：<a href="http://wxjy.peigubao.com/MTrader/logonentry.php" target="_blank">http://dwz.cn/tzdrwsjy</a></h4>
        	<h1>二、如何交易</h1>
        	<h3>1、登录：输入操盘账号和密码，点击登录即可。如您已申请操盘账号，请在“我的账户”中查看。如您未申请操盘，可在网站申请并领取账号、密码后登录。</h3>        	
        	<img src="${ctx}/static/images/help/wx_02.gif"> 
        	<h3>2、交易：如图所示“买入”即为买入股票操作；“卖出”即为卖出股票操作；撤单查询即为撤单操作。</h3>        	
        	<img src="${ctx}/static/images/help/wx_03.gif"> 
        	<h3>3、查询：如图所示“查询”可查看资金、股票持仓、当日委托和当日成交等数据。</h3>
        	<img src="${ctx}/static/images/help/wx_04.gif"> 
        	<h3>如在使用过程中有任何疑问，欢迎致电客服电话或咨询客服QQ。</h3>
        </div>  
    </div>
    <!--新手指南  -->
    <div class=" hp_ctn hp_guide newbie hp_content" style="display: none">
        <div class="hp_siderbar newbie_siderbar ">
            <a href="javascript:void(0)" class="on" data="1">注册</a>
            <a href="javascript:void(0)" data="2">登录</a>
            <a href="javascript:void(0)" data="3">实名</a>
            <a href="javascript:void(0)" data="4">充值</a>
            <a href="javascript:void(0)" data="5">提现</a>
            <a href="javascript:void(0)" data="6">常见问题</a>
        </div>
        <div class="hp_mainbar hp_mbox1" >
        	<h2>如何注册成为维胜用户？</h2>
        	<p>第一步：打开维胜首页(www.tzdr.com)，点击首页头部“注册”，跳转注册页面；</p>
        	<img src="${ctx}/static/images/help/rg_01.jpg" width="600" style="margin-left:30px;">
        	<p>第二步：填写手机号码、手机验证码、密码、确认密码、推广码等信息；</p>
        	<img src="${ctx}/static/images/help/rg_02.png" width="600" style="margin-left:30px;">
        	<p>第三步：提交信息，注册成功。</p>
        	<img src="${ctx}/static/images/help/rg_03.jpg" width="600" style="margin-left:30px;">
        </div>
        <div class="hp_mainbar hp_mbox2" style="display:none;">
        	<h2>如何登录维胜网站？</h2>
        	<p>方法一：在首页顶登录框，填写手机号和密码，点击登录；</p>
        	<img src="${ctx}/static/images/help/lg_01.jpg" width="600" style="margin-left:30px;">
        	<p>方法二：</p>
        	<p>1.在首页顶部点击登录，跳转登录页；</p>
        	<img src="${ctx}/static/images/help/lg_02.jpg" width="600" style="margin-left:30px;">
        	<p>2.填写手机号码、密码，点击登录；</p>
        	<img src="${ctx}/static/images/help/lg_03.jpg" width="600" style="margin-left:30px;">
        </div>
        <div class="hp_mainbar hp_mbox3" style="display:none;">
        	<h2>如何完成实名认证？</h2>
        	<p>第一步，进入个人中心—安全信息，实名认证模块，点击立即认证；</p>
        	<img src="${ctx}/static/images/help/name_01.png" width="600" style="margin-left:30px;">
        	<p>第二步，填写真实实名、身份证号码提交，认证成功</p>
        	<img src="${ctx}/static/images/help/name_02.png" width="600" style="margin-left:30px;">
        </div>
        <div class="hp_mainbar hp_mbox4" style="display:none;">
        	<h2>如何充值？</h2>
        	<p>第一步，进入个人中心—账户充值，选择充值方式；</p>
        	<img src="${ctx}/static/images/help/charge_01.jpg" width="600" style="margin-left:30px;">
        	<p>第二步，填写充值金额和相关资料，提交；</p>
        	<img src="${ctx}/static/images/help/charge_02.png" width="600" style="margin-left:30px;">
        	<p>第三步，完成支付，等待转账。</p>        	
        </div>
        <div class="hp_mainbar hp_mbox5" style="display:none;">
        	<h2>如何提现？</h2>
        	<p>第一步，进入个人中心—我要提现，选择银行卡管理；添加银行卡，选择开户银行，填写银行卡号和确认卡号，点击保存；</p>
        	<img src="${ctx}/static/images/help/wd_01.jpg" width="600" style="margin-left:30px;">
        	<p>第二步，设置提现密码：</p>
        	<p>a.进入个人中心—安全信息页面，在提块密码模块点击“立即设置”；</p>
        	<img src="${ctx}/static/images/help/wd_02.jpg" width="600" style="margin-left:30px;">
        	<p>b.填写提现密码和确认提现密码。</p>
        	<img src="${ctx}/static/images/help/wd_03.gif" style="margin-left:30px;">
        	<p>第三步，选择我要提现选项卡，填写提现金额、提现银行、提现密码，点击下一步；</p>
        	<img src="${ctx}/static/images/help/wd_04.gif" width="600" style="margin-left:30px;">
       		<p>第四步，等待提现到账。</p>
       </div>            
       <div class="hp_mainbar hp_mbox6" >
       		<h1>常见问题</h1>
            <h2 class="hp_mbtitle">1、配资炒股风险高吗？</h2>
            <p>股票投资会有一定的风险的，配资进行炒股的话也会有相应的风险，配资比例越高，您的收益比例越高，那么风险相对也会越高。您需要选择一个合适比例的配资方案来进行投资，如果触发亏损警告线的话，您需要及时补仓避免被自动平仓。</p>
            <h2 class="hp_mbtitle">2、我的资金安全吗？</h2>
            <p>我们对客户交易资金的管理完全按照"专户专款专用"的标准模式进行运作，并且以三方监管模式——资金由银行监管，交易由券商监管，风控由维胜监管。交易委托通过恒生电子交易系统实时进入合作券商在市场上成交，确保交易安全、快捷。</p>
            <h2 class="hp_mbtitle">3、如何能降低配资的风险？</h2>
            <p>建议您在进行配资的时候选取低杠杆倍率的配资方案，并且在购入股票的时候不要进行满仓购买，这样投资风险会相对较低。也建议您预留一定的资金作为备用金，在触发亏损警告时，能及时进行补仓操作，避免因股市波动造成平仓的风险。</p>
            <h2 class="hp_mbtitle">4、收费怎么会有利息和管理费两项？</h2>
            <p>股票操盘收费是由利息和管理费两部分组成，利息是您借用资金收取的费用，而管理费则是对您账户管理收取的费用。利息是在申请账户时一次性收取，管理费比较灵活，是按交易日每天收取。</p>
            <h2 class="hp_mbtitle">5、申请方案成功如何查询交易账户和密码？</h2>
            <p>申请方案成功后，达人将通过短信进行提醒，收到短信后就可在您的达人账户查看您的交易账号和密码，首先点击我的账户；然后找到操盘账户，点击“股票操盘”；最后在操盘详细下点击“交易账户”即可查看。</p>
            <h2 class="hp_mbtitle">6、为什么会限制买入，如何解除？</h2>
            <p>为了控制您的风险，当您方案的资产总值触及到补仓线（预警值）时，系统会自动限制买入，如您补充保证金到补仓线之上或反弹后资产到补仓线之上，可以进行限制买入的解除，解除时间在每天的两次收市之后，当然需要提前解除可随时联系客户。此外，但
您的账户处于欠费状态，同样会限制买入的。补费后即可解除。</p>
			<h2 class="hp_mbtitle">7、为什么补交管理费后仍不能买入？</h2>
            <p>每日管理费将在早上8:00扣除，如您在8:00后补交当日管理费，则顺延至下一个交易日统一扣除，补交后请及时联系客服解除限制买入。</p>
            <h2 class="hp_mbtitle">8、管理费欠费会被平仓吗？</h2>
            <p>当您欠当日管理费时，及时补充则不影响您的任何操作；如您欠费2个交易日，则系统将在欠费的第二个交易日开盘时平仓。</p>
            <h2 class="hp_mbtitle">9、为什么委托单显示是废单？</h2>
            <p>当您买入时，如购买的股票为限制购买股票或该笔委托为对敲时，会出现废单的情况，如对敲请稍后重新进行委托；当您卖出时，如卖出的数量不是100的整数倍，则会出现废单。</p> 
            <h2 class="hp_mbtitle">10、登录交易软件提示账户密码错误怎么办？</h2>
            <p>首先请注意您密码的大小写更替，如还是不能登录可联系客服更改密码。</p>
            <h2 class="hp_mbtitle">11、被平仓后怎么办？</h2>
            <p>为了降低您的风险，当您交易账户的资产总值触及到平仓线时，系统将自动平仓；平仓后可追加保证金至补仓线之上，继续买卖其他的股票，方案仍可继续。</p>	
            <h2 class="hp_mbtitle">12、方案到期后如何延期？</h2>
            <p>当方案到期后，只要您的达人平台余额足够扣除您的延期利息和管理费，并且您没有申请终止方案，系统都是默认为自动延期的，延期利息按您原方案的标准核算成每天的扣除，以自然日计算，管理费不变。</p>	
            <h2 class="hp_mbtitle">13、为什么无法终止操盘？</h2>
            <p>当您的交易账户有持仓股票或委托单时，将无法终止操盘，请在终止操盘前将您该方案的所有股票清仓并撤销委托单，即可终止操盘。</p>	
       </div>   
    </div>
</div>
<!--底部 -->
<%@include file="../common/footer.jsp"%>
<script type="text/javascript">
	var tab = '${tab}';
	var leftMenu = '${leftMenu}';
	if($.trim(tab) != null && $.trim(tab).length > 0 && $("."+tab) != null && $("."+tab).length > 0){
		$('.helpTitle').each(function() {
			if($.trim($(this).attr("data-type")) == tab){
				$('.helpTitle').removeClass('on');
				$(this).addClass('on'); 
			}
	    });
		$(".hp_ctn").css({display: "none"});
		$("."+tab).css({display: ""});
		if($.trim(leftMenu) != null && $.trim(leftMenu).length > 0){
			$("."+tab).find("div").find("a").each(function() {
				if($.trim($(this).attr("data")) == leftMenu){
					$("."+tab).find("div").find("a").removeClass('on');
					$(this).addClass('on'); 
					$("."+tab).find('.hp_mainbar').hide();
					$("."+tab).find('.hp_mbox'+leftMenu).show();
				}
			});
		}
	}
</script>
<%@ include file="../common/dsp.jsp"%>
</body>
</html>