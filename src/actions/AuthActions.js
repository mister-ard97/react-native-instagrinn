import firebase from 'firebase';
import '@firebase/auth';

import {
    LOGOUT_USER
} from './types';

export const logoutUser = () => {
    return(dispatch) => {
        firebase.auth().signOut()
        .then(res => {
            dispatch({type: LOGOUT_USER})
        }) 
    }
}