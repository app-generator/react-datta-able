import React, { useState, useEffect, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';

import { store } from '../../store';
import { CLEAR_MESSAGE } from '../../store/actions';

const Alert = ({ showAlert , resetShowAlert, delay = 5000}) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
 
    const textMessage = store.getState().message.text;
    const typeAlert = store.getState().message.typeMessage;
 
    useEffect(() => {
        if (showAlert === true && textMessage  !== '') {
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
        resetShowAlert();

    }
  
    return( 

        <div style={{ display: 'flex', position:'fixed', top: '2%', right: '0', left: '0', justifyContent: 'center', alignContent:'center' , zIndex:99999 }}> 
            <Toast style={{flexBasis: '30%', maxWidth: '30%', zIndex:99999 , backgroundColor:`${backgroundColor}`}} onClose={() => resetAlert()} show={show} delay={delay} autohide >
                <Toast.Header>   
                    <h6 className="mr-auto mt-2" style={{color: '#5e5e5e'}}> 
                        <i className={type==='success' ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle mx-1'} style={{color: backgroundColor}}/>
                        {text}  
                    </h6>
                </Toast.Header>
            </Toast>
       </div>      

    );
 

}

export default Alert;
