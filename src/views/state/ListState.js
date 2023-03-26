import React, { useState, useEffect } from 'react';
import { getStates} from "../../api/services/states";
import { Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Pagination from '../../components/Pagination/Pagination'
import Alert from '../../components/Alert/Alert';
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../components/Search/Search'
import CrudButton from '../../components/Button/CrudButton';
import TableStates from './components/TableStates'

const ListState = () => {
    const [loading, setLoading] = useState(true)
    const [states, setStates] = useState([])
    const [error, setError] = useState()
    const [cantPages, setCantPages] = useState()
    const [pages, setPages] = useState([])
    const [stateAlert, setStateAlert] = useState(null)
    const [alert, setAlert] = useState(null)


    useEffect(() => {

        function arrayWithPages(numberOfItems,numberOfElementsOnAPage ) {

            const numberOfPages= Math.ceil(numberOfItems / numberOfElementsOnAPage)
            const complementUrl ="?page="
            const arrayLinks=[]

            for (var i = 1; i <= numberOfPages; i++) {
            arrayLinks.push(complementUrl+i)
            }

            setCantPages(arrayLinks)
            return numberOfPages
            
        }
        const fetchStates = async () => {
            setLoading(true)
    
            getStates()
            .then((response) => {
                setStates(response.data.results)
                console.log(response.data.results)
                setPages(arrayWithPages(response.data.count,response.data.results.length))
                
            }).catch((error)=>{
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    
        }
    
        fetchStates()
        }, [])

        const callbackBackend = (name, stateAlert) => {
            if(stateAlert) {
                getStates()
                .then((response) => {
                    setStates(response.data.results)
                })
                .catch((error) => {
                    setError(error)
                })
                .finally(() => {
                    setLoading(false)
                    setAlert({name:name, type:1})
                    setTimeout(() => {
                        setAlert(null)
                        setStateAlert(null)
                    }, 5000);
                })
            }
            else {
                setAlert({name:name, type:0})
            }
          }
    console.log(states)
    const action = () => {
        console.log("llamada backend")
      }
  return (
    <div>
      
      <Navigation actualPosition="Estados"/>
      <Card>
        <Card.Header>
          <Row>
              <Search type="Estado" action={action} />

              <Col sm={12} lg={3}>
                <Link to={{pathname:'/add-state', state:states}} >
                    <CrudButton type='create' name='estado' />
                </Link>
          
              </Col> 
          </Row>                                 
          </Card.Header>
          <TableStates states={states} callback={callbackBackend} loading={loading} /> 
      </Card>
  </div>
  )
}

export default ListState