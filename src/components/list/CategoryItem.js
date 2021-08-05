import React, {useState} from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native'
import AppText from "../AppText";
import colors from "../../utilities/colors";
import LottieView from 'lottie-react-native'

function CategoryItem({imageUrl, label, getSelectedCategory}) {

    const [imageLoading, setImageLoading] = useState(true)
    return (
        <TouchableOpacity onPress={getSelectedCategory}>
            <View style={styles.container}>
                <View>
                <Image
                    onLoadEnd={() => setImageLoading(false)}
                    resizeMode='contain' source={imageUrl} style={styles.imageStyle}/>
                {imageLoading && <View style={styles.imageLoading}>
                    <LottieView
                        loop={true}
                        autoPlay={true}
                        style={{
                            height: 60,
                            width: 60
                        }}
                        source={require('../../assets/animations/image-loading')}/>
                </View>}
                </View>
                <View>
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
        marginVertical: 20,
        marginHorizontal: 20,
        width: 150,
        height: 150,
        backgroundColor: colors.lightGrey,
        borderRadius: 10
    },
    imageStyle: {
        height: 80,
        width: 80,
        overflow: 'hidden',
        borderRadius: 40
    },
    imageLoading: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        backgroundColor: colors.leger
    }
})
export default CategoryItem;