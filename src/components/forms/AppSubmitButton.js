import React from 'react';
import {View, ActivityIndicator, StyleSheet} from "react-native";
import {useFormikContext} from 'formik'

import AppButton from "../AppButton";
import colors from '../../utilities/colors'

function AppSubmitButton({title, showLoading}) {
    const {handleSubmit} = useFormikContext()

    return (
        <View style={styles.container}>
          {showLoading && <ActivityIndicator size='small' color={colors.blanc}/>}
          <AppButton style={{width: '60%', padding: 10, marginTop: 10}} onPress={handleSubmit} title={title} />
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