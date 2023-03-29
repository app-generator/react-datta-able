import React, { useState, useEffect} from 'react'
import { Card, Form, Breadcrumb } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import FormTemplate from './components/FormTemplate'
import Navigation from '../../components/Navigation/Navigation'
import { putTemplate} from "../../api/services/templates";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getFeeds } from "../../api/services/feeds";
import { getPriorities } from "../../api/services/priorities";
import { getStates } from "../../api/services/states";

const EditTemplate = () => {
    const location = useLocation();
    const template = location.state.template;
    console.log(template)
    const[body,setBody]=useState(template);
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [TLP, setTLP] = useState([])
    const [feeds, setFeeds] = useState([])
    const [taxonomy, setTaxonomy] = useState([])
    const [priorities, setPriorities] = useState([])
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect( ()=> {
        const fetchPosts = async () => {
            setLoading(true)
    
            getTLP().then((response) => { 
              console.log(response.data.results)
              setTLP(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getAllTaxonomies().then((response) => { 
              console.log(response.data.results)
              setTaxonomy(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getFeeds(1).then((response) => { //se hardcodea las paginas
              console.log(response.data.results)
              setFeeds(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getPriorities().then((response) => { //se hardcodea las paginas
              console.log(response.data.results)
              setPriorities(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getStates().then((response) => { 
              console.log(response.data.results)
              setStates(response.data.results)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
    
            
    
            
            
        }  
        fetchPosts()
        
      },[]);

    const editState= ()=>{
        putTemplate(body.url,body.cidr,body.domain,body.active,body.priority,body.event_taxonomy,body.event_feed,body.case_lifecycle,body.case_tlp,body.case_state)
        .then((response) => { 
            console.log(response)
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.name} ha sido creada`, type:1}));
            window.location.href = "/list-template"
        }).catch((error) => {
            setError(error)
            console.log(error)
            setAlert({name:`El usuario ${body.name} NO ha sido creada`, type:0})
            setTimeout(() => {
                setAlert(null)
                setStateAlert(null)
            }, 3000);
        }); 

    }
  return (
    <React.Fragment>
         <Navigation actualPosition="Editar Plantilla" path="/list-template" index ="Plantilla"/> 
            <Card>
                <Card.Header>
                    <Card.Title as="h5">Editar Plantilla</Card.Title>
                </Card.Header>
                <Card.Body>
                <Form>
                    <FormTemplate body={body} setBody={setBody} createTemplate={editState} tlp={TLP} feeds={feeds} taxonomy={taxonomy} priorities={priorities} states={states}/>        
                </Form>
                </Card.Body>
            </Card>
    </React.Fragment>
  )
}

export default EditTemplate