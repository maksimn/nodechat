import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE,
    SET_LOGIN_TAB_ACTIVE, 
    SET_REGISTER_TAB_ACTIVE,
    SET_AUTH_TOKEN
} from '../actions/constants';

// свойство isAuthorized в store может иметь значения
//     null -- неизвестно, авторизован ли пользователь (идёт запрос)
//     false -- пользователь не авторизован
//     true -- пользователь авторизован

const initState = {
    isAuthorized: null,
    authActiveTabIndex: 0,
    token: null
};

const auth = (state = initState, action) => {
    switch (action.type) {
        case CHECK_IF_AUTHORIZED_START:
            return  {
                ...state,
                isAuthorized: null
            };
        case CHECK_IF_AUTHORIZED_RESULT_FALSE:
            return  {
                ...state,
                isAuthorized: false
            };
        case CHECK_IF_AUTHORIZED_RESULT_TRUE:
            return  {
                ...state,
                isAuthorized: true
            };
        case SET_LOGIN_TAB_ACTIVE:
            return  {
                ...state,
                authActiveTabIndex: 0
            };
        case SET_REGISTER_TAB_ACTIVE:
            return  {
                ...state,
                authActiveTabIndex: 1
            };
        case SET_AUTH_TOKEN:
            return  {
                ...state,
                token: action.token
            };            
        default:
            return state;
    }
};

export default auth;