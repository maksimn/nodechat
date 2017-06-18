import axios from 'axios';
import {createAction} from 'redux-actions';
import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    FORM_VALIDATION_ERROR,
    FORM_VALIDATION_ERROR_RESET,
    REGISTRATION_START,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    SET_LOGIN_TAB_ACTIVE,
    SET_REGISTER_TAB_ACTIVE,
    LOGIN_START,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from './constants';
import {
    validateLoginData,
    validateRegistrationData, 
    getUserRegistrationValidationErrors
} from '../validation';

const formValidationError = createAction(FORM_VALIDATION_ERROR);
const formValidationErrorReset = createAction(FORM_VALIDATION_ERROR_RESET);

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
        return formValidationError(validationResult);
    }

    return dispatch => {
        const postData = { name, password };

        dispatch(formValidationErrorReset());
        dispatch({type: REGISTRATION_START, postData});
        axios.post('/users', postData).then(function (response) {
            const {name} = response.data;

            dispatch({type: REGISTRATION_SUCCESS, response});
            dispatch({type: SET_LOGIN_TAB_ACTIVE});
            alert(`Пользователь ${name} успешно зарегистрирован.`);
        }).catch(function (error) {
            const validationResult = getUserRegistrationValidationErrors(error);

            dispatch({type: REGISTRATION_ERROR, error});
            dispatch(formValidationError(validationResult));
        });
    };
};

export const submitLoginData = (name, password) => {
    const validationResult = validateLoginData(name, password);

    if (validationResult.length > 0) {
        return formValidationError(validationResult);
    }

    return dispatch => {
        const postData = { name, password };

        dispatch(formValidationErrorReset());
        dispatch({type: LOGIN_START, postData});
        axios.post('/users/login', postData).then(function (response) {
            dispatch({type: LOGIN_SUCCESS, response});
        }).catch(function (error) {
            const validationResult = ['Не удалось войти в систему. Проверьте логин и пароль'];

            dispatch({type: LOGIN_ERROR, error});
            dispatch(formValidationError(validationResult));
        });
    };
};