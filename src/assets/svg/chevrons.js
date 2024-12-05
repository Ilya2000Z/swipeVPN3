import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ChevronsSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={58} height={12} fill="none">
    <Path
      stroke="#E7FE55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.25}
      d="m26 1 5 5-5 5"
    />
    <Path
      stroke="#E7FE55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="m39 1 5 5-5 5"
    />
    <Path
      stroke="#E7FE55"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m52 1 5 5-5 5"
    />
  </Svg>
)
export default ChevronsSvg