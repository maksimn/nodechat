import axios from 'axios';

import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE,
    FORM_VALIDATION_ERROR,
    FORM_VALIDATION_ERROR_RESET,
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR
} from './constants';
import {validateRegistrationData} from '../validation';

export const checkIfUserAuthorized = () => {
    return dispatch => {
        dispatch({type: CHECK_IF_AUTHORIZED_START});
        setTimeout(() => {
            dispatch({type: CHECK_IF_AUTHORIZED_RESULT_FALSE});
        }, 2500);
    };
};

export const submitRegistrationData = (name, password, confirmPassword) => {
    const validationErrorData = validateRegistrationData(name, password, confirmPassword);

    if (validationErrorData.errors.length > 0) {
        return {type: FORM_VALIDATION_ERROR, validationErrorData};
    }

    return dispatch => {
        const postData = { name, password };

        dispatch({type: FORM_VALIDATION_ERROR_RESET});
        dispatch({type: REGISTRATION_START, postData});
        axios.post('/users', postData).then(function (response) {
            dispatch({type: REGISTRATION_SUCCESS});
            console.log(response);
        }).catch(function (error) {
            dispatch({type: REGISTRATION_ERROR, error});
        });
    };
};
