export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

export const addUserRequest = () => ({ type: ADD_USER_REQUEST });
export const addUserSuccess = (user) => ({ type: ADD_USER_SUCCESS, payload: user });
export const addUserFailure = (error) => ({ type: ADD_USER_FAILURE, payload: error });

export const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
export const deleteUserSuccess = (userId) => ({ type: DELETE_USER_SUCCESS, payload: userId });
export const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE, payload: error });

export const editUserRequest = () => ({ type: EDIT_USER_REQUEST });
export const editUserSuccess = (user) => ({ type: EDIT_USER_SUCCESS, payload: user });
export const editUserFailure = (error) => ({ type: EDIT_USER_FAILURE, payload: error });