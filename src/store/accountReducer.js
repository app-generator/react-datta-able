// action - state management
import { LOGIN, LOGOUT, REFRESH_TOKEN } from './actions';

export const initialState = {
    token: '',
    isLoggedIn: false,
    user: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            const { user, token } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user: user,
                token: token
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
