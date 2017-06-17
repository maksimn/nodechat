import {handleActions} from 'redux-actions';
import {FORM_VALIDATION_ERROR, FORM_VALIDATION_ERROR_RESET} from '../actions/constants';

const initState = [];

const validationResult = handleActions({
    [FORM_VALIDATION_ERROR]: (state, action) => (action.payload),
    [FORM_VALIDATION_ERROR_RESET]: () => (initState)
}, initState);

export default validationResult;