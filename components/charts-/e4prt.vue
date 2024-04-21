<template>
  <div class="echarts-image-frame-wrapper">
    <div v-show="!isEmpty" class="echarts-image-info">暂无数据</div>
    <div v-show="isEmpty" class="echarts-image-frame" v-charts></div>
  </div>
</template>
<script>
  const echarts = require('echarts');
  export default {
    props: {
      url: String,
      title: String,
      params: Object,
      exParams: {
        type: Object,
        default: () => []
      },
      data: Object,
      colorData: {
        type: Array,
        default: function() {
          return [
            "#5d8ff8",
            "#5bd8a6",
            "#5d7092",
            "#f5bd12",
            "#e8684a",
            "#6dc7ec",
            "#9270ca",
            "#ff9d4d",
            "#269a99",
            "#ff99c3",
            "#6F0000"
          ];
        }
      },
      clickEventFunc: {
        type: Function,
        default (data) {}
      }
    },
    components: {},
    mounted() {},
    data() {
      return {
        isEmpty: false,
        dialogVisible: false,
        dyComponent: '',
        chartsData: null
      };
    },
    methods: {
      setOption() {
        let _this = this;
        let url = this.url;
        if (url) {
          let data = this.params;
          let {
            orgCode
          } = data;
          orgCode &&
            this._getData(url, data).then(res => {
              if (res) {
                let data = res.data;
                if (data && data.length) {
                  _this.isEmpty = true;
                  _this.$nextTick(() => {
                    _this.render(res);
                  });
                } else {
                  _this.isEmpty = false;
                }
              } else {
                _this.isEmpty = false;
              }
            });
        }
      },
      getFormatExParams() {
        return {};
      },
      render(res) {
        let option = this.getEchartsOptions(res);
        this.ec.setOption(option);
        this.ec.resize();
      },
      getEchartsOptions(data) {
        return {};
      },
      initEvents() {
        let _this = this;
        window.addEventListener("resize", function() {
          _this.ec.resize();
        });
        this.ec.on('click', this.clickEchartsEvent);
      },
      clickEchartsEvent(data) {},
      initEcharts(el) {
        console.info(echarts, "======echarts======");
        this.ec = echarts.init(el);
      },
      _getData(url, data) {
        let exParams = this.getFormatExParams();
        data = Object.assign({}, data, exParams);
        return new Promise((resolve, reject) => {
          this.loadTimer && clearTimeout(this.loadTimer);
          this.loadTimer = setTimeout(() => {
            this.$http.post(url, data).then(
              response => {
                let data = response.data;
                if (data.success || response.status === 200) {
                  resolve(data.data);
                }
              },
              error => {
                reject();
              }
            );
          }, 200);

        });
      }
    },
    destroyed() {
      this.loadTimer && clearTimeout(this.loadTimer);
    },
    watch: {
      params: {
        handler(val) {
          this.setOption();
        },
        deep: true
      }
    },
    directives: {
      charts: {
        // 加载echarts图
        inserted(el, binding, vNode) {
          let _this = vNode.context;
          _this.initEcharts(el);
          _this.initEvents();
          _this.setOption();
        }
      }
    }
  };
</script>
<style scoped>
  .echarts-image-frame-wrapper,
  .echarts-image-frame {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .echarts-image-frame-wrapper {
    position: relative;
  }

  .echarts-image-info {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 0;
    right: 0;
    /* margin-top: 15%; */
    transform: translate(0, -50%);
    color: rgb(130, 94, 94);
    font-size: 14px;
  }
</style>
