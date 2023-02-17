import React, { useState, useEffect, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';

import { store } from '../../store';
import { CLEAR_MESSAGE } from '../../store/actions';

const Alert = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');

   
    const textMessage = store.getState().message.text;
    const typeAlert = store.getState().message.typeMessage;
 
    useEffect(() => {
        
        if (textMessage  !== '') {
            setText(textMessage);
            setType(typeAlert);
            setShow(true); 
            switch (typeAlert) {
                case "error":   
                    setColor('#ff0000');
                    break;
                case "success": 
                    setColor('#198754');
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

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'initial'}}> 
            <Toast style={{ position: 'fixed', zIndex:9999, backgroundColor: '#DEEDDD'}} onClose={() => resetAlert()} show={show} delay={4000} autohide >
                <Toast.Header>   
                    <h6 className="mr-auto mt-2" style={{color:`${color}`, fontWeight: 'bold'}}> 
                        <i className={type==='success' ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle mx-1'}  />
                        {type}  
                    </h6>
                </Toast.Header>
                <Toast.Body className="mr-auto" style={{color:'#000000', backgroundColor: '#DEEDDD', opacity: '1'}}>          
                    {text}
                </Toast.Body>
            </Toast>
        </div>      

    );
 
}

export default Alert;
