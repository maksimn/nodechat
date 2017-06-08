import {FORM_VALIDATION_ERROR} from '../actions/constants';

const initState = {
    source: '',
    errors: []   
}; 

const validationErrorData = (state = initState, action) => {
    switch (action.type) {
        case FORM_VALIDATION_ERROR:
            return action.validationErrorData;
        default:
            return state;
    }
};

export default validationErrorData;