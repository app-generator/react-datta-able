import React from 'react';
import {Button} from 'react-bootstrap';

//prop href

const AddButton = () => {
    const button = { variant: 'primary', icon: 'fa fa-plus', title: 'Agregar Contacto' };

    return (
        <React.Fragment>
            <Button className="text-capitalize" variant={'outline-' + button.variant} title={button.title} href="/contact/create">
                <i className={button.icon} />
                {button.title}
            </Button>
        </React.Fragment>
    );
};

export default AddButton;