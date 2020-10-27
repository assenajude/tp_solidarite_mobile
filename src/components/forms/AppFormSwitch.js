import React from 'react';
import {useFormikContext} from "formik";
import {Switch} from "react-native";
import AppSwitch from "../AppSwitch";
import AppErrorMessage from "./AppErrorMessage";
import colors from '../../utilities/colors'

function AppFormSwitch({name, title, ...props}) {
    const {handleChange,errors, touched,values, setFieldValue} = useFormikContext();

    return (
        <>
            <AppSwitch thumbColor={values[name] ? colors.or : "#f4f3f4"} title={title} switchValue={values[name]} switchValueChange={() => {
                setFieldValue(name, !values[name])
            }} />
            <AppErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormSwitch;