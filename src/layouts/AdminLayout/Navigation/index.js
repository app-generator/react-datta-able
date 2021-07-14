import React, { useContext } from 'react';

import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';

import NavLogo from './NavLogo';
import NavContent from './NavContent';
import navigation from '../../../menu-items';

const Navigation = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const windowSize = useWindowSize();

    let navClass = [
        'pcoded-navbar',
        'menupos-static',
        'menu-dark',
        'navbar-default',
        'brand-default',
        'drp-icon-style1',
        'menu-item-icon-style1',
        'active-default',
        'title-default'
    ];

    if (windowSize.width < 992 && collapseMenu) {
        navClass = [...navClass, 'mob-open'];
    } else if (collapseMenu) {
        navClass = [...navClass, 'navbar-collapsed'];
    }

    let navStyle;

    let navBarClass = ['navbar-wrapper'];

    let navContent = (
        <div className={navBarClass.join(' ')}>
            <NavLogo />
            <NavContent navigation={navigation.items} />
        </div>
    );
    if (windowSize.width < 992) {
        navContent = (
            <div className="navbar-wrapper">
                <NavLogo />
                <NavContent navigation={navigation.items} />
            </div>
        );
    }
    return (
        <React.Fragment>
            <nav className={navClass.join(' ')} style={navStyle}>
                {navContent}
            </nav>
        </React.Fragment>
    );
};

export default Navigation;
