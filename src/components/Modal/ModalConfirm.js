import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const ModalConfirm = (props) => { // props: showModal, onHide, ifConfirm, type, component, state, name

    const type = {
        editState: 
        { 
            header: `${props.component ? `Estado de ${props.component}` : 'Estado'}`,
            message: `${props.state ? `Desea desactivar ${props.name}?` : `Desea activar ${props.name}?`}`,
            variantButtonConfirm: `${props.state ? 'outline-danger' : 'outline-primary'}`,
            textButtonConfirm: `${props.state ? 'Desactivar' : 'Activar'}`
        },
        delete: 
        { 
            header: `${props.component ? `Eliminar ${props.component}` : 'Eliminar'}`,
            message: `${`¿Desea eliminar ${props.name}?`}`,
            variantButtonConfirm: 'outline-danger',
            textButtonConfirm: 'Eliminar'
        },
        merge: 
        { 
            header: `${props.component ? `Merge de ${props.component}` : 'Merge'}`,
            //message: `${`¿Desea mergear los casos: ${props.name}?`}`,
            message: `${`¿Desea mergear los casos seleccionados?`}`,
            variantButtonConfirm: 'outline-light',
            textButtonConfirm: 'Aceptar'
        },
    }

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
                    <Button variant={type[props.type].variantButtonConfirm} onClick={props.ifConfirm}>
                        {type[props.type].textButtonConfirm}
                    </Button>

                    <Button variant="outline-secondary" onClick={props.onHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default ModalConfirm;