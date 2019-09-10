import { 
    EDIT_POST_INIT,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS,
    IMAGE_POST_CHANGED,
    CAPTION_POST_CHANGED,
    EDIT_POST,
    MODAL_SHOW_POST,
    MODAL_CLOSE_POST
} from '../actions/types';

const INITIAL_STATE = {
    postId: null,
    imagePost: null,
    captionPost: '',
    loading: false, 
    error: '',
    postUpdated: false,
    modalShow: false
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_POST_INIT:
            return {...INITIAL_STATE, ...action.payload}
        case CAPTION_POST_CHANGED:
            return {...state, captionPost: action.payload}
        case IMAGE_POST_CHANGED:
            return {...state, imagePost: action.payload}
        case EDIT_POST:
            return {...state, postUpdated: action.payload}
        case EDIT_POST_FAIL: 
            return {...state, error: action.payload, loading: false}
        case EDIT_POST_SUCCESS:
            return {...INITIAL_STATE, loading: false, postUpdated: true}
        case MODAL_SHOW_POST:
            return { ...state, modalShow: true }
        case MODAL_CLOSE_POST:
            return { ...state, modalShow: false }
        default:
            return state
    }
}