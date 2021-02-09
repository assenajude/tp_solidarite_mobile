import React from 'react';
import {View} from "react-native";
import colors from "../utilities/colors";
import AppText from "./AppText";
import {useNetInfo} from "@react-native-community/netinfo";


function OfflineNotice(props) {
    const netInfo = useNetInfo()
    const noInternet = netInfo.type !== "unknown" && netInfo.isInternetReachable === false

    if(noInternet) {
        return (
            <View style={{backgroundColor: colors.blanc}}>
                <AppText style={{color:colors.rougeBordeau, fontWeight: 'bold'}}>Vous n'avez pas d'accès internet.</AppText>
            </View>
        );
    }
    return null

}
export default OfflineNotice;