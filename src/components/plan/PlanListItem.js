import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import colors from "../../utilities/colors";
import AppText from "../AppText";
import AppButton from "../AppButton";

function PlanListItem({onPress, planImage, imageStyle, imageDispo, label, description, getPlanDetail}) {
    return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            {imageDispo && <>
                   <Image source={planImage} style={[styles.planImageStyle, imageStyle]}/>
                    <AppText style={{color: colors.rougeBordeau, fontSize: 25, fontWeight:'bold'}}>{label}</AppText>
                    <AppText>{description}</AppText>
                </>}
              {!imageDispo && <View>
                  <View style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
                    <AppText style={{color: colors.rougeBordeau, fontSize: 25, fontWeight: 'bold'}}>{label}</AppText>
                  </View>
                  <AppText>{description}</AppText>
              </View>}

              <AppButton title='+ Details' onPress={getPlanDetail}/>
          </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blanc,
        justifyContent: 'center',
        alignItems: "center",
        padding: 5,
        marginBottom: 20,
        marginTop: 20
    },
    planImageStyle: {
        width: '100%',
        height: 200
    }
})

export default PlanListItem;