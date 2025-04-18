import * as React from "react"
import Svg, { Path, G,  Rect, Circle, Mask} from "react-native-svg"
const USA = (props) => (
<Svg style={props.style} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Mask id="mask0_2_17589" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="72">
        <Circle cx="36" cy="36" r="36" fill="#D9D9D9"/>
    </Mask>
    <G mask="url(#mask0_2_17589)">
        <Rect width="72" height="72" fill="#F5F7F8"/>
        <Path d="M72 18V9L0 9V18L72 18Z" fill="#DD2033"/>
        <Path d="M72 27V36L0 36V27L72 27Z" fill="#DD2033"/>
        <Path d="M72 54V45L0 45V54L72 54Z" fill="#DD2033"/>
        <Path d="M72 72V63L0 63V72L72 72Z" fill="#DD2033"/>
        <Rect x="0.399902" y="36" width="36" height="36" transform="rotate(-90 0.399902 36)" fill="#004692"/>
        <Path d="M22.2 10L19.2193 16.7422L12.2 17.6393L17.3772 22.7035L16.0195 30L22.2 25.8333L28.3804 30L27.0227 22.7035L32.2 17.6393L25.1806 16.7422L22.2 10Z" fill="#F5F7F8"/>
    </G>
</Svg>
)
export default USA