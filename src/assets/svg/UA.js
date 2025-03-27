import * as React from "react"
import Svg, { Path, G,  Rect, Circle, Mask} from "react-native-svg"
const UA = (props) => (
    <Svg style={props.style} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Mask id="mask0_2_19165" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="72">
            <Circle cx="36" cy="36" r="36" fill="#D9D9D9"/>
        </Mask>
        <G mask="url(#mask0_2_19165)">
            <Rect x="72" width="36" height="72" transform="rotate(90 72 0)" fill="#005EB8"/>
            <Rect x="72" y="36" width="36" height="72" transform="rotate(90 72 36)" fill="#F1B434"/>
        </G>
    </Svg>
)
export default UA