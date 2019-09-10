import firebase from 'firebase/app';
import '@firebase/database';


import {
    EDIT_POST_INIT,
    CAPTION_PROFILE_CHANGED,
    IMAGE_POST_CHANGED,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,
    EDIT_POST,
    CAPTION_POST_CHANGED,
    MODAL_SHOW_POST,
    MODAL_CLOSE_POST
} from './types'

export const editPostInit = (id, image, caption) => {
    return {
        type: EDIT_POST_INIT,
        payload: {
            postId: id, 
            imagePost: image,
            captionPost: caption
        }
    }
}

export const editPostSelected = () => {
    return {
        type: EDIT_POST,
        payload: 'EditSelected'
    }
}

export const captionEditChanged = (text) => {
    return {
        type: CAPTION_POST_CHANGED,
        payload: text
    }
}

export const modalShowingPost = () => {
    return {
        type: MODAL_SHOW_POST
    }
}

export const modalClosingPost = () => {
    return {
        type: MODAL_CLOSE_POST
    }
}