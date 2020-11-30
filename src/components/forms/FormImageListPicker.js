import React from 'react';
import {useFormikContext} from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppImageListPicker from "../AppImageListPicker";

function FormImageListPicker({name}) {
    const {errors, touched, setFieldValue, values} = useFormikContext();
    const imageUrls = values[name]

    const handleAddImage = uri => {
        setFieldValue(name,[...imageUrls, uri])
    }

    const handleDelImage = uri => {
        setFieldValue(name, imageUrls.filter(imageUrl => imageUrl !== uri ))
    }

    return (
        <>
            <AppImageListPicker imagesUrls={values[name]}  deleteImage={handleDelImage} addNewImage={handleAddImage} />
            <AppErrorMessage visible={touched[name]} error={errors[name]}/>
        </>
    );
}

export default FormImageListPicker;