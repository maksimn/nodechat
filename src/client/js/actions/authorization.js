import {
    CHECK_IF_AUTHORIZED_START,
    CHECK_IF_AUTHORIZED_RESULT_FALSE,
    CHECK_IF_AUTHORIZED_RESULT_TRUE
} from './constants';

export const checkIfUserAuthorized = () => {
    return dispatch => {
        dispatch({type: CHECK_IF_AUTHORIZED_START});
        setTimeout(() => {
            dispatch({type: CHECK_IF_AUTHORIZED_RESULT_FALSE});
        }, 2500);
    };
};
