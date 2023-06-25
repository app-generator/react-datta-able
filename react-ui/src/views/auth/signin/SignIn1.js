import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import RestLogin from './RestLogin';

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
                            <h4 className="mb-4">React Datta Able</h4>

                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>

                            <RestLogin />

                            <p className="mb-0 text-muted">
                                Don’t have an account?{' '}
                                <NavLink to="/auth/signup" className="f-w-400">
                                    Sign UP
                                </NavLink>
                            </p>

                            <br />

                            <p className="mb-0 text-muted">
                                &copy;{' '}
                                <a target="_blank" href="https://codedthemes.com/" rel="noreferrer">
                                    CodedThemes
                                </a>
                                -{' '}
                                <a target="_blank" href="https://appseed.us" rel="noreferrer">
                                    AppSeed
                                </a>
                                .
                            </p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin1;
