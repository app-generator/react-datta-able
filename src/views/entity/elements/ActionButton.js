import React from 'react';
import {Button} from 'react-bootstrap';

const ActionButton = () => {
    const buttonOnlyIconOptions = [
        { variant: 'primary', icon: 'fas fa-eye', title: 'Detalle', url:'show' },
        { variant: 'warning', icon: 'far fa-edit', title: 'Editar', url:'edit' },
        { variant: 'danger', icon: 'fas fa-trash-alt', title: 'Eliminar', url:'delete' },
    ];

    const onlyOutlineIconRoundedButtons = buttonOnlyIconOptions.map((button, idx) => (
        <Button className="btn-icon btn-rounded" key={idx} variant={'outline-' + button.variant} title={button.title} href={'/entity/' + button.url}>
            <i className={button.icon}/>
        </Button>
    ));
    return (
        <React.Fragment>{onlyOutlineIconRoundedButtons}</React.Fragment>
    );
};

export default ActionButton;
