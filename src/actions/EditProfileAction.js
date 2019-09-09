import {
    EDIT_PROFILE_INIT, 
    USERNAME_PROFILE_CHANGED
} from './types'


export const editProfileInit = (username, profileImage) => {
    return {
        type: EDIT_PROFILE_INIT,
        payload: {
            username, 
            profileImage
        }
    }
}

export const usernameEditProfileChanged = (text) => {
    return {
        type: USERNAME_PROFILE_CHANGED,
        payload: text
    }
}