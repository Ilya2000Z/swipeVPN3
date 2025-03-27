import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowLeft = ({ style, strokeWidth = 2 }) => (
<Svg width="24" height="24" viewBox="0 0 24 24" style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M19 12H5" stroke="white" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M12 19L5 12L12 5" stroke="white" stroke-width={strokeWidth} stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

)
export default ArrowLeft