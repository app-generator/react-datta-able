import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

const store = configureStore({
    reducer: reducers,
    devTools: true
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

const persister = persistStore(store);

export { store, persister };
