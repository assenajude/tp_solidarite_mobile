import React from 'react';
import {ScrollView} from "react-native";

import AppCard from "./AppCard";
function AppDetail({route}) {
    return (
        <ScrollView>
            <AppCard subtitle={route.params.item.prixArticle} title={route.params.item.designArticle} image={{uri: route.item.imageArticle}} />
        </ScrollView>
    );
}

export default AppDetail;