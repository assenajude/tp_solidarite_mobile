import React from 'react';
import {View, ActivityIndicator, StyleSheet} from "react-native";
import {useFormikContext} from 'formik'

import AppButton from "../AppButton";
import colors from '../../utilities/colors'
import AppSmallButton from "../AppSmallButton";

function AppSubmitButton({title, showLoading, width=200}) {
    const {handleSubmit} = useFormikContext()

    return (
        <View style={styles.container}>
          {showLoading && <ActivityIndicator size='small' color={colors.blanc}/>}
          <AppButton
              width={width}
              onPress={handleSubmit} title={title} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 30,
    }
})

export default AppSubmitButton;