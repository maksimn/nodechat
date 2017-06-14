import {FORM_VALIDATION_ERROR, FORM_VALIDATION_ERROR_RESET} from '../actions/constants';

const initState = [];

const validationResult = (state = initState, action) => {
    switch (action.type) {
        case FORM_VALIDATION_ERROR:
            return action.validationResult;
        case FORM_VALIDATION_ERROR_RESET: 
            return initState;
        default:
            return state;
    }
};

export default validationResult;