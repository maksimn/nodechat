// свойство isAuthorized в store может иметь значения
//     null -- неизвестно, авторизован ли пользователь (идёт запрос)
//     false -- пользователь не авторизован
//     true -- пользователь авторизован
import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE
} from '../actions/constants';

const initState = null; 

const isAuthorized = (state = initState, action) => {
    switch (action.type) {
        case CHECK_IF_AUTHORIZED_START:
            return null;
        case CHECK_IF_AUTHORIZED_RESULT_FALSE:
            return false;
        case CHECK_IF_AUTHORIZED_RESULT_TRUE:
            return true;
        default:
            return state;
    }
};

export default isAuthorized;