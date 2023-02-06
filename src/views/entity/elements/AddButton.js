import React from 'react';
import {Button} from 'react-bootstrap';

const AddButton = () => {
    const button = { variant: 'primary', icon: 'fa fa-plus', title: 'Agregar Entidad' };

    return (
        <React.Fragment>
            <Button className="text-capitalize" variant={'outline-' + button.variant} title={button.title} href="/entity/create">
                <i className={button.icon} />
                Agregar Entidad
            </Button>
        </React.Fragment>
    );
};

export default AddButton;
