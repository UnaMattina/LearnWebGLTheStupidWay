// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: 'ECharts 折线柱状混合图'
  },
  tooltip: {},
  legend: {
    data:['平均销售价', '平均进货价']
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '金额',
      min: 0,
      max: 200,
      interval: 25,
      axisLabel: {
        formatter: '¥ {value}'
      }
    },
    {
      type: 'value',
      name: '金额',
      min: 0,
      max: 200,
      interval: 25,
      axisLabel: {
        formatter: '¥ {value}'
      }
    }
  ],
  itemStyle: {
    normal: {
      // 阴影的大小
      shadowBlur: 50,
      // 阴影水平方向上的偏移
      shadowOffsetX: 0,
      // 阴影垂直方向上的偏移
      shadowOffsetY: 0,
      // 阴影颜色
      shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  series: [
    {
      name: '平均销售价',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '平均进货价',
      type: 'line',
      yAxisIndex: 1,
      data: [5, 5.5, 8.25, 11.25, 15.75, 25.5, 50.75, 58.5, 57.5, 41.25, 30, 15.5]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);