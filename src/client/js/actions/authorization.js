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
    SET_REGISTER_TAB_ACTIVE
} from './constants';
import {validateRegistrationData} from '../validation';

export const setAuthPageActiveTab = index => {
    if (index === 0) {
        return { type: SET_LOGIN_TAB_ACTIVE };
    } else if (index === 1) {
        return { type: SET_REGISTER_TAB_ACTIVE };
    }
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
            dispatch({type: REGISTRATION_SUCCESS, response});
            dispatch({type: SET_LOGIN_TAB_ACTIVE});
            
            const {name} = response.data;
            alert(`Пользователь ${name} успешно зарегистрирован.`);
        }).catch(function (error) {
            dispatch({type: REGISTRATION_ERROR, error});

            const validationResult = ['Не удалось зарегистрировать нового пользователя'];

            if (error.response.status === 409) {
                const userName = error.response.data.name;

                validationResult.push(`Пользователь '${userName}' уже существует.`);
            }

            dispatch({type: FORM_VALIDATION_ERROR, validationResult});
        });
    };
};