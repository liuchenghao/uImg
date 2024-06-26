class StepDetector {
  //存放三轴数据
  // float[] oriValues = new float[3];
  oriValues: number[] = new Array < number > (3);
  // final int ValueNum = 4;
  ValueNum: number = 4;
  //用于存放计算阈值的波峰波谷差值
  // float[] tempValue = new float[ValueNum];
  tempValue: number[] = new Array < number > (this.ValueNum);
  // int tempCount = 0;
  tempCount: number = 0;
  // //是否上升的标志位
  // boolean isDirectionUp = false;
  isDirectionUp: boolean = false;
  //持续上升次数
  // int continueUpCount = 0;
  continueUpCount: number = 0;
  //上一点的持续上升的次数，为了记录波峰的上升次数
  // int continueUpFormerCount = 0;
  continueUpFormerCount: number = 0;
  //上一点的状态，上升还是下降
  // boolean lastStatus = false;
  lastStatus: boolean = false;
  //波峰值
  // float peakOfWave = 0;
  peakOfWave: number = 0;
  //波谷值
  // float valleyOfWave = 0;
  valleyOfWave: number = 0;
  //此次波峰的时间
  // long timeOfThisPeak = 0;
  timeOfThisPeak: number = 0;
  //上次波峰的时间
  // long timeOfLastPeak = 0;
  timeOfLastPeak: number = 0;
  //当前的时间
  // long timeOfNow = 0;
  timeOfNow: number = 0;
  //当前传感器的值
  // float gravityNew = 0;
  gravityNew: number = 0;
  //上次传感器的值
  // float gravityOld = 0;
  gravityOld: number = 0;
  //动态阈值需要动态的数据，这个值用于这些动态数据的阈值
  // final float InitialValue = (float) 1.3;
  InitialValue: number = 1.3;
  //初始阈值
  // float ThreadValue = (float) 2.0;
  ThreadValue: number = 2.0;
  //波峰波谷时间差
  // int TimeInterval = 250;
  TimeInterval: number = 250;
  constructor(arg) {
  }
  calcSensorData(values: number[]) {
    let oriValues = this.oriValues;
    for (let i = 0; i < 3; i++) {
      oriValues[i] = values[i];
    }
    let gravityNew = this.gravityNew = Math.sqrt(oriValues[0] * oriValues[0] +
      oriValues[1] * oriValues[1] + oriValues[2] * oriValues[2]);
    return this.detectorNewStep(gravityNew);
  }
  /*
   * 检测步子，并开始计步
   * 1.传入sersor中的数据
   * 2.如果检测到了波峰，并且符合时间差以及阈值的条件，则判定为1步
   * 3.符合时间差条件，波峰波谷差值大于initialValue，则将该差值纳入阈值的计算中
   * */
  detectorNewStep(values: number): boolean {
    let gravityOld = this.gravityOld;
    let peakOfWave = this.peakOfWave;
    let valleyOfWave = this.valleyOfWave;
    let ThreadValue = this.ThreadValue;
    let InitialValue = this.InitialValue;
    let isStep = false;
    if (gravityOld == 0) {
      this.gravityOld = values;
    } else {
      if (this.detectorPeak(values, gravityOld)) {
        let timeOfLastPeak = this.timeOfLastPeak = this.timeOfThisPeak;
        let timeOfNow = this.timeOfNow = +new Date() //System.currentTimeMillis();
        let TimeInterval = this.TimeInterval;
        if (timeOfNow - timeOfLastPeak >= TimeInterval &&
          (peakOfWave - valleyOfWave >= ThreadValue)) {
          this.timeOfThisPeak = timeOfNow;
          /*
           * 更新界面的处理，不涉及到算法
           * 一般在通知更新界面之前，增加下面处理，为了处理无效运动：
           * 1.连续记录10才开始计步
           * 2.例如记录的9步用户停住超过3秒，则前面的记录失效，下次从头开始
           * 3.连续记录了9步用户还在运动，之前的数据才有效
           * */
          // mStepListeners.countStep();
          isStep = true;
          /* console.info("=============next===========")
          return {
            isStep: true,
            diff: peakOfWave - valleyOfWave,
            t: ThreadValue,
            i: InitialValue
          }; */
        }
        if (timeOfNow - timeOfLastPeak >= TimeInterval &&
          (peakOfWave - valleyOfWave >= InitialValue)) {
          console.info("=============calc===========")
          this.timeOfThisPeak = timeOfNow;
          this.ThreadValue = this.peakValleyThread(peakOfWave - valleyOfWave);
        }
        /* return {
          isStep: false,
          d: peakOfWave - valleyOfWave,
          t: ThreadValue,
          i: InitialValue
        }; */
      }
    }
    this.gravityOld = values;
    return {
      isStep,
      v: valleyOfWave,
      d: peakOfWave,
      t: ThreadValue,
      i: InitialValue
    };
  }
  /*
   * 检测波峰
   * 以下四个条件判断为波峰：
   * 1.目前点为下降的趋势：isDirectionUp为false
   * 2.之前的点为上升的趋势：lastStatus为true
   * 3.到波峰为止，持续上升大于等于2次
   * 4.波峰值大于20
   * 记录波谷值
   * 1.观察波形图，可以发现在出现步子的地方，波谷的下一个就是波峰，有比较明显的特征以及差值
   * 2.所以要记录每次的波谷值，为了和下次的波峰做对比
   * */
  detectorPeak(newValue: number, oldValue: number): boolean {
    let lastStatus = this.lastStatus;
    let isDirectionUp = this.isDirectionUp;
    lastStatus = isDirectionUp;
    let continueUpCount = this.continueUpCount;
    if (newValue >= oldValue) {
      this.isDirectionUp = true;
      this.continueUpCount++;
    } else {
      this.continueUpFormerCount = this.continueUpCount;
      this.continueUpCount = 0;
      this.isDirectionUp = false;
    }
    isDirectionUp = this.isDirectionUp;
    let continueUpFormerCount = this.continueUpFormerCount;
    if (!isDirectionUp && lastStatus &&
      (continueUpFormerCount >= 2 || oldValue >= 20)) {
      this.peakOfWave = oldValue;
      return true;
    } else if (!lastStatus && isDirectionUp) {
      this.valleyOfWave = oldValue;
      return false;
    } else {
      return false;
    }
  }
  /*
   * 阈值的计算
   * 1.通过波峰波谷的差值计算阈值
   * 2.记录4个值，存入tempValue[]数组中
   * 3.在将数组传入函数averageValue中计算阈值
   * */
  peakValleyThread(value: number): number {
    let tempThread = this.ThreadValue;
    let tempCount = this.tempCount;
    let ValueNum = this.ValueNum;
    let tempValue = this.tempValue;
    console.info(ValueNum,tempCount, "========tempCount========")
    if (tempCount < ValueNum) {
      tempValue[tempCount] = value;
      tempCount++;
      this.tempCount = tempCount;
    } else {
      tempThread = this.averageValue(tempValue, ValueNum);
      for (let i = 1; i < ValueNum; i++) {
        tempValue[i - 1] = tempValue[i];
      }
      tempValue[ValueNum - 1] = value;
    }
    return tempThread;
  }
  /*
   * 梯度化阈值
   * 1.计算数组的均值
   * 2.通过均值将阈值梯度化在一个范围里
   * */
  averageValue(value: number[], n: number): number {
    let ave = 0;
    let ValueNum = this.ValueNum;
    for (let i = 0; i < n; i++) {
      ave += value[i];
    }
    console.info(ave, "=========ave==========")
    ave = ave / ValueNum;
    if (ave >= 8)
      ave = 4.3;
    else if (ave >= 7 && ave < 8)
      ave = 3.3;
    else if (ave >= 4 && ave < 7)
      ave = 2.3;
    else if (ave >= 3 && ave < 4)
      ave = 2.0;
    else {
      ave = 1.3;
    }
    return ave;
  }
}
export default StepDetector;
