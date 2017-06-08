import {FORM_VALIDATION_ERROR, FORM_VALIDATION_ERROR_RESET} from '../actions/constants';

const initState = {
    source: '',
    errors: []   
}; 

const validationErrorData = (state = initState, action) => {
    switch (action.type) {
        case FORM_VALIDATION_ERROR:
            return action.validationErrorData;
        case FORM_VALIDATION_ERROR_RESET: 
            return initState;
        default:
            return state;
    }
};

export default validationErrorData;