// @ts-nocheck
import {Dimensions, Platform} from 'react-native';
import {StatusBar} from 'react-native';

const {height, width} = Dimensions.get('window');
const deviceH = Dimensions.get('screen').height;

const vh = height / 100;
const vw = width / 100;
const vmin = Math.min(vh, vw);
const vmax = Math.max(vh, vw);
const navBarHeight = deviceH - height;
const statusBarHeight = StatusBar.currentHeight;

const textPaddingTop = Platform.OS === 'ios' ? 4 : statusBarHeight;

export default {
  vh,
  vw,
  vmin,
  vmax,
  textPaddingTop,
  navBarHeight,
  statusBarHeight,
};
