import {Dimensions} from 'react-native';

// @see https://github.com/nirsky/react-native-size-matters

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

type Scale = (size: number) => number;

/**
 * Scale for padding, margin
 * @param size
 * @returns
 */
const scale: Scale = size => (shortDimension / guidelineBaseWidth) * size;

/**
 * Scale for height
 * @param size
 * @returns
 */
const verticalScale: Scale = size =>
  (longDimension / guidelineBaseHeight) * size;

/**
 * Scale for font size, width
 * @param size
 * @param factor
 * @returns
 */
const moderateScale: Scale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 *
 * @param size
 * @param factor
 * @returns
 */
const moderateVerticalScale: Scale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const s = scale;
const vs = verticalScale;
const ms = moderateScale;
const mvs = moderateVerticalScale;

export default {
  s,
  vs,
  ms,
  mvs,
};
