import React from 'react';
import {Button} from 'react-bootstrap';

const EditButton = ({link}) => {
    const button = { variant: 'warning', icon: 'fa fa-edit', title: 'Editar', link: link };

    return (
        <React.Fragment>
            <Button className='btn-icon btn-rounded' variant={'outline-' + button.variant} title={button.title} href={button.link}>
                <i className={'ml-1 ' + button.icon} />
            </Button>
        </React.Fragment>
    );
};

export default EditButton;