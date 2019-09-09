import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    LOGIN_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    loading: false, 
    checkedAuth: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...INITIAL_STATE,
                user: action.payload, 
                checkedAuth: true
            }
        case LOGOUT_USER:
            return {
                ...INITIAL_STATE,
                checkedAuth: true
            }
        case LOGIN_USER_FAIL:
            return {
                ...INITIAL_STATE,
                checkedAuth: true
            }
        default:
            return state;
    }
}