import React from 'react';
import {Badge} from 'react-bootstrap';

const BadgeItem = ({item}) => {

return (
        item && 
        <React.Fragment>
                <Badge className="badge mr-1" 
                style={{background: `${item.color}`, color: '#111111'}}>{item.name}</Badge> 
        </React.Fragment>
    );
};

export default BadgeItem; 
