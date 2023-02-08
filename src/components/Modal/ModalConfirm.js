import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const ModalConfirm = (props) => { // showModal, onHide, ifConfirm, type, component, state, name
    const type = {
        edit: 
        { 
            header: `${props.component ? `${props.component}` : 'Estado'}`,
            message: `${props.state ? `Desea desactivar ${props.name}?` : `Desea activar ${props.name}?`}`,
        },
        delete: 
        { 
            header: `${props.component ? `Eliminar ${props.component}` : 'Eliminar'}`,
            message: `${`¿Desea eliminar ${props.name}?`}`,
        }
    }


    //type, name, state
    return (
        <React.Fragment>
            <Modal show={props.showModal} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{type[props.type].header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type[props.type].message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={props.ifConfirm}>Confirmar</Button>
                    <Button variant="outline-secondary" onClick={props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default ModalConfirm;