import React from 'react';
import {useFormikContext} from 'formik'

import AppErrorMessage from "./AppErrorMessage";
import AppImagePicker from "../AppImagePicker";


function AppFormImagePicker({name}) {
    const {errors, touched, setFieldValue, values} = useFormikContext();
    const changeImage = (uri) => {
        setFieldValue(name, uri);
    }

    return (
        <>
            <AppImagePicker onChangeImage={changeImage} selectedImage={values[name]}/>
            <AppErrorMessage visible={touched[name]} error={errors[name]}/>
        </>
    );
}

export default AppFormImagePicker;