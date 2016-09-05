<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.tzdr.common.utils.ConfUtil"%>
<link href="${ctx }/static/css/trade.css?v=20151127" rel="stylesheet" type="text/css" />
<div class="top-title">
    <div class="topctn">
        <div class="top_tel"><!--<i></i>-->全国客服热线：<span>400</span>-<span>852</span>-<span>8008</span></div>
        <%
       		if(request.getSession().getAttribute("userName")!=null){
       	%>
       	<ul>
            <li class="download" style = "color:#999; font-size: 12px;"><em >你好，<a href="${ctx}/user/account" class="top_myt" style = "color:#fc3;"><%=request.getSession().getAttribute("userName").toString() %></a></em><a style="margin-left: 36px;" href="${ctx}/logout">退出</a></li>
            <li class="top_myc"><a href="${ctx}/user/account" class="on" target="_blank">我的账户</a></li>
            <li><a href="${ctx}/help?tab=software&leftMenu=1" target="_blank">交易软件下载</a></li>
            <li><a href="${ctx}/help?tab=rule&leftMenu=1" target="_blank">新手指南</a></li>
        </ul>
       	<%
       		}else{
       	%>
       	<ul>
       		<li class="sign"><a href="${ctx}/user/account">登录</a><span class="sign_span"> | </span><a href="${ctx}/signin">注册</a></li>
            <li><a href="${ctx}/help?tab=software&leftMenu=1" target="_blank">交易软件下载</a></li>
            <li><a href="${ctx}/help?tab=rule&leftMenu=1" target="_blank">新手指南</a></li>
        </ul>
       	<%
       		}
       	%>
       	<!-- 我的账户 -->
       	<div class="top_mynav top_mytel" style="display: none; top:1px;">
       		<% if(request.getSession().getAttribute("userName") != null){%>
            <h2><%=request.getSession().getAttribute("userName").toString() %></h2>
            <%} %>
            <a href="${ctx}/user/account">操盘账户</a>
            <a href="<%=ConfUtil.getContext("p2p.user.account")%>">投资账户</a>
        </div>
        <!-- 我的账户 -->
        <div class="top_mynav top_myname" style="display:none; top:1px;">
            <h2>我的账户</h2>
            <a href="${ctx}/user/account">操盘账户</a>
            <a href="<%=ConfUtil.getContext("p2p.user.account")%>">投资账户</a>
        </div>
    </div>
</div>

<div style="background: #333; height: 85px;">
<div class="navbox">
    <div class="nav">
        <div class="navlogo"><a href="http://www.vs.com"><img src="${ctx}/static/images/common-new/new_logo.png" title="维胜" alt="维胜"></a></div>
        <ul class="navlist">
            <li><a href="${ctx}/" id="shouye" class="on" style="padding: 0 16px 26px 16px;">首页</a></li>
            <li><a id="hengzhiqidai" href="${ctx}/hsi/index">恒指期货</a></li>
            <li><a id="guojiyuanyou" href="${ctx}/crudeoil/index">国际原油</a></li>
            <li><a id="fushia50" href="${ctx}/ftse/index">富时A50</a></li>
            <li><a id="guojizonghe" href="${ctx}/outDisk/index">国际综合</a></li>
           
            <%
        		if(request.getSession().getAttribute("userName") !=null){
        	%>
           		<li><a id="nav_my" href="${ctx}/user/account" class="nav_l_mc">我的账户</a></li>
        	<%
        		}else{
        	%>
            	<li><a id="nav_my" href="${ctx}/user/account" class="nav_l_mcnot">我的账户</a></li>
        	<%
        		}
        	%>
        	
        </ul>
    </div>
</div>
</div>
<!-- 浮动层 -->

