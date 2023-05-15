import React, { useState, useEffect} from 'react'
import { Card, Form, Breadcrumb, Row, Col } from 'react-bootstrap';
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
    const fromState = location.state;
    const [template, setTemplate] = useState(fromState);

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
    const [showAlert, setShowAlert] = useState(false)

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
      const resetShowAlert = () => {
        setShowAlert(false);
    }

    const editState= ()=>{
        putTemplate(body.url,body.cidr,body.domain,body.active,body.priority,body.event_taxonomy,body.event_feed,body.case_lifecycle,body.case_tlp,body.case_state)
        .then(() => {
            window.location.href = '/templates';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
        })

    }
  return (
    <React.Fragment>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Row>
         <Navigation actualPosition="Editar Plantilla" path="/templates" index ="Plantilla"/> 
         </Row>
         <FormTemplate body={body} setBody={setBody} createTemplate={editState} tlp={TLP} feeds={feeds} taxonomy={taxonomy} priorities={priorities} states={states}/>                
    </React.Fragment>
  )
}

export default EditTemplate