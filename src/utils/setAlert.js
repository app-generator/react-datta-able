import { store } from '../store';
import { SET_MESSAGE } from '../store/actions';

const setAlert = (text, type, component) => {

const { dispatch } = store;

    dispatch({
        type: SET_MESSAGE,
        payload: { 
            text: text, typeMessage: type, typeComponent: component }
    });

};

export default setAlert;
