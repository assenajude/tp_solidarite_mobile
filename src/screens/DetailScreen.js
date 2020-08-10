import React from 'react';
import {ScrollView, View} from "react-native";
import AppCard from "../components/AppCard";
import AppText from "../components/AppText";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Color from "../utilities/colors";
import AppButton from "../components/AppButton";

function DetailScreen({route}) {
    return (
        <ScrollView>
            <AppCard button2='Acheter' aideInfo={route.params.aideVente=== 'oui'?(<MaterialCommunityIcons name="help-circle-outline" size={30} color={Color.bleuFbi}/>):''} dispo={route.params.qteStock} subtitle={+route.params.prixArticle} title={route.params.designArticle} image={{uri: route.params.imageArticle}}>
                {route.params.aideVente ==='oui' && <AppButton title='Voir les plans' style={{padding: 10, backgroundColor: Color.rougeBordeau, fontWeight: 'bold'}}/>}
            </AppCard>
           <View>
            <AppText content='Description: ' />
            <AppText lineNumber={1} content={route.params.descripArticle} />
           </View>
        </ScrollView>
    );
}

export default DetailScreen;