window.onload = function(){
	var myChart = echarts.init(document.getElementById("trend_charts"));
    // option 里面的内容基本涵盖你要画的图表的所有内容
    var option = {
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
        xAxis: [{
            axisLabel: {
                interval: 0
            },
            axisLine: {
                lineStyle: {
                    color: '#4FA8F9'
                }
            },
            type: 'category',
            boundaryGap: false,
            data:[0,'',2,4,'',6,'',8,'',10,'',12,'',14,'',16,'',18,'',20,'',22],
            axisLabel:{
                 //X轴刻度配置
                 interval:0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            }
        }],
        yAxis: [{
            min:0,
            max:2.0,
            type: 'value',
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
            axisTick:{
               show:false
             }
        }],
        series: [{
/*            name: ' ',*/
            type: 'line',
             symbol:'star',
             symbolSize: 5,
             color: ['#4FA8F9'],
            data: [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }]
    };  
    myChart.setOption(option);
}