import { SET_MESSAGE, CLEAR_MESSAGE } from './actions';

const initialState = {
  text: '',
  typeMessage: '',
  typeComponent: ''
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE: {
      const { text, typeMessage, typeComponent } = payload;
      return { ...state,
                  text: text, 
                  typeMessage: typeMessage,
                  typeComponent: typeComponent
      };
    }
    case CLEAR_MESSAGE: {
      return { ...state, 
                  text: '', 
                  typeMessage: '',
                  typeComponent: '' 
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
