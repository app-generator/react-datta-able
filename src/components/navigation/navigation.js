import React from 'react';
import { 
     Breadcrumb, Row } from 'react-bootstrap';



const Navigation = ({actualPosition, path=false, index =""}) => {
  return (
    <React.Fragment>
        <Row>
            <Breadcrumb>
                <Breadcrumb.Item href="./app/dashboard/default">
                    <i className="fas fa-home" />
                </Breadcrumb.Item>
                {path ? <Breadcrumb.Item href={path}>
                         {index}
                    </Breadcrumb.Item>:""}
                <Breadcrumb.Item active>
                    <b>{actualPosition}</b>
                </Breadcrumb.Item>
            </Breadcrumb>
        </Row>
                    
    </React.Fragment>
  )
}

export default Navigation