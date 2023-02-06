import React from 'react';
import {Button} from 'react-bootstrap';

const StateButton = () => {
    const state = { variant: 'success', icon: 'feather icon-check-circle', title: 'Detalle' };

    return (
        <React.Fragment>
            <Button className="btn-icon btn-rounded" variant={'outline-' + state.variant} title={state.title}>
                <i className={state.icon}/>
            </Button>
        </React.Fragment>
    );
};

export default StateButton;
