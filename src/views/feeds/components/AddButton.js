import React from 'react';
import {Button} from 'react-bootstrap';

const AddButton = () => {
    const button = { variant: 'primary', icon: 'fa fa-plus', title: 'Agregar Fuente de Informacion' };

    return (
        <React.Fragment>
            <Button className="text-capitalize" variant={'outline-' + button.variant} title={button.title} href="./feeds/new">
                <i className={button.icon} />
                Agregar Fuente de Informacion
            </Button>
        </React.Fragment>
    );
};

export default AddButton;