import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "container": {
        "flex": 1,
        "backgroundColor": "#e8e8e8"
    },
    "navStyle": {
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "center",
        "height": 44,
        "backgroundColor": "rgba(255, 96, 0, 1)"
    },
    "navMiddleStyle": {},
    "navMiddleTextStyle": {
        "color": "white",
        "fontSize": 17,
        "fontWeight": "bold"
    },
    "navRightStyle": {
        "position": "absolute",
        "right": 10,
        "bottom": 10
    },
    "navRightImageStyle": {
        "width": 25,
        "height": 25
    }
});
