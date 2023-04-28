import React from 'react';
import {Button} from 'react-bootstrap';
// type: {create, read, update, delete} 
const CrudButton = ({type, name, onClick}) => {

    const button = {
        create: 
        { 
            class: 'text-capitalize',
            variant: 'outline-primary', 
            title: `Agregar ${name}`,
            icon: 'fa fa-plus',
            text: `Agregar ${name}`,
        },
        read: 
        { 
            class: 'btn-icon btn-rounded',
            variant: 'outline-primary', 
            title: 'Detalle',
            icon: 'fa fa-eye mx-auto',
            text: '',
        },
        edit: 
        { 
            class: 'btn-icon btn-rounded',
            variant: 'outline-warning', 
            title: 'Editar',
            icon: 'fa fa-edit',
            text: '',
        },
        delete: 
        { 
            class: 'btn-icon btn-rounded',
            variant: 'outline-danger', 
            title: 'Eliminar',
            icon: 'fas fa-trash-alt',
            text: '',
        }
    }
    return (
        <React.Fragment>
            <Button 
                className={button[type].class} 
                variant={button[type].variant} 
                title={button[type].title}
                onClick={onClick}>
                    <i className={button[type].icon} />
                {button[type].text}
            </Button>
        </React.Fragment>
    );
};

export default CrudButton;

            <Button 
                className='btn-icon btn-rounded' 
                variant='outline-danger'
                title='Editar'>
                    <i className='fa fa-edit' />
            </Button>