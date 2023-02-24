import React, { useState, useEffect, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';

import { store } from '../../store';
import { CLEAR_MESSAGE } from '../../store/actions';

const Alert = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
 
    const textMessage = store.getState().message.text;
    const typeAlert = store.getState().message.typeMessage;
 
    useEffect(() => {
        
        if (textMessage  !== '') {
            setText(textMessage);
            setType(typeAlert);
            setShow(true); 
            switch (typeAlert) {
                case "error":   
                    setBackgroundColor('red')
                    break;
                case "success": 
                    setBackgroundColor('green');
                    break;
            }
        }
    });

    const resetAlert = () => {
                
        const { dispatch } = store;

        dispatch({
            type: CLEAR_MESSAGE
        });

        setShow(false);

    }
  
    return( 

        <div className="mt-2" style={{ display: 'flex', justifyContent: 'center', alignContent:'center'  }}> 
            <Toast style={{ position: 'fixed', zIndex:99999 , backgroundColor:`${backgroundColor}`}} onClose={() => resetAlert()} show={show} delay={5000} autohide >
                <Toast.Header>   
                    <h6 className="mr-auto mt-2" > 
                        <i className={type==='success' ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle mx-1'} />
                        {text}  
                    </h6>
                </Toast.Header>
            </Toast>
       </div>      

    );
 

}

export default Alert;
