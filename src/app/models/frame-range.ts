const FrameRange: { [key: string]: [number, number] } = {
  UNDER_63: [0, 63],
  FROM_64_TO_127: [64, 127],
  FROM_128_TO_255: [128, 255],
  FROM_256_TO_511: [256, 511],
  FROM_512_TO_1023: [512, 1023],
  FROM_1024_TO_1518: [1024, 1518],
  ABOVE_1518: [1519, Infinity],
};
export type FrameRange = (typeof FrameRange)[keyof typeof FrameRange];
