import React,{useState, useEffect} from 'react'
import { Row, Card, Form, Button,Col } from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Search from '../../../components/Search/Search'
import {Link} from 'react-router-dom'
import CrudButton from '../../../components/Button/CrudButton';
import { getArtefacts} from "../../../api/services/artifact";
//import TableArtifact from './artifact/tableArtifact';

const animatedComponents = makeAnimated();

const FormEvent = ({createEvent, setBody, body, feeds, taxonomy, tlp}) => {
    const [loading, setLoading] = useState(true)
    const [cantPages, setCantPages] = useState()
    const [pages, setPages] = useState([])
    const [artefacts, setArtefacts] = useState([])
    const [error, setError] = useState()

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
    
            getArtefacts()
            .then((response) => {
                setArtefacts(response.data.results)
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


    const completeField=(event)=>{ 
        setBody({...body,
            [event.target.name] : event.target.value}
        )       
    }
    
  return (
    <div>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Principal</Card.Title>
            </Card.Header>
        
        
            <Card.Body>
                <Form>
                    <th></th>
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label>Fecha </Form.Label>
                    <Form.Control 
                        type ="date"
                        placeholder="Ingrese" 
                        maxlength="150" 
                        name="name"/>
                    </Form.Group>

                   
                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>TLP</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="TLP" 
                    value ={body.tlp} 
                    onChange={(e)=>completeField(e)} isInvalid={body.tlp === "-1"}
                    isValid={body.priority !== "-1"}>
                    <option value="-1">Seleccione un tlp</option>
                    {tlp.map((tlp, index) => {
                        return(<option value={tlp.url}> {tlp.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.tlp !== "-1") ? '' : <div className="invalid-feedback">Seleccione una prioridad</div>}
                </Form.Group>
                    

                <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Taxonomia</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="taxonomy" 
                    value ={body.taxonomy} 
                    onChange={(e)=>completeField(e)} isInvalid={body.taxonomy === "-1"}
                    isValid={body.taxonomy !== "-1"}>
                    <option value="-1">Seleccione una taxonomia</option>
                    {taxonomy.map((taxonomy, index) => {
                        return(<option value={taxonomy.url}> {taxonomy.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.taxonomy !== "-1") ? '' : <div className="invalid-feedback">Seleccione una taxonomia</div>}
                
                </Form.Group>

                  
                    <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Fuente de Informacion</Form.Label>
                <Form.Control  
                    type="choice"
                    as="select" 
                    name="feed" 
                    value ={body.feed} 
                    onChange={(e)=>completeField(e)} isInvalid={body.feed === "-1"}
                    isValid={body.feed !== "-1"}>
                    <option value="-1">Seleccione una Fuente de Informacion</option>
                    {feeds.map((feed, index) => {
                        return(<option value={feed.url}> {feed.name} </option>)
                    })}
                 
                </Form.Control>
                {(body.feed !== "-1") ? '' : <div className="invalid-feedback">Seleccione una Fuente de Informacion</div>}
                </Form.Group>

                <Form.Group controlId="formGridAddress1">

                <Form.Label>prioridades</Form.Label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti    
                />
                 </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Indicadores de compromiso</Card.Title>
            </Card.Header>

            <Card.Body>
            {/*<Form>
                <Form.Group controlId="formGridAddress1">

                <Form.Label>artefactos (???, que seria?</Form.Label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti    
                />
                </Form.Group>
                </Form>*/}
                <Card.Header>
          
                <Row>
                    <Search type="Artefactos" action="" />
                    <Link to="" >
                        <CrudButton type='create' name='Evento' /> 
                    </Link>
                </Row>                                 
                </Card.Header>
                {/*<TableArtifact />*/}
            </Card.Body>
        </Card>
        informacion adicional    

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Cidr afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>  

                <Form.Group controlId="formGridAddress1">
                <Form.Label>Dominio afectado</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
                </Form.Group> 
                ----------------------------------------------------------
        informacion adicional
        <Form.Group controlId="formGridAddress1">
                <Form.Label>notas</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
                </Form.Group> 
        <Card>
            <Card.Header>
                <Card.Title as="h5">Evidencia</Card.Title>
            </Card.Header>
        <Card.Body>
            <Form>

                
                <Form.Group controlId="formGridAddress1">
                <Form.Label>Evidencia</Form.Label>
                <Form.Control 
                    placeholder="Ingrese " 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>   

                
                 

                
                 

                <Form.Group controlId="formGridAddress1">
                <Form.Label>ruta del archivo de evidencia</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>

                

                {/*<Form.Group controlId="formGridAddress1">
                <Form.Label>Padres ¿que deveria ingresar aca?</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
                </Form.Group>*/}
                 
                
                 

                 {/*<Form.Group controlId="formGridAddress1">
                <Form.Label>reportante</Form.Label>
                <Form.Control 
                    placeholder="Ingrese" 
                    maxlength="150" 
                    name="name"/>
            </Form.Group>*/}

              

            <Button variant="primary" onClick={createEvent} >Guardar</Button> 
            <Button variant="primary" href="./list-event">Cancelar</Button>  
                 
            </Form>
        </Card.Body>
        </Card>
    </div>
  )
}
export default FormEvent