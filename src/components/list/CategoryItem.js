import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native'
import AppText from "../AppText";
import colors from "../../utilities/colors";

function CategoryItem({imageUrl, label, getSelectedCategory}) {
    return (
        <TouchableOpacity onPress={getSelectedCategory}>
            <View style={styles.container}>
                <Image source={imageUrl} style={styles.imageStyle}/>
                <View style={{maxWidth: 100}}>
                <AppText style={{color: colors.bleuFbi}}>{label}</AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    imageStyle: {
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderRadius: 30
    }
})
export default CategoryItem;