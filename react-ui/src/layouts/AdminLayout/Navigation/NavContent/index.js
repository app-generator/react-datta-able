import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import NavGroup from './NavGroup';

const NavContent = ({ navigation }) => {
    const navItems = navigation.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup layout="vertical" key={'nav-group-' + item.id} group={item} />;
            default:
                return false;
        }
    });

    let mainContent = '';
    mainContent = (
        <div className="navbar-content datta-scroll">
            <PerfectScrollbar>
                <ListGroup variant="flush" as="ul" bsPrefix=" " className="nav pcoded-inner-navbar" id="nav-ps-next">
                    {navItems}
                </ListGroup>
            </PerfectScrollbar>
        </div>
    );

    return <React.Fragment>{mainContent}</React.Fragment>;
};

export default NavContent;
