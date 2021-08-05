import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from "react-native";
import AppText from "./AppText";
import colors from "../utilities/colors";
import useAuth from "../hooks/useAuth";
import AppButton from "./AppButton";
import AppLottieViewAnim from "./AppLottieViewAnim";
import AppSmallButton from "./AppSmallButton";
import AppIconButton from "./AppIconButton";

function AppCardNew({source, description, itemReductionPercent, isFavorite, titleLabel,itemType,
                        toggleFavorite, aideInfo,firstTitle, secondTitle, notInStock, deleteItem,
                        addToCart, viewDetails, minAmount, maxAmount, showHelpInfo}) {
    const {userRoleAdmin, formatPrice} = useAuth()

    const [isImageLoading, setIsImageLoading] = useState(true)

    return (
        <View style={styles.container}>
            <View>
                <View>
                <TouchableWithoutFeedback onPress={viewDetails}>
                    <Image
                        onLoadEnd={() => setIsImageLoading(false)}
                        resizeMode='contain'
                        style={styles.imageStyle}
                        source={source}/>
                </TouchableWithoutFeedback>
                    {isImageLoading &&
                    <View style={styles.imageLoading}>
                        <AppLottieViewAnim
                            lottieStyle={{
                                height: 200,
                                width: 200,
                                left: -30,
                                top:20,
                            }}
                            lottieSource={require('../assets/animations/image-loading')}
                            lottieLoop={true}
                            lottieAutoPlay={true}/>
                    </View>}
                </View>
                <View>
                <View style={styles.description}>
                    <AppText lineNumber={2}>{description}</AppText>
                </View>
                 {itemType !=='service' && <View style={styles.title}>
                        <AppText style={{fontWeight: 'bold'}}>{titleLabel}</AppText>
                     <View>
                            <AppText style={{color: colors.rougeBordeau}}>{formatPrice(firstTitle)}</AppText>
                            <AppText style={styles.secondTitle}>{formatPrice(secondTitle)}</AppText>
                     </View>
                 </View>}
                 {itemType === 'service' && <View style={{
                     alignItems: 'center'
                 }}>
                     <View style={{
                         flexDirection: 'row'
                     }}>
                         <AppText style={{fontWeight: 'bold'}}>Minimum:</AppText>
                         <AppText>{formatPrice(minAmount)}</AppText>
                     </View>

                     <View style={{
                         flexDirection: 'row'
                     }}>
                         <AppText style={{fontWeight: 'bold'}}>Maximum:</AppText>
                         <AppText>{formatPrice(maxAmount)}</AppText>
                     </View>
                 </View>}
                    <View style={{
                        alignItems: 'center'
                    }}>
                            <AppSmallButton
                                width={200}
                                onPress={addToCart}
                                iconName='shoppingcart'
                                title={itemType === 'location'?'Louer' : itemType === 'service'?'Utiliser': 'Acheter'}
                            />
                    </View>
                </View>
            </View>
            {itemType !== 'service' && itemReductionPercent>0  && <View style={styles.percent}>
                <AppText style={styles.percentText}>-{itemReductionPercent}%</AppText>
            </View>}
            {itemType !== 'service' &&
                <AppIconButton
                    iconColor={colors.dark}
                    onPress={toggleFavorite}
                    buttonContainer={styles.favorite}
                    iconName={isFavorite?'heart':'hearto'}
                    />}
            {itemType !== 'service' && aideInfo &&
                <AppIconButton
                    onPress={showHelpInfo}
                    iconName='infocirlce'
                    iconColor={colors.dark}
                    buttonContainer={styles.aide}/>
            }
            {notInStock && <View style={styles.notInStock}>
                {itemType !== 'service' && <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>Rupture de stock</AppText>}
                {itemType === 'service' && <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>Service non disponible</AppText>}
                {userRoleAdmin() && <AppButton
                    height={30}
                    width={100}
                    color1={colors.rougeBordeau}
                    color2={colors.rougeBordeau}
                    color3={colors.rougeBordeau}
                    title='supprimer' onPress={deleteItem}/>}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    aide: {
        position: 'absolute',
        right: 80,
        top: 5,
        marginHorizontal: 20
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 10,
    },
    bottomInfo: {
      flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginHorizontal: 20,
        marginVertical: 10
    },
    container: {
        alignSelf: 'center',
      justifyContent: 'flex-start',
        width:360,
        height: 'auto',
        marginVertical: 30,
        backgroundColor: colors.blanc,
        padding: 5,
        borderRadius:10,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10
    },
    description: {
        width: '80%',
        marginTop: -5,
        alignSelf: 'center'
    },
    favorite:{
        position: 'absolute',
        right: 10,
        top: 5,
        marginHorizontal: 20
    },
    imageStyle: {
        height: 250,
        width: 350,
        overflow: 'hidden',
        marginVertical: 20,
        top: 20
    },
    notInStock: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.6,
        zIndex: 1,
        backgroundColor: colors.blanc
    },
    percent:{
        position:'absolute',
        left: 10,
        top:10,
        marginHorizontal: 20
    },
    imageLoading: {
      position: 'absolute',
      width: 350,
      height: 300,
        backgroundColor: colors.blanc
    },
    percentText: {
        color: colors.rougeBordeau,
        fontSize: 18
    },
    secondTitle: {
        textDecorationLine: 'line-through',
        color: colors.leger,
        marginTop: -10
    },
    title: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
})
export default AppCardNew;