    var dayCandlestickChartDivNum=0;
    var dayCandlestickChartData = [];
    var dayCandlestickVolumeChartTime=[];
    var dayCandlestickVolumeChartVolume=[];
    var dayCandlestickVolumeData={
    	time:dayCandlestickVolumeChartTime,
    	volume:dayCandlestickVolumeChartVolume
    }
    function processingDayCandlestickData(jsonData){
    		var parameters = jsonData.Parameters;
    		var Len=parameters.length;
    		if(parameters == null)return;
    	    var lent=dayCandlestickChartData.length;
        	for(var i=0;i<Len;i++){
//      		var time2=parameters[i].DateTimeStamp.split(" ");
//		        	var str1=time2[1].split(":");
//		        	var str2=str1[0]+":"+str1[1]
        			var openPrice = parseFloat(parameters[i].OpenPrice).toFixed(doSize);
		            var closePrice = parseFloat(parameters[i].LastPrice).toFixed(doSize);
		            var chaPrice = closePrice - openPrice;
		            var sgData = [parameters[i].DateTimeStamp,openPrice,closePrice,chaPrice,"",parameters[i].LowPrice,parameters[i].HighPrice,"","","-"];
			         dayCandlestickChartData[lent+i] = sgData; 
       		};
        	var Option = dayCandlestickChartSetOption(dayCandlestickChartData);
		  	dayCandlestickChartDiv.group="group3";
		  	document.getElementById("dayCandlestickBtn").addEventListener("tap",function(){
				 if(dayCandlestickChartDiv != null){
				 	setTimeout(function(){
				 		muiSpinner[2].style.display="none";
				 	},100)
					document.getElementsByClassName("buttomFix")[0].style.display="block";
						setTimeout(function(){
						 	dayCandlestickChartDiv.resize();	
							dayCandlestickChartDiv.setOption(Option);
		        			dayCandlestickChartDiv.resize();	
		        			dayCandlestickChartDivNum++;
		        		},10);
			    }
		});
    }
    //设置数据参数（为画图做准备）
    function dayCandlestickChartSetOption(newData){
        var dates = dayCandlestickChartData.map(function (item) {
            return item[0];
        });
        var data = dayCandlestickChartData.map(function (item) {
            return [+item[1], +item[2], +item[5], +item[6]];
        });
        var option = {
		    backgroundColor: 'rgba(43, 43, 43, 0)',
		    tooltip: {
		        trigger: 'axis',
		        axisPointer : {
                   type : 'line',
                   animation: false,
		            lineStyle: {
		                color: '#ffffff',
		                width: 1,
		                opacity: 1
		            }
             	  },
		         formatter: function (params) {
		            var res = "时间:"+params[0].name;
		            res += '<br/>  开盘 : ' + params[0].value[0] + '<br/>  最高 : ' + params[0].value[3];
		            res += '<br/>  收盘 : ' + params[0].value[1] + '<br/>  最低 : ' + params[0].value[2];
		            return res;
		        }
		    },
		    grid: {
		               x: 43,
		               y:20,
		               x2:20,
		               y2:5
		           },
		    xAxis: {
		        type: 'category',
		        data: dates,
		        show:false,
		        axisLine: { lineStyle: { color: '#8392A5' } }
		    },
		    yAxis: {
		        scale: true,
		        axisLine: { lineStyle: { color: '#8392A5' } },
		        splitLine: { show: false },
		        axisTick:{
		                   	show:false,
		                   },
		        splitArea: {
		                    show: false
		                },
		                axisLabel: {
		                        inside: false,
		                        margin: 4
		                    },
		                  splitLine: {
		                    show: true,
		                    lineStyle: {
		                        color: "#8392A5"
		                    }
		                }
		    },
		    animation: false,
		    series: [
		        {
		            type: 'candlestick',
		            name: '',
		            data: data,
		            itemStyle: {
		                normal: {
		                    color: '#FD1050',
		                    color0: '#0CF49B',
		                    borderColor: '#FD1050',
		                    borderColor0: '#0CF49B'
		                }
		            }
		        }
		    ]
		}
        return option;
    };
    var  dayCandlestickVolumeNum=0;
    function processingDayCandlestickVolumeData(data){
    		var parameters = data.Parameters;
    		var Len=parameters.length;
    		if(parameters == null)return;
    	    var lent=dayCandlestickVolumeData.time.length;
        	for(var i=0;i<Len;i++){
        			dayCandlestickVolumeData.time[lent+i]=parameters[i].DateTimeStamp;
        			dayCandlestickVolumeData.volume[lent+i]=parameters[i].Volume;
       		};
			console.log(JSON.stringify(dayCandlestickVolumeData));
        	var option= CandlestickVolumeChartSetoption(dayCandlestickVolumeData);
		  	dayCandlestickVolumeChart.group="group3";
		  	if(dayCandlestickVolumeNum !=0){
				dayCandlestickVolumeChart.setOption(option);
			}
		  	document.getElementById("dayCandlestickBtn").addEventListener("tap",function(){
				 if(dayCandlestickVolumeChart != null){
						setTimeout(function(){
						 	dayCandlestickVolumeChart.resize();	
							dayCandlestickVolumeChart.setOption(option);
		        			dayCandlestickVolumeChart.resize();	
		        			dayCandlestickVolumeNum=1;
		        		},10);
			    }
		});
    };
    function CandlestickVolumeChartSetoption(data){
    	 var  dayCandlestickVolumeData=data;
	      var  option = {
	      	backgroundColor: '#2B2B2B',
	          tooltip: {
	              trigger: 'axis',
	              axisPointer : {
                   type : 'line',
                   animation: false,
		            lineStyle: {
		                color: '#ffffff',
		                width: 1,
		                opacity: 1
		            }
               },
	          },
	          legend: {
	              data:['最新成交价']
	          },
	            toolbox: {
	                show: false,
	            },
	             animation: false,
				 grid: {
	               x: 40,
	               y:30,
	               x2:20,
	               y2:20
	           },
	          xAxis:[
	              {
	                  type : 'category',
	                  position:'bottom',
	                 boundaryGap: false,
	                  axisTick: {onGap:false},
	                  splitLine: {show:false},
	                   axisLine: { lineStyle: { color: '#8392A5' } },
	                  data : dayCandlestickVolumeData.time
	              }
	          ],
			 yAxis: [
			            {
	                type : 'value',
	              name : '成交量(万)',
	                 axisLine: { lineStyle: { color: '#8392A5' } },
		              axisTick:{
		               	show:false,
		              },
		              scale:true,
	              axisLabel: {
	                  formatter: function (a) {
	                      a = +a;
	                      return isFinite(a)
	                          ? echarts.format.addCommas(+a / 10000)
	                          : '';
	                  }
	              },
	                splitLine: {
	                    show: true,
	                    lineStyle: {
	                        color: "#8392A5"
	                    }
	                }
	            }
	        ],
	          series : [
	              {
	                  name: '成交量',
	                  type: 'bar',
	                  data:dayCandlestickVolumeData.volume
	              }
	          ]
	      };
        return option
    }