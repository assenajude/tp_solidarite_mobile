import React, {useEffect} from 'react';
import {View} from "react-native";
import {useFormikContext, Formik} from 'formik'
import AppInput from "../AppInput";
import AppErrorMessage from "../forms/AppErrorMessage";

function FormFieldMode({name, title,onModeChange}) {
    const {errors, touched, setFieldValue, setFieldTouched} = useFormikContext();


    return (
        <>
            <AppInput title={title} onBlur={() => setFieldTouched(name)} onChangeText={(value) =>{
                setFieldValue(name, value)
                onModeChange(value)}}/>
            <AppErrorMessage visible={touched[name]} error={errors[name]}/>

        </>
    );
}

export default FormFieldMode;