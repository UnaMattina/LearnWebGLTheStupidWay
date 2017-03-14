setTimeout(() => {
  document.getElementById('fade').style.display = 'none'
}, 4000)

function splitData (rawData) {
  const data = {}
  const tickerNames = []

  for (let i = 0; i < rawData.length; i++) {
    const ticker = rawData[i].Ticker
    if (!data[ticker]) {
      data[ticker] = {
        categoryData: [],
        values: [],
        volume: []
      }
      tickerNames.push(ticker)
    }
    const dateString = rawData[i].Date
    const pattern = /(\d{4})(\d{2})(\d{2})/
    const dateNewType = dateString.replace(pattern, '$1-$2-$3');
    data[ticker].categoryData.push(dateNewType)
    data[ticker].values.push([rawData[i].Open, rawData[i].Close, rawData[i].Low, rawData[i].High])
    data[ticker].volume.push(rawData[i].Volume)
  }

  return {
    tickerNames,
    data
  }
}

function constructOption (categoryName, incomingData) {
  const data = incomingData[categoryName]
  return {
    backgroundColor: '#eee',
    animation: false,
    legend: {
      bottom: 10,
      left: 'center',
      data: [categoryName]
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false
        },
        brush: {
          type: ['lineX', 'clear']
        }
      }
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '50%'
      },
      {
        left: '10%',
        right: '8%',
        top: '63%',
        height: '16%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        axisTick: {show: false},
        splitLine: {show: false},
        axisLabel: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {show: false},
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false}
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 25,
        end: 75
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '85%',
        start: 25,
        end: 75
      }
    ],
    series: [
      {
        name: categoryName,
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          normal: {
            borderColor: null,
            borderColor0: null
          }
        },
        tooltip: {
          formatter: (param) => {
            let parame = param[0];
            return [
              'Date: ' + parame.name + '<hr size=1 style="margin: 3px 0">',
              'Open: ' + parame.data[0] + '<br/>',
              'Close: ' + parame.data[1] + '<br/>',
              'Lowest: ' + parame.data[2] + '<br/>',
              'Highest: ' + parame.data[3] + '<br/>'
            ].join('');
          }
        }
      },
      {
        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volume
      }
    ]
  }
}

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('main'))

$.get('result.json', (rawData) => {
  const result = splitData(rawData)

  const data = result.data
  const tickerNames = result.tickerNames
  for (let ticker of tickerNames) {
    const options = constructOption(ticker, data)
    setTimeout(() => {
      myChart.setOption(options)
    }, 8000)
  }
})
