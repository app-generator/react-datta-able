import React from 'react';
import { 
     Breadcrumb } from 'react-bootstrap';



const Navigation = ({actualPosition, path=false, index =""}) => {
  return (
    <React.Fragment>
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="feather icon-home" />
                </Breadcrumb.Item>
                {path ? <Breadcrumb.Item href={path}>
                        <i className="fas fa-network-wired" /> {index}
                    </Breadcrumb.Item>:""}
                <Breadcrumb.Item active>
                    <b>{actualPosition}</b>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
                    
    </React.Fragment>
  )
}

export default Navigation