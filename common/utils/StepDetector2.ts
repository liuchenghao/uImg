import {
  basic,
  matrix
} from '@/common/lib/numbers';

class StepDetector {
  ACCEL_RING_SIZE: number = 50;
  VEL_RING_SIZE: number = 10;
  STEP_THRESHOLD: number = 4;
  STEP_DELAY_NS: number = 200;

  accelRingCounter: number = 0;
  accelRingX: number[] = new Array(this.ACCEL_RING_SIZE);
  accelRingY: number[] = new Array(this.ACCEL_RING_SIZE);
  accelRingZ: number[] = new Array(this.ACCEL_RING_SIZE);
  velRingCounter: number = 0;
  velRing:number[] = new Array(this.VEL_RING_SIZE);
  lastStepTimeNs: number = 0;
  oldVelocityEstimate: number = 0;
  constructor(params) {
    console.info("====sum=====", basic)
  }
  calcSensorData(values: number[]): object {
    let timeNs = +new Date();
    let x = values[0];
    let y = values[1];
    let z = values[2];
    return this.updateAccel(timeNs, x, y, z);
  }
  /**
   * Accepts updates from the accelerometer.
   */
  updateAccel(timeNs: number, x: number, y: number, z: number): object {
    let isStep = false;
    let currentAccel = new Array(3);
    currentAccel[0] = x;
    currentAccel[1] = y;
    currentAccel[2] = z;

    // First step is to update our guess of where the global z vector is.
    let accelRingCounter = ++this.accelRingCounter;
    let ACCEL_RING_SIZE = this.ACCEL_RING_SIZE
    let accelRingX = this.accelRingX;
    let accelRingY = this.accelRingY;
    let accelRingZ = this.accelRingZ;
    accelRingX[accelRingCounter % ACCEL_RING_SIZE] = currentAccel[0];
    accelRingY[accelRingCounter % ACCEL_RING_SIZE] = currentAccel[1];
    accelRingZ[accelRingCounter % ACCEL_RING_SIZE] = currentAccel[2];

    let worldZ = new Array(3);
    worldZ[0] = basic.sum(accelRingX) / Math.min(accelRingCounter, ACCEL_RING_SIZE);
    worldZ[1] = basic.sum(accelRingY) / Math.min(accelRingCounter, ACCEL_RING_SIZE);
    worldZ[2] = basic.sum(accelRingZ) / Math.min(accelRingCounter, ACCEL_RING_SIZE);

    let normalization_factor = matrix.vectorNorm(worldZ);

    worldZ[0] = worldZ[0] / normalization_factor;
    worldZ[1] = worldZ[1] / normalization_factor;
    worldZ[2] = worldZ[2] / normalization_factor;

    // Next step is to figure out the component of the current acceleration
    // in the direction of world_z and subtract gravity's contribution
    let currentZ = matrix.dotproduct(worldZ, currentAccel) - normalization_factor;
    let velRingCounter = ++this.velRingCounter;
    let velRing = this.velRing;
    let VEL_RING_SIZE = this.VEL_RING_SIZE
    velRing[velRingCounter % VEL_RING_SIZE] = currentZ;
    let velocityEstimate = basic.sum(velRing);

    let STEP_THRESHOLD = this.STEP_THRESHOLD
    let STEP_DELAY_NS  = this.STEP_DELAY_NS; 
    let oldVelocityEstimate = this.oldVelocityEstimate;
    let dTime = timeNs - this.lastStepTimeNs;
    if (velocityEstimate > STEP_THRESHOLD && oldVelocityEstimate <= STEP_THRESHOLD &&
      (timeNs - this.lastStepTimeNs > STEP_DELAY_NS)) {
        console.info(velRing, "=====velRing======", accelRingX)
        isStep = true;
      // listener.step(timeNs);
      this.lastStepTimeNs = timeNs;
    }
    this.oldVelocityEstimate = velocityEstimate;
    return {
      isStep,
      c: currentZ,
      t1: dTime,
      v: this.oldVelocityEstimate,
      t: dTime > STEP_DELAY_NS
    }
  }
}
export default StepDetector;
