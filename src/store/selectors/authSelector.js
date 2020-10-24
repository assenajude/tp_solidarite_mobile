import {createSelector} from "@reduxjs/toolkit";

const user = state => state.auth.user

const userRoleAdmin = (user) => {
    if (user){
        const adminIndex = user.roles.indexOf('ROLE_ADMIN')
        if(adminIndex !== -1) {
            return true
        } else return false
    }
    return false
}


export const getRoleAdmin = createSelector(
    user,
    userRoleAdmin
)