import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Compass = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
   <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#566379" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   <Path d="M16.2398 7.76001L14.1198 14.12L7.75977 16.24L9.87977 9.88001L16.2398 7.76001Z" stroke="#566379" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Svg>
);
export default Compass;
