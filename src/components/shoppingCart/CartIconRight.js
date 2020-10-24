import React from 'react';
import {TouchableOpacity} from "react-native";
import AppIconWithBadge from "../AppIconWithBadge";
import Color from "../../utilities/colors";

function CartIconRight({cartLenght, getToCartScreen}) {
    return (
        <TouchableOpacity onPress={getToCartScreen}>
            <AppIconWithBadge notifStyle={{backgroundColor: Color.bleuFbi}} style={{marginRight: 10}} color={Color.blanc} name='shoppingcart' size={24} badgeCount={cartLenght}
            />
        </TouchableOpacity>
    );
}

export default CartIconRight;