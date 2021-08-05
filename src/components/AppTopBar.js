import React from 'react';
import {View, TextInput,TouchableOpacity, StyleSheet, Modal,FlatList} from 'react-native'
import {EvilIcons,AntDesign} from '@expo/vector-icons'
import Color from '../utilities/colors'
import AppText from "./AppText";
import CategoryItem from "./list/CategoryItem";


function AppTopBar({style, leaveInput, changeSearchValue, searchValue, handleSearch, searching,
                       startingSearch, espace, showSpaceModal, spaceModalVisible,
                       closeSpaceModal, categoryList, getSelectedCategory,getAllCategories}) {





    return (
        <>
           {!searching && <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={startingSearch}>
                <View style={{borderBottomWidth: 1, borderColor: Color.blanc}}>
                    <EvilIcons name='search' size={24} color='white'/>
                </View>
            </TouchableOpacity>
               <View style={{marginLeft: 40}}>
                      {espace !== 'home' && <TouchableOpacity onPress={showSpaceModal}>
                      <View>
                           <AntDesign name="appstore-o" size={25} color="white" />
                       </View>
                      </TouchableOpacity>
                      }
                  {espace !== 'home' && <Modal visible={spaceModalVisible} animation='slide' transparent>
                       <View style={styles.modalContainer}>
                           <View style={{alignSelf: 'flex-end', margin: 20}}>
                               <TouchableOpacity onPress={closeSpaceModal}>
                                   <AntDesign name="closecircle" size={30} color={Color.rougeBordeau} />
                               </TouchableOpacity>
                           </View>
                           <View style={styles.allCategoriesStyle}>
                               <TouchableOpacity onPress={getAllCategories}>
                                   <View style={{alignItems: 'center'}}>
                                   <AppText style={{color:Color.blanc}}>Tous</AppText>
                                   </View>
                               </TouchableOpacity>
                           </View>
                            <FlatList numColumns={3} data={categoryList} keyExtractor={item => item.id.toString()}
                            renderItem={({item}) =><CategoryItem imageUrl={{uri: item.imageCateg}} label={item.libelleCateg}
                                                                 getSelectedCategory={() => getSelectedCategory(item)}/>}/>
                       </View>

                   </Modal>}
               </View>
            </View>}
            {searching &&<View style={[styles.searchContainer, style]}>
            <TextInput style={styles.inputStyle} onFocus={startingSearch}  onBlur={leaveInput} value={searchValue} onChangeText={changeSearchValue} placeholder='chercher ici...'
                       onSubmitEditing={handleSearch} />
                <TouchableOpacity onPress={handleSearch}>
                <EvilIcons name='search' size={24} color='black'/>
                </TouchableOpacity>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    searchContainer:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: Color.blanc,
            backgroundColor: Color.blanc,
            borderRadius: 20

        },
    inputStyle:{
        width: 200,
        paddingBottom: 5,
        paddingLeft: 5,
        color:Color.dark,
        borderColor: Color.blanc
    },
    modalStyle:{
        backgroundColor: Color.blanc,
        height: '55%',
        width: '100%',
        alignItems: 'flex-start',
        position: 'absolute',
        top: 180,
    },
    modalContainer:{
        marginTop: '12%',
        backgroundColor: Color.blanc,
        height: '100%',
        alignItems: 'center',
        paddingBottom: 60
    },
    allCategoriesStyle: {
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Color.bleuFbi,
        width: 80,
        height: 80,
        borderRadius: 40
    }
})

export default AppTopBar;