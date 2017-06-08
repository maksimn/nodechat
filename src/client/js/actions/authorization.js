import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE,
    FORM_VALIDATION_ERROR
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
        console.log('Sending reg data: ', {
            name,
            password,
            confirmPassword
        });
    };
};
