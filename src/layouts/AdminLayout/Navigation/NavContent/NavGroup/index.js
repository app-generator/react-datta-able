import React from 'react';
import { ListGroup } from 'react-bootstrap';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

const NavGroup = ({ layout, group }) => {
    let navItems = '';
    let groupHeader = '';

    if (group.children) {
        const groups = group.children;
        navItems = Object.keys(groups).map((item) => {
            item = groups[item];
            switch (item.type) {
                case 'collapse':
                    return <NavCollapse key={item.id} collapse={item} type="main" />;
                case 'item':
                    return <NavItem layout={layout} key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }

    if (group.title !== '') {
        groupHeader = (
            <ListGroup.Item as="li" bsPrefix=" " key={group.id} className="nav-item pcoded-menu-caption">
                <label>{group.title}</label>
            </ListGroup.Item>
        );
    }

    return (
        <React.Fragment>
            {groupHeader}
            {navItems}
        </React.Fragment>
    );
};

export default NavGroup;
