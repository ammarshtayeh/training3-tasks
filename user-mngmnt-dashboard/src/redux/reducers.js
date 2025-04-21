import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE
} from './actions';

const initialState = {
    users: [],
    loading: false,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
        case ADD_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case EDIT_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case ADD_USER_SUCCESS:
            return { ...state, loading: false, users: [action.payload, ...state.users] }; // Prepend new user
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter(user => user.id !== action.payload)
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        case FETCH_USERS_FAILURE:
        case ADD_USER_FAILURE:
        case DELETE_USER_FAILURE:
        case EDIT_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;