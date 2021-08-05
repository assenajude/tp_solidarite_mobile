import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Image} from 'react-native'
import colors from "../../utilities/colors";
import AppText from "../AppText";
import AppSmallButton from "../AppSmallButton";
import AppLottieViewAnim from "../AppLottieViewAnim";
import LottieView from 'lottie-react-native'

function PlanListItem({onPress, planImage, imageStyle, imageDispo, label, description, getPlanDetail}) {

    const [imageLoading, setImageLoading] = useState(true)

    return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
            {imageDispo && <View style={{width: '100%'}}>
                <View>
                   <Image onLoadEnd={() => setImageLoading(false)}
                       source={planImage}
                       style={[styles.planImageStyle, imageStyle]}/>
                   {imageLoading && <View style={styles.loadingContainer}>
                   <LottieView
                       style={{
                           width: 200,
                           height: 200,
                       }}
                       source={require('../../assets/animations/image-loading')}
                       loop={true}
                       autoPlay={true}/>

                   </View>}
                </View>
                    <AppText style={{color: colors.rougeBordeau, fontSize: 25, fontWeight:'bold'}}>{label}</AppText>
                    <AppText>{description}</AppText>
                </View>}
              {!imageDispo && <View>
                  <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <AppText style={{color: colors.rougeBordeau, fontSize: 25, fontWeight: 'bold'}}>{label}</AppText>
                  </View>
                  <AppText>{description}</AppText>
              </View>}

              <AppSmallButton
                  title='+ Details' onPress={getPlanDetail}/>
          </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blanc,
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 20,
    },
    planImageStyle: {
        height: 250,
        width: '100%'
    },
    loadingContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: colors.leger,
        height: 250
    }
})

export default PlanListItem;