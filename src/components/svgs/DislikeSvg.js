import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const DislikeSvg = props => (
  <Svg viewBox="0 0 512 512" {...props}>
    <Circle cx={256} cy={255.9} r={255.9} fill="#ddbaba" />
    <Path
      d="M299.3 508.3l-202.7-190 83.1-57 140.8-57.9 81.6-5 104.3 109.3C485.5 403 416 483.5 299.3 508.3z"
      fill="#af9090"
    />
    <Path
      d="M228.1 300.5h-42.7V182.4h45.2l20.7-2.4c32.9-3 71.7-11.9 101.1-3.9 10.2 2.8 50.7 11 50.7 26.6 0 9.2 1.2 20.4-10.7 23v.1h5c17.5 0 18.4 31.5 4.3 36.1h.9c18.8 0 18.8 36.9 0 36.9h-4.5l.2 2 7.4.1c23.3.4 19.5 39.2-4.2 35.8h-77.4s22.4 24.9 19.1 61.8-30.6 23.5-32.2 12c-1.6-11.3-13.2-52-45.1-70.5-22.9-13.3-33.7-30.7-37.9-39.5h.1z"
      fill="#ededed"
    />
    <Path d="M172.2 172.8h52.2v134.9h-52.2V172.8z" fill="#f8f8f8" />
    <Path d="M96.5 162.2h93.1v156H96.5v-156z" fill="#3a3a3a" />
  </Svg>
);

export default DislikeSvg;
