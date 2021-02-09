import React from 'react';
import {TouchableOpacity, View, StyleSheet} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";

function ResponseLabel({nonReadResponse, readResponse}) {
    return (
        <>
        <TouchableOpacity onPress={readResponse}>
            {nonReadResponse > 0 && <View>
                <AppText style={styles.label}>Reponses ({nonReadResponse})</AppText>
            </View>}

            {nonReadResponse === 0 && <View>
                <AppText style={styles.label}>Reponses</AppText>
            </View>}
        </TouchableOpacity>
            </>
    );
}

const styles = StyleSheet.create({
    label: {
        color: colors.bleuFbi
    }
})
export default ResponseLabel;