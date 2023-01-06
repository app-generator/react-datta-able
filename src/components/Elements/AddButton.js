import React from 'react';
import {Button} from 'react-bootstrap';

const AddButton = ({name, link}) => {
    const button = { variant: 'primary', icon: 'fa fa-plus', title: name, link: link };

    return (
        <React.Fragment>
            <Button className="text-capitalize" variant={'outline-' + button.variant} title={button.title} href={button.link}>
                <i className={button.icon} />
                {button.title}
            </Button>
        </React.Fragment>
    );
};

export default AddButton;
