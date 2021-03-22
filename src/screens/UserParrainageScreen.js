import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ParrainageEncoursItem from "../components/parrainage/ParrainageEncoursItem";
import {getParrainageOrders} from "../store/slices/parrainageSlice";

function UserParrainageScreen(props) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)


    useEffect(() => {
        dispatch(getParrainageOrders({userId: user.id}))
  }, [])

    const parrains = useSelector(state => state.entities.parrainage.userParrains)
    const filleuls = useSelector(state => state.entities.parrainage.userFilleuls)

    return (
        <>
            <FlatList data={[...parrains, ...filleuls]} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <ParrainageEncoursItem ownerUserAvatar={item.User.avatar} avatarUrl={{uri:item.User.avatar}}
                                                                     ownerUsername={item.User.username} ownerEmail={item.User.email}/>} />
        </>
    );
}

const styles = StyleSheet.create({

})
export default UserParrainageScreen;