<script>
  import e4prt from "./e4prt.vue";
  export default {
    extends: e4prt,
    props: {
      exParams: Object,
    },
    onReady(){
      console.info("=====onReady=======");
    },
    methods: {
      setOption() {
        this.isEmpty = true;
        this.$nextTick(() => {
          this.render(this.getMockData());
        });
      },
      getMockData() {
        let res = {
          x: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
          y: null,
          data: [{
              name: "活跃度",
              value: [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "264267",
                "360073",
                "0",
                "0",
                "0",
              ],
              dataType: 0,
            },
            {
              name: null,
              value: null,
              dataType: 1
            },
          ],
        };
        return res;
      },
      initEvents() {
        let _this = this;
        window.addEventListener("resize", function() {
          _this.ec.resize();
        });
        this.ec.getZr().on("click", function(params) {
          let pointInPixel = [params.offsetX, params.offsetY];
          let ec = _this.ec;
          if (ec.containPixel("series", pointInPixel)) {
            let seriesIndex = 0;
            let pointInGrid = ec.convertFromPixel("series", pointInPixel);
            let xIndex = pointInGrid[0];
            let ecModel = ec.getModel();
            let dataModel = ecModel.getSeriesByIndex(seriesIndex);
            let data = dataModel.getDataParams(xIndex);
            _this.clickEchartsEvent(data);
          }
        });
      },
      getFormatExParams() {
        let bizType = this.getBizType();
        let {
          timeType
        } = this.exParams;
        let timeTypeMapping = [4, 1, 0];
        timeType = timeTypeMapping[timeType];
        return {
          bizType,
          timeType,
        };
      },
      getLegendData(data) {
        let legendData = [];
        let len = data.length;
        for (let i = 0; i < len; i++) {
          let item = data[i];
          let name = item.name;
          legendData.push(name);
        }
        return legendData;
      },
      getEchartsOptions(data) {
        let xData = data.x;
        let yData = data.y;
        let currData = data.data;
        let legendData = this.getLegendData(currData);
        let option = {
          grid: [{
            x: "10%",
            y: "10%",
            width: "80%",
            height: "60%"
          }],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#333333",
              },
              label: {
                backgroundColor: "#666666",
              },
            },
          },
          xAxis: [{
            data: xData,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#f0f0f0",
              },
            },
            axisLabel: {
              color: "#333333",
              fontSize: 14,
            },
          }, ],
          yAxis: [{
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#f0f0f0",
              },
            },
            axisLabel: {
              formatter: "{value}",
              color: "#333333",
              fontSize: 14,
            },
          }, ],
          legend: {
            icon: "line",
            bottom: 10,
            data: legendData,
          },
          series: [],
        };
        let len = currData.length;
        for (let i = 0; i < len; i++) {
          let item = currData[i];
          let name = item.name;
          let dataType = item.dataType;
          let value = item.value;
          let serie = {
            name: name,
            type: "line",
            // stack: 1,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: "#5d8ff8",
              },
            },
            data: value,
          };
          if (dataType) {
            serie.lineStyle = {
              width: 1,
              type: "dotted",
            };
          }
          option.series.push(serie);
        }
        return option;
      },
    },
    watch: {
      exParams: {
        handler(val) {
          this.loadTimer && clearTimeout(this.loadTimer);
          this.loadTimer = setTimeout(() => {
            this.setOption();
          }, 200);
        },
        deep: true,
      },
    },
  };
</script>
