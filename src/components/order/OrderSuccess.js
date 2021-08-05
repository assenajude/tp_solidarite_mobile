import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../AppText";
import Color from "../../utilities/colors";
import LottieView from 'lottie-react-native';
import AppSmallButton from "../AppSmallButton";

function OrderSuccess({message, newOrderNum, goToAccueil, sectionTitle, goToOrderSection}) {
    return (
        <View style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>

            <View style={styles.content}>
                <View style={{
                    marginHorizontal: 20
                }}>
                    <View style={styles.commande}>
                    <AppText style={{fontSize: 20}}>N°: </AppText>
                    <AppText style={{color: Color.or, fontSize: 20, fontWeight: 'bold'}}>{newOrderNum}</AppText>
                    </View>
                    <View>
                        <AppText>{message}</AppText>
                    </View>
                </View>

            </View>
            <View style={{
                alignItems: 'flex-end'
            }}>
                <View style={styles.buttonStyle}>
                        <AppSmallButton
                            iconName="home"
                            title='Accueil'
                            onPress={goToAccueil}
                        />
                        <AppSmallButton
                            width={160}
                            iconName='rightsquareo'
                            title={sectionTitle} onPress={goToOrderSection}/>
                </View>
            </View>

            <LottieView
                loop={false}
                autoPlay={true}
                source={require('../../assets/animations/order_success')}
                style={{
                    height: 200,
                    width: 200,
                    position: 'absolute',
                    top: 20,
            }}/>
            </View>
    );
}


const styles = StyleSheet.create({
    commande: {
        flexDirection: 'row',
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    content: {
        marginVertical:60,
        marginTop: 200
    }
})

export default OrderSuccess;