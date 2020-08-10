import React from 'react';
import {useFormikContext} from 'formik'

import AppButton from "../AppButton";

function AppSubmitButton({title}) {
    const {handleSubmit} = useFormikContext()

    return (
        <AppButton onPress={handleSubmit} style={{margin: 15, padding: 10}} title={title} />
    );
}

export default AppSubmitButton;