import axios from 'axios';
import {createAction, createActions} from 'redux-actions';
import Cookies from 'universal-cookie';

import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_TRUE,
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
    LOGIN_SUCCESS,
    SET_USER,
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from './constants';
import {
    validateLoginData,
    validateRegistrationData, 
    getUserRegistrationValidationErrors
} from '../validation';

const AUTH_TOKEN = 'AUTH_TOKEN';

const formValidationError = createAction(FORM_VALIDATION_ERROR);
export const formValidationErrorReset = createAction(FORM_VALIDATION_ERROR_RESET);

const setUser = createAction(SET_USER);

const {logoutStart, logoutSuccess, logoutError} = 
    createActions(LOGOUT_START, LOGOUT_SUCCESS, LOGOUT_ERROR);

export const setAuthPageActiveTab = index => {
    if (index === 0) {
        return { type: SET_LOGIN_TAB_ACTIVE };
    } else if (index === 1) {
        return { type: SET_REGISTER_TAB_ACTIVE };
    }
};

// Действие вызывается при рефреше страницы приложения | первой загрузке.
// Сначала проверяется, есть ли значение AUTH_TOKEN в куки
// Если нет, то возвращается CHECK_IF_AUTHORIZED_RESULT_FALSE
// Если есть, то оно отправляется на сервер
// На сервере возвращаются данные пользователя с данным токеном (если он есть)
// Если нет, то возвращается CHECK_IF_AUTHORIZED_RESULT_FALSE
export const checkIfUserAuthorized = () => {
    const cookies = new Cookies();
    const token = cookies.get(AUTH_TOKEN);

    if (token) {
        return dispatch => {
            dispatch({type: CHECK_IF_AUTHORIZED_START, token});

            axios.get('/users/auth', { headers: { 'x-auth': token } }).then(response => {
                dispatch({ type: CHECK_IF_AUTHORIZED_RESULT_TRUE, response });
                dispatch(setUser(response.data));
            }).catch(err => {
                dispatch({ type: CHECK_IF_AUTHORIZED_RESULT_FALSE, err });
            });
        };
    } else {
        return {type: CHECK_IF_AUTHORIZED_RESULT_FALSE};
    }
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
            dispatch(setUser(response.data));
            // Здесь нужно задать куки AUTH_TOKEN на клиенте. 
            // Значение есть в response.headers['x-auth']
            const cookies = new Cookies();
            cookies.set(AUTH_TOKEN, response.headers['x-auth'], { path: '/' });
        }).catch(function (error) {
            const validationResult = ['Не удалось войти в систему. Проверьте логин и пароль'];

            dispatch({type: LOGIN_ERROR, error});
            dispatch(formValidationError(validationResult));
        });
    };
};

export const logout = () => {
    return dispatch => {
        const cookies = new Cookies();
        const token = cookies.get(AUTH_TOKEN);

        dispatch(logoutStart());
        axios.post('/users/logout', {token}).then(() => {
            dispatch(logoutSuccess());
        }).catch(() => {
            dispatch(logoutError());
        });
    };
};
