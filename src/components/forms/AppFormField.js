import React from 'react';
import {useFormikContext} from 'formik'

import AppErrorMessage from "./AppErrorMessage";
import AppInput from "../AppInput";

function AppFormField({name, title, ...props}) {

    const {handleChange,errors, touched, setFieldTouched, values} = useFormikContext()

    return (
        <>
            <AppInput title={title} value={values[name]}
                onBlur={() => setFieldTouched(name) }
                onChangeText={handleChange(name)} {...props}
            />
            <AppErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default AppFormField;