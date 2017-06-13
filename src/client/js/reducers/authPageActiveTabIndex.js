import {SET_LOGIN_TAB_ACTIVE, SET_REGISTER_TAB_ACTIVE} from '../actions/constants';

const authPageActiveTabIndex = (state = 0, action) => {
    switch (action.type) {
        case SET_LOGIN_TAB_ACTIVE:
            return 0;
        case SET_REGISTER_TAB_ACTIVE:
            return 1;
        default:
            return state;
    }
};

export default authPageActiveTabIndex;
