import React, { useState, useEffect, useRef } from 'react';
import Toast from 'react-bootstrap/Toast';

import { store } from '../../store';
import { CLEAR_MESSAGE } from '../../store/actions';
import { Form, ToastHeader } from 'react-bootstrap';


const Alert = ({ showAlert , resetShowAlert}) => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [type, setType] = useState('');
 
    const textMessage = store.getState().message.text;
    const typeAlert = store.getState().message.typeMessage;

    useEffect(() => {
        if (showAlert === true && textMessage  !== '') {
            setText(textMessage);
            setType(typeAlert);
            setShow(true); 
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
    
    /*const styles = 
        {
            div: 
            { 
                display: 'flex', 
                position:'fixed', 
                top: '2%', 
                right: '0', 
                left: '0', 
                justifyContent: 'center', 
                alignContent:'center' , 
                zIndex:99999,
                
            },
            toast: 
            {
                flexBasis: '30%', 
                maxWidth: '30%', 
                zIndex:99999 , 
                backgroundColor: backgroundColor
            },
            header: {
                width: '100%',
    
            },
            h6: {
                color: '#5e5e5e'
            }, 
            i: 
            {
                color: backgroundColor
            },
            otro: 
            {
                width: '100%',
                borderRadius: 70,
                margin: '10%',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                color: '#fff',
            }
        }*/

    return( 
        <div id="toastAlert">
            <Toast id={type==='success' ? 'alertStyleGreen' : 'alertStyleRed'} onClose={() => resetAlert()} show={show} >
                    <i id="alertStyle__icon" className={type==='success' ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle mx-1'} />
                    <tr id="alertStyle__text" plaintext readOnly>{text}</tr>                    
                    <i id="alertStyle__close" class="material-icons" title="Cerrar" onClick={() => resetAlert()}>close</i>
            </Toast>
        </div>
    );
 }

export default Alert;
/*
    return( 

        <div  style={styles.div}> 
            <Toast id="alertStyle" style={styles.toast} onClose={() => resetAlert()} show={show} delay={50000000} autohide >
                <Toast.Header>   
                    <h6 className="mr-auto mt-2" style={styles.h6}> 
                        <i className={type==='success' ? 'feather icon-check-circle mx-1' : 'feather icon-alert-triangle mx-1'} style={styles.i}/>
                        {text}  
                    </h6>
                </Toast.Header>
            </Toast>
       </div>      

    );
 }

export default Alert;
*/