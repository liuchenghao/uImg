class StepDetector {
  // TAG: string = "StepDetector";
  mLimit: number = 10;
  mLastValues: number[] = new Array(3 * 2);
  mScale: number[] = new Array(2);
  mYOffset: number;
  mLastDirections: number[] = new Array(3 * 2);
  mLastExtremes: number[][] = [new Array(3 * 2), new Array(3 * 2)];
  mLastDiff: number[] = new Array(3 * 2);
  mLastMatch: number = -1;
  STANDARD_GRAVITY: number = 9.80665;
  MAGNETIC_FIELD_EARTH_MAX: number = 60;
  constructor(params) {
    let h = 480; // TODO: remove this constant
    this.mYOffset = h * 0.5;
    let mScale = this.mScale;
    mScale[0] = -(h * 0.5 * (1.0 / (this.STANDARD_GRAVITY * 2)));
    mScale[1] = -(h * 0.5 * (1.0 / (this.MAGNETIC_FIELD_EARTH_MAX)));
  }
  calcSensorData(values: number[]) {
    let vSum = 0;
    let mYOffset = this.mYOffset
    let mScale = this.mScale;
    for (let i = 0; i < 3; i++) {
      let v = mYOffset + values[i] * mScale[1];
      vSum += v;
    }
    let v = vSum / 3;
    let k = 0;
    let mLastValues = this.mLastValues;
    let mLastDirections = this.mLastDirections
    let mLastExtremes = this.mLastExtremes;
    let mLimit = this.mLimit;
    let mLastDiff = this.mLastDiff
    let mLastMatch = this.mLastMatch;
    let isStep = false;
    let diff;
    let direction = (v > mLastValues[k] ? 1 : (v < mLastValues[k] ? -1 : 0));
    if (direction == -mLastDirections[k]) {
      // Direction changed
      let extType = (direction > 0 ? 0 : 1); // minumum or maximum?
      mLastExtremes[extType][k] = mLastValues[k];
      diff = Math.abs(mLastExtremes[extType][k] - mLastExtremes[1 - extType][k]);

      if (diff > mLimit) {

        let isAlmostAsLargeAsPrevious = diff > (mLastDiff[k] * 2 / 3);
        let isPreviousLargeEnough = mLastDiff[k] > (diff / 3);
        let isNotContra = (mLastMatch != 1 - extType);

        if (isAlmostAsLargeAsPrevious && isPreviousLargeEnough && isNotContra) {
          // Log.i(TAG, "step");
          // for (StepListener stepListener: mStepListeners) {
          //   stepListener.onStep();
          // }
          isStep = true;
          this.mLastMatch = extType;

        } else {
          this.mLastMatch = -1;
        }
      }
      mLastDiff[k] = diff;
    }
    mLastDirections[k] = direction;
    mLastValues[k] = v;
    return {
      isStep,
      d: direction,
      diff: diff
    };
  }
}
export default StepDetector;
