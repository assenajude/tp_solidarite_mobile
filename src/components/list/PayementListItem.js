import React from 'react';
import {View, StyleSheet,TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons'



import AppText from "../AppText";
import AppButton from "../AppButton";
import DelaiPlanShower from "../DelaiPlanShower";
import colors from "../../utilities/colors";

function PayementListItem({libelle, description, checked=false, selectItem, buttonStyle,
                              planDelai, showDelai=true, showDetail, getDetails, goToPlanDetail,
                              isAdLivraison=false, children, showDetailButton=true, disablePlan,
                              goToDisabledPlanDetail}) {
    return (
        <View>
        <TouchableOpacity onPress={selectItem}>
            <View>
           <View style={styles.listContainer}>
            <View style={styles.checkStyle}>
                {checked && <AntDesign name='check' size={24} color='green' />}
            </View>
            <View style={styles.listContent}>
                <View style={styles.detailStyle}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                    <AppText style={{fontWeight: 'bold', fontSize: 20}}> {libelle}</AppText>
                        {showDelai && <DelaiPlanShower delai={planDelai}
                                         otherContainerStyle={{marginLeft: -20, marginBottom: 10}}/>}
                    </View>
                </View>
                <View>
                    {!showDetail && <AppText lineNumber={1}>{description}</AppText>}
                    {showDetail && <View>
                        {!isAdLivraison && <AppText>{description}</AppText>}
                        {isAdLivraison && <View>
                            {children}
                        </View>}
                    </View>}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <AppButton iconName={showDetail ?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto'}} textStyle={{marginLeft: 5}} title={showDetail?'Fermer':'Deplier'} onPress={getDetails}/>
                        {showDetailButton && <AppButton title='+ details' style={[{width: 'auto',height: 20,marginLeft: 20, alignSelf: 'flex-start'}, buttonStyle]} onPress={goToPlanDetail}/>}
                    </View>

                </View>
            </View>
           </View>
            </View>
            {disablePlan && <View style={styles.disablePlan}>
            </View>}

        </TouchableOpacity>
            {disablePlan && <View style={{
                position: 'absolute', zIndex:48,
                alignSelf: 'center',
                top: 50,
                right: 80,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <AppButton onPress={goToDisabledPlanDetail}  title='consulter le plan'/>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingRight: 5,
        width: '70%',
    },
    listContent: {
    },
    checkStyle: {
        borderWidth: 0.5,
        height: 30,
        minWidth: 30,
        minHeight: 20,
        margin: 5,
        right: 10,
        justifyContent: 'center'

    },
    numberStyle: {
        borderWidth: 0.5,
        margin: 5,
        justifyContent: 'center'
    },
    detailStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    disablePlan: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: colors.blanc,
        opacity: 0.6

    }
})

export default PayementListItem;