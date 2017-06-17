import axios from 'axios';

import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE,
    FORM_VALIDATION_ERROR,
    FORM_VALIDATION_ERROR_RESET,
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    SET_LOGIN_TAB_ACTIVE,
    SET_REGISTER_TAB_ACTIVE,
    SET_AUTH_TOKEN
} from './constants';
import {validateRegistrationData, getUserRegistrationValidationErrors} from '../validation';

export const setAuthPageActiveTab = index => {
    if (index === 0) {
        return { type: SET_LOGIN_TAB_ACTIVE };
    } else if (index === 1) {
        return { type: SET_REGISTER_TAB_ACTIVE };
    }
};

export const setAuthToken = token => {
    return {type: SET_AUTH_TOKEN, token};
};

export const checkIfUserAuthorized = () => {
    return dispatch => {
        dispatch({type: CHECK_IF_AUTHORIZED_START});
        setTimeout(() => {
            dispatch({type: CHECK_IF_AUTHORIZED_RESULT_FALSE});
        }, 2500);
    };
};

export const submitRegistrationData = (name, password, confirmPassword) => {
    const validationResult = validateRegistrationData(name, password, confirmPassword);

    if (validationResult.length > 0) {
        return {type: FORM_VALIDATION_ERROR, validationResult};
    }

    return dispatch => {
        const postData = { name, password };

        dispatch({type: FORM_VALIDATION_ERROR_RESET});
        dispatch({type: REGISTRATION_START, postData});
        axios.post('/users', postData).then(function (response) {
            const {name} = response.data;

            dispatch({type: REGISTRATION_SUCCESS, response});
            dispatch({type: SET_LOGIN_TAB_ACTIVE});
            alert(`Пользователь ${name} успешно зарегистрирован.`);
        }).catch(function (error) {
            const validationResult = getUserRegistrationValidationErrors(error);

            dispatch({type: REGISTRATION_ERROR, error});
            dispatch({type: FORM_VALIDATION_ERROR, validationResult});
        });
    };
};