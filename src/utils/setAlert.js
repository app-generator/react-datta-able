import { store } from '../store';
import { SET_MESSAGE } from '../store/actions';

const setAlert = (text, type) => {

const { dispatch } = store;

    dispatch({
        type: SET_MESSAGE,
        payload: { text: text, typeMessage: type }
    });

};

export default setAlert;
