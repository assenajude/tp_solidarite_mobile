import React from 'react';
import AppButton from "./AppButton";
import colors from "../utilities/colors";

function AppSmallButton({width=120, iconName, iconSize=25, title, onPress, otherProps}) {
    return (
        <AppButton
            onPress={onPress}
            title={title}
            iconSize={iconSize}
            iconName={iconName}
            textStyle={{color: colors.dark, marginLeft:5}}
            iconColor={colors.dark}
            color1={colors.leger}
            color2={colors.leger}
            color3={colors.leger}
            width={width}
            height={40}
            {...otherProps}
        />
    );
}

export default AppSmallButton;