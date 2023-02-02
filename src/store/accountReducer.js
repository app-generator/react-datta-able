// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL, REFRESH_TOKEN } from './actions';

export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                user: null
            };
        }
        case LOGIN_SUCCESS: {
            const { user, token } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user: user,
                token: token
            };
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: ''
            };
        }
        case REFRESH_TOKEN: {
            const { token } = action.payload;
            return {
                ...state,
                token: token
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
