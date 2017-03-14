// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('main'))

// 指定图表的配置项和数据
const option = {
  backgroundColor: '#D7E5EC',
  title: {
    text: '2017年进出货价格对比',
    subText: '看看什么时候比较赚？'
  },
  dataZoom: {
    type: 'slider'
  },
  visualMap: {
    type: 'piecewise'
  },
  legend: {
    data:['平均销售价', '平均进货价', '销量'],
    right: '30%',
    top: '10px',
    orient: 'horizontal',
    selectedMode: 'multiple'
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      boundaryGap: true
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
        formatter: '¥{value}'
      }
    },
    {
      type: 'value',
      name: '销量',
      min: 0,
      max: 80,
      interval: 10,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  grid: {
    show: true,
    containLabel: true,
    left: '15%'
  },
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
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      animationEasing: 'elasticOut',
      animationDuration: 2000,
      barCategoryGap: '30%',
      itemStyle: {
        normal: {
          color: '#E7B98D'
        }
      },
    },
    {
      name: '平均进货价',
      type: 'line',
      yAxisIndex: 1,
      data: [5, 5.5, 8.25, 11.25, 15.75, 25.5, 50.75, 58.5, 57.5, 41.25, 30, 15.5],
      animationEasing: 'linear',
      animationDuration: 2000,
      itemStyle: {
        normal: {
          color: '#E7B98D'
        }
      },
      smooth: true
    },
    {
      name: '销量',
      type: 'scatter',
      data: [10.0, 16.9, 17.2, 44.2, 33.6, 76.7, 40.6, 66.2, 76.6, 60.0, 17.4, 15.3],
      animationEasing: 'elasticOut',
      animationDuration: 2000,
      itemStyle: {
        normal: {
          color: '#E7B98D'
        }
      },
    }
  ],
  textStyle: {
    fontFamily: 'monospace'
  }
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option)