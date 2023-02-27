import { SET_MESSAGE, CLEAR_MESSAGE } from './actions';

const initialState = {
  text: '',
  typeMessage: ''
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE: {
      const { text, typeMessage } = payload;
      return { ...state,
                  text: text, 
                  typeMessage: typeMessage 
      };
    }
    case CLEAR_MESSAGE: {
      return { ...state, 
                  text: '', 
                  typeMessage: '' 
      };
    }
    default:
      return state;
  }
};

export default messageReducer;
