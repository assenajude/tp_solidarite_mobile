import React from 'react';
import {useFormikContext} from "formik";
import AppErrorMessage from "./AppErrorMessage";
import AppImageListPicker from "../AppImageListPicker";

function FormImageListPicker({name}) {
    const {errors, touched, setFieldValue, values} = useFormikContext();
    const imagesTab = values[name]

    const handleAddImage = image => {
        setFieldValue(name,[...imagesTab, image])
    }

    const handleDelImage = selectedImage => {
        setFieldValue(name, imagesTab.filter(image => image.url !== selectedImage.url ))
    }

    return (
        <>
            <AppImageListPicker  imagesData={values[name]}  deleteImage={handleDelImage} addNewImage={handleAddImage} />
            <AppErrorMessage visible={touched[name]} error={errors[name]}/>
        </>
    );
}

export default FormImageListPicker;