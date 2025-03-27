import * as React from "react"
import Svg, { Path, G,  Rect, Circle, Mask} from "react-native-svg"
const PL = (props) => (
    <Svg style={props.style} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Mask id="mask0_541_490" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
            <Circle cx="22" cy="22" r="22" fill="#D9D9D9"/>
        </Mask>
        <G mask="url(#mask0_541_490)">
            <Rect width="44" height="44" fill="#DD2033"/>
            <Rect width="44" height="22" fill="#F5F7F8"/>
        </G>
    </Svg>
)
export default PL