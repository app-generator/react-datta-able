import React from 'react'
import {Link} from 'react-router-dom'
import {
    Card, Table 
 } from 'react-bootstrap';
 import CrudButton from '../../../../components/Button/CrudButton';
 import CallBackendByName from '../../../../components/CallBackendByName'; 
import { getTaxonomy } from '../../../../api/services/taxonomies';
import { getTLPSpecific } from '../../../../api/services/tlp';
import { getFeed } from '../../../../api/services/feeds';

const DashboardEvent = ({list}) => {

    const callbackTaxonomy = (url ,setPriority) => {
        getTaxonomy(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }
    const callbackTlp = (url ,setPriority) => {
        getTLPSpecific(url)
        .then((response) => {
          
            setPriority(response.data)
        })
        .catch();
    }
    const callbackFeed = (url ,setPriority) => {
        getFeed(url)
        .then((response) => {
         
            setPriority(response.data)
        })
        .catch();
    }
  return (
    <div>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Panel de eventos</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
                <ul className="list-group my-4">
                    <Table responsive hover className="text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Fuente de Informacion</th>
                                <th>Taxonomia</th>
                                <th>Red</th>
                                
                                
                                <th>Opciones</th>
                            </tr>
                    </thead>
                        <tbody>
                        {list.map((event, index) => {
                            return (
                                <tr>
                                    
                                    <td>{index +1 }</td>

                                    <td>{event.date ? event.date.slice(0,10)+" "+event.date.slice(11,19): ""}</td>

                                    <td><CallBackendByName url={event.feed} callback={callbackFeed} useBadge={false}/></td>

                                    <td><CallBackendByName url={event.taxonomy} callback={callbackTaxonomy} useBadge={false}/></td>
                                    
                                    <td>{event.address_value}</td>
                                    
                                    <td>
                                    <Link to={{pathname:"/events/view", state: event}} >
                                        <CrudButton  type='read'   />
                                    </Link>
                                    
                                    </td>
                                    
                                </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </ul>
            </Card.Body>
        </Card>
    </div>
  )
}

export default DashboardEvent