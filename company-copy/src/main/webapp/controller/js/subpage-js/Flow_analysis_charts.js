window.onload = function(){
        // 获取到这个DOM节点，然后初始化

    var myChart = echarts.init(document.getElementById("charts_box"));

    // option 里面的内容基本涵盖你要画的图表的所有内容
option = {
    tooltip : {
        trigger: 'axis'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['13:00',' ',' ','13:03',' ',' ','13:06',' ',' ','13:09',' ',' ','13:12',' ',' ','13:15',' ',' ','13:18',' ',' ','13:21',' ',' ','13:24',' ',' ','13:27',' ',' '],
            axisLabel:{
                 //X轴刻度配置
                 interval:0 //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            },
            axisLine: {
                lineStyle: {
                    color: '#66AEDE'
                }
            },
             axisTick:{
                width:5
             }
        }

    ],
    yAxis : [
        {
            min:0,
            max:4,
            type : 'value',
            axisLine: {
                lineStyle: {
                    width: 0
                }
            },
            axisTick:{
               show:false
             }
        }
    ],
    series : [
        {
            // name:'成交',
            type:'line',
            symbol:'star',
            symbolSize: 5,
            // xAxisIndex:1,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data:[ , , , , , , ,0,2,1,1,3,0],
            color: ['#c7e9a8']

        },
        {
            // name:'预购',
            type:'line',
            symbol:'star',/*折点样式*/
            symbolSize: 5,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default',
                    }
                }
            },
            data:[,,,,,,,,,,,,,,,,,0,1,2,3,4,0],
            color: ['#4fa8f9']
        }
    ]
}; 
    myChart.setOption(option);
}
