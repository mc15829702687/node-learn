const app = new Vue({
  el: '#app',
  data() {
    return {

      time: '2020-02-23', // 当前日期
      compareYesList: [ // 较昨日相比数据
        {
          name: '确诊',
          num: '+0',
          sum: 245
        },
        {
          name: '疑似',
          num: '+2',
          sum: 25
        },
        {
          name: '死亡',
          num: '+0',
          sum: 1
        },
        {
          name: '治愈',
          num: '+13',
          sum: 153
        }
      ],

      // 最新疫情趋势图
      trendChartList: {
        xList: ["01.23", "01.26", "01.29", "02.01", "02.04", "02.07", "02.10", "02.13", "02.16", "02.19", "02.22", "02.23"], // x轴坐标
        diagnosisData: [3, 22, 56, 101, 142, 184, 213, 229, 236, 242, 245, 245], // 确诊
        cureData: [0, 0, 0, 0, 1, 11, 26, 45, 64, 89, 140, 153] // 治愈
      },

      // 地图数据
      cityList: [{
          name: '西安市',
          qzVal: 120,
          cureVal: 71,
          inc: 0
        },
        {
          name: '安康市',
          qzVal: 26,
          cureVal: 16,
          inc: 0
        },
        {
          name: '汉中市',
          qzVal: 26,
          cureVal: 10,
          inc: 0
        },
        {
          name: '咸阳市',
          qzVal: 17,
          cureVal: 14,
          inc: 0
        },
        {
          name: '渭南市',
          qzVal: 15,
          cureVal: 4,
          inc: 0
        },
        {
          name: '宝鸡市',
          qzVal: 13,
          cureVal: 11,
          inc: 0
        },
        {
          name: '铜川市',
          qzVal: 8,
          cureVal: 6,
          inc: 0
        },
        {
          name: '延安市',
          qzVal: 8,
          cureVal: 8,
          inc: 0
        },
        {
          name: '商洛市',
          qzVal: 7,
          cureVal: 4,
          inc: 0
        },
        {
          name: '榆林市',
          qzVal: 3,
          cureVal: 3,
          inc: 0
        },
        {
          name: '韩城市',
          qzVal: 1,
          cureVal: 1,
          inc: 0
        },
        {
          name: '杨凌示范区',
          qzVal: 1,
          cureVal: 0,
          inc: 0
        },
        {
          name: '待明确地区',
          qzVal: 0,
          cureVal: 5,
          inc: 0
        }
      ],
      mapList: [
        {
          name: '西安市',
          value: 120
        },
        {
          name: '榆林市',
          value: 3
        },
        {
          name: '延安市',
          value: 8
        },
        {
          name: '铜川市',
          value: 8
        },
        {
          name: '咸阳市',
          value: 17
        },
        {
          name: '渭南市',
          value: 15
        },
        {
          name: '宝鸡市',
          value: 13
        },
        {
          name: '商洛市',
          value: 7
        },
        {
          name: '汉中市',
          value: 26
        },
        {
          name: '安康市',
          value: 26
        }
      ],

      // ------------- 西安 ---------------------
      xaCompareYesList: [ // 较昨日相比数据
        {
          name: '确诊',
          num: '+0',
          sum: 120
        },
        {
          name: '死亡',
          num: '+0',
          sum: 1
        },
        {
          name: '治愈',
          num: '+13',
          sum: 71
        }
      ],
      xaTrendChartList: {
        xList: ["01.23", "01.26", "01.29", "02.01", "02.04", "02.07", "02.10", "02.13", "02.16", "02.19", "02.22", "02.23"], // x轴坐标
        diagnosisData: [2, 4, 18, 39, 60, 80, 98, 114, 114, 118, 120, 120], // 确诊
        cureData: [0, 0, 0, 0, 1, 5, 11, 12, 25, 40, 58, 71] // 治愈
      },
      xaCityList: [{
        name: '新城区',
        qzVal: 15,
        cureVal: 0,
        inc: 0
      },
      {
        name: '雁塔区',
        qzVal: 13,
        cureVal: 0,
        inc: 0
      },
      {
        name: '莲湖区',
        qzVal: 14,
        cureVal: 0,
        inc: 0
      },
      {
        name: '未央区',
        qzVal: 7,
        cureVal: 0,
        inc: 0
      },
      {
        name: '灞桥区',
        qzVal: 8,
        cureVal: 0,
        inc: 0
      },
      {
        name: '阎良区',
        qzVal: 5,
        cureVal: 0,
        inc: 0
      },
      {
        name: '碑林区',
        qzVal: 10,
        cureVal: 0,
        inc: 0
      },
      {
        name: '高新区',
        qzVal: 7,
        cureVal: 0,
        inc: 0
      },
      {
        name: '鄠邑区',
        qzVal: 3,
        cureVal: 0,
        inc: 0
      },
      {
        name: '高陵区',
        qzVal: 1,
        cureVal: 0,
        inc: 0
      },
      {
        name: '周至县',
        qzVal: 2,
        cureVal: 0,
        inc: 0
      },
      {
        name: '临潼区',
        qzVal: 2,
        cureVal: 0,
        inc: 0
      },
      {
        name: '蓝田县',
        qzVal: 1,
        cureVal: 0,
        inc: 0
      },
      {
        name: '长安区',
        qzVal: 2,
        cureVal: 0,
        inc: 0
      },
      {
        name: '经开区',
        qzVal: 1,
        cureVal: 0,
        inc: 0
      },
      {
        name: '未公布来源',
        qzVal: 29,
        cureVal: 71,
        inc: 0
      }
    ],
    }
  },
  mounted() {
    this.drawTrendChart(this.trendChartList, 'epidemic-trend-chart'); // 陕西省最新疫情趋势图
    this.drawTrendChart(this.xaTrendChartList, 'epidemic-trend-chart2'); // 西安市最新疫情趋势图
    this.drawMap(); // 绘制地图
  },
  methods: {
    // 最新疫情趋势图
    drawTrendChart(data, id) {
      let myChart = echarts.init(document.getElementById(id));
      let fontColor = '#737c8a';
      let option = {
        grid: {
          left: '10%',
          right: '10%',
          top: '15%',
          bottom: '15%',
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        legend: {
          show: false
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: fontColor,
            fontSize: 10,
            rotate: 60
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#737c8a'
            }
          },
          axisTick: {
            show: false,
          },
          data: data.xList
        }],
        yAxis: [{
          type: 'value',
          name: '最新疫情趋势图',
          min: 0,
          nameGap: 25,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#737c8a'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#737c8a'
            }
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#737c8a'
            }
          }
        }],
        series: [{
            name: '确诊',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor: '#e24730',
                borderWidth: 1,
                lineStyle: {
                  color: "#e24730",
                  width: 1
                }
              }
            },
            data: data.diagnosisData
          },
          {
            name: '治愈',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor: '#1ec9af',
                borderWidth: 1,
                lineStyle: {
                  color: "#1ec9af",
                  width: 1
                }
              }
            },
            data: data.cureData
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 绘制地图
    drawMap() {
      let _this = this;
      echarts.registerMap('陕西', JSON.stringify(geoJSON));
      let myChart = echarts.init(document.getElementById('map'));
      let option = {
        tooltip: {
          formatter: function (e, t, n) {
            return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          right: 0,
          bottom: 0,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [{
              gt: 1000,
              label: "> 1000 人",
              color: "#811c24"
            }, {
              gte: 10,
              lte: 99,
              label: "10 - 99 人",
              color: "#f59e83"
            }, {
              gte: 1,
              lte: 10,
              label: "1 - 9 人",
              color: "#fdebcf"
            }, {
              gte: 100,
              lte: 499,
              label: "100 - 499 人",
              color: "#e55a4e"
            },
            {
              gte: 500,
              lte: 999,
              label: "500 - 999 人",
              color: "#cb2a2f"
            }, {
              value: 0,
              color: "#ffffff"
            }
          ],
          show: false
        },
        geo: {
          map: '陕西',
          label: {
            normal: {
              show: true,
              color: '#4c4a46'
            },
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#40458e',
              borderColor: '#6367ad',
              borderWidth: 1.5
            },
            emphasis: {
              areaColor: '#40458e'
            }
          },
          "left": "0%",
          "right": "0%",
          "top": 0,
          "bottom": 0
        },
        series: [{
          name: "确诊病例",
          type: "map",
          zoom: 1,
          geoIndex: 0,
          data: _this.mapList
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
});