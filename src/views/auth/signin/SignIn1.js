import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import RestLogin from './RestLogin';

import Alert from './../../../components/Alert/Alert';

const Signin1 = () => {
    return (
        <React.Fragment>    
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <Card className="borderless text-center">
                        <Card.Body>
                            <h4 className="mb-4">NGEN</h4>

                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>

                            <RestLogin />

                            <p className="mb-0 text-muted">
                                No tienes una cuenta?{' '}
                                <NavLink to="/auth/signup" className="f-w-400">
                                    Registrarse
                                </NavLink>
                            </p>

                            <br />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin1;
