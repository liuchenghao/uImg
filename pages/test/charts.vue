<template>
  <div class="cars-page">
    <div class="car" v-for="item in cars" :key="item.id" @click.stop="chooseCar(item)">
      <img :src="item.url" alt="">
      <span>{{item.name}}</span>
    </div>
    <qiun-data-charts type="line" :chartData="chartData" :animation="false" />
    <qiun-data-charts type="line" :chartData="chartDataAll" :animation="false" />
    <view>{{stepCount}}--</view>
    <view>{{direction}}</view>
    <view>{{calcData}}</view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    request
  } from '../../api/request';
  import {
    mapMutations
  } from 'vuex';
  import StepDetector from '@/common/utils/StepDetector';
  import {
    throttle
  } from '@/common/utils/tools';
  let count = 0;
  export default {
    onReady() {
      uni.onCompassChange( (res)=> {
          // console.log(res);
          this.direction = res.direction;
      });
      let stepDetector = new StepDetector();
      let cThrottle = throttle(1000);
      let calcFunc = (res) => {
        let {
          x,
          y,
          z
        } = res;
        let {
          series,
          categories
        } = this.chartData;
        let tempSeries = [];
        let valueAll = 0;
        let values = [x, y, z];
        for (let i = 0; i < 3; i++) {
          let value = values[i];
          valueAll += value * value;
          value = value.toFixed(2);
          let serie = series[i];
          let {
            name,
            data
          } = serie;
          let tempData = data.concat(value);
          let len = tempData.length;
          // data.push(value);
          len > 20 && tempData.shift();
          tempSeries[i] = {
            name,
            data: tempData,
            // "type": "curve",
          };
        }
        valueAll = Math.sqrt(valueAll);
        let {
          series: seriesAll,
          categories: categoriesAll
        } = this.chartDataAll;
        let {
          name: nameAll,
          data: dataAll
        } = seriesAll[0];
        let calcData = stepDetector.calcSensorData(values);
        let {
          isStep,
          v,
          d,
          c
        } = calcData;
        isStep && this.stepCount++;
        // this.calcData += "\n" +JSON.stringify(calcData);
        
        valueAll = (d-v).toFixed(2);//[d.toFixed(2), v.toFixed(2)];
        
        let tempDataAll = dataAll.concat(valueAll);
        let tempSeriesAll = [{
          name: nameAll,
          data: tempDataAll
        }];
        let lenAll = tempDataAll.length;
        // data.push(value);
        lenAll > 20 && tempDataAll.shift();
        // cThrottle(() => {
          categories = categories.concat(count++);
          categoriesAll = categoriesAll.concat(count++);
          
          let len = categories.length;
          len > 20 && categories.shift();
          lenAll = categoriesAll.length;
          lenAll > 20 && categoriesAll.shift();
          this.chartData = {
            categories,
            series: tempSeries
          };
          this.chartDataAll = {
            categories: categoriesAll,
            series: tempSeriesAll
          };
        // });
        // console.info(this.chartData, "=++++==========");
        // console.info(series[0].data, "=======11===", series[1].data, "=++++==========", series[2].data);
        
      };
      uni.onAccelerometerChange(calcFunc);
    },
    data() {
      return {
        calcData: {},
        direction: 0,
        stepCount: 0,
        cars: [],
        chartDataAll: {
          "categories": [],
          "series": [{
            "name": "A",
            "data": []
          }]
        },
        chartData: {
          "categories": [],
          "series": [{
            "name": "X",
            "data": []
          }, {
            "name": "Y",
            "data": [],
            "lineType": "dash",
            "dashLength": 10
          }, {
            "name": "Z",
            "data": []
          }]
        },
      };
    },
    mounted() {
      // this.getInitData();
    },
    methods: {
      async getInitData() {
        const res = await request('/comments');
        this.cars = res.data.navData;
      },
      chooseCar(item) {
        this.setNavIndex(item.id);
        console.log(this.$store.state.curNavIndex);
        uni.navigateBack();
      },
      ...mapMutations("passenger/index", {
        setNavIndex: 'SET_CUR_NAV_INDEX'
      })
    }
  };
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .cars-page {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;

    .car {
      flex: 0 1 auto;
      width: 33.33333333%;
      height: 105px;
      border-right: 1px solid @border-color-deep;
      border-bottom: 1px solid @border-color-deep;
      box-sizing: border-box;

      img {
        display: block;
        margin: 34px auto 0;
        width: 35px;
        height: 15px;
      }

      span {
        margin-top: 15px;
        display: block;
        text-align: center;
        text-indent: 2px;
        font-size: 14px;
      }
    }
  }
</style>
