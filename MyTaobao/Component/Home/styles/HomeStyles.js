import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "container": {
        "flex": 1,
        "backgroundColor": "#E8E8E8"
    },
    "navStyle": {
        "flexDirection": "row",
        "alignItems": "center",
        "justifyContent": "space-around",
        "height": 44,
        "backgroundColor": "rgba(255, 96, 0, 1)"
    },
    "navLeftStyle": {},
    "navLeftTextStyle": {
        "color": "white"
    },
    "navMiddleStyle": {
        "justifyContent": "center",
        "width": width * 0.73,
        "height": 30,
        "borderRadius": 15,
        "backgroundColor": "white"
    },
    "navRightStyle": {
        "flexDirection": "row"
    },
    "navRightImageStyle": {
        "width": 30,
        "height": 30
    }
});