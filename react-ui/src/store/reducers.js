import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        accountReducer
    ),
    form: formReducer
});

export default reducers;