<div class="floatlayer">
    <!-- 联系客服、返回顶部 -->
    <div class="fl_server">
    	<p class="fl_sv_tent"><a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4008528008&aty=0&a=0&curl=&ty=1" target='_blank'></a></p>
    	<div class="fl_sv_code">
        	<a href="javascript:void(0)" target="_blank">
        		<div class="fl_sv_codetk" style="display: none;">
        			<img src="${ctx}/static/images/common-new/appxiazai-app.png">
        		</div>
        	</a>
        </div>
        <p class="fl_sv_up"><a href="javascript: scrollTop();"></a></p>   
    </div>
</div>
<script type="text/javascript">
$(document).ready(function() {
    $('.top_mynav').hover(function() {
	}, function() {
	    $(this).hide();
	});
    $('.nav_l_together').hover(function() {
		$('.nav_together').show();
	});
	$('.nav_l_future').hover(function() {
		$('.nav_profur').show();
	});
	$('.nav_l_pro').hover(function() {
		$('.nav_pronav').show();
	});
	$('.nav_l_sif').hover(function() {
		$('.nav_prosif').show();
	});
	$('.nav_tknav').hover(function() {
	}, function() {
	    $(this).hide();
	});
	
    $('.fl_sv_code a').hover(function() {
        $('.fl_sv_codetk ').show();
    }, function() {
        $('.fl_sv_codetk ').hide();
    }); 
    $('.top_mynav').hover(function() {
	}, function() {
	    $(this).hide();
	});
    
    /*二维码*/
    $('.follow .erweima').hover(function() {
        $('.erweima-wxtk').show();
    }, function() {
        $('.erweima-wxtk').hide();
    });
    
    // 加载最新公告
    var showNotice = false;
    var content="";
    $.ajax({
    	url:basepath+"findnewData",
    	data:{},
    	type:'POST',
    	success:function(nitives){
    		var reg1=new RegExp("&lt;","g"); 
    		var reg2=new RegExp("&gt;","g"); 
    		$(nitives).each(function(){
    			content = $(this).attr("content");
    			content=content.replace(reg1,"<");
    			content=content.replace(reg2,">");
    			$('.notice-content').html(content);
    			$('#noticeid').val($(this).attr("version"));
    		    // 检查公告
    		    checkNotice();
    		    showNotice = true;
    		})
    	},dataType:'json'
    })
    
    $(window).scroll(function () {
    	if(showNotice) {
		    var scrollTop = $(this).scrollTop();//滚动条位置
		    var scrollHeight = $(document).height();//高度
		    var windowHeight = $(this).height();//整体高度
		    if (scrollTop + windowHeight >= scrollHeight-80) {
		    	$(".notice-fixed").fadeOut(1000);
		    	$(".notice-relative").fadeIn(1000);
			} else {
				$(".notice-fixed").fadeIn(1000);
				$(".notice-relative").fadeOut(1000);
			}
    	}
	});
    
});

//检测公告
function checkNotice() {
	var noticeid = getCookie("noticeid");
	var loaclNoticeid = $("#noticeid").val();
	if(noticeid === loaclNoticeid) {
		$(".site-notice").remove();
	} else {
		$(".notice-fixed").fadeIn("slow");
	}
}
 // 关闭公告
function closeNotice() {
	$(".site-notice").remove();
	// cookie记录公告已删除
	addCookie("noticeid", $("#noticeid").val());
}

function addCookie(objName, objValue){
	if(objValue==""){
		var Num="";
		for(var i=0;i<6;i++){ 
			Num+=Math.floor(Math.random()*10); 
		} 
		objValue=Num;
	}
	var days = 365; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + days*24*60*60*1000); 
    document.cookie = objName+"="+ escape (objValue)+";path=/;expires="+exp.toGMTString(); 
}
//获取指定名称的cookie的值 
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1; 
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1) {
				c_end = document.cookie.length;
			}
		    return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
	// 平滑滚动到顶部
function scrollTop() {
	$('html, body').animate({scrollTop: '0px'}, 800);
}
function scrollBottom() {
	$('html,body').animate({scrollTop: $(document).height()}, 800);
}
</script>