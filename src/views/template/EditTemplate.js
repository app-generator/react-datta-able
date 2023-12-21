import React, { useState, useEffect} from 'react'
import { Row } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import FormTemplate from './components/FormTemplate'
import Navigation from '../../components/Navigation/Navigation'
import { putTemplate} from "../../api/services/templates";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllPriorities } from "../../api/services/priorities";
import { getStates } from "../../api/services/states";

const EditTemplate = () => {
    const location = useLocation();
    const fromState = location.state;
    const [template, setTemplate] = useState(fromState);
    const [body,setBody]=useState(template);
    const [error,setError]=useState()
    const [TLP, setTLP] = useState([])
    const [feeds, setFeeds] = useState([])
    const [taxonomy, setTaxonomy] = useState([])
    const [priorities, setPriorities] = useState([])
    const [states, setStates] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    useEffect( ()=> {
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
              console.log(response)
              setTaxonomy(response)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getAllFeeds().then((response) => { //se hardcodea las paginas
              console.log(response)
              setFeeds(response)
            })
            .catch((error) => {
                setError(error)
                
            }).finally(() => {
                setLoading(false)
            })
    
            getAllPriorities().then((response) => { //se hardcodea las paginas
              console.log(response)
              setPriorities(response)
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

        
        
      },[]);

      const resetShowAlert = () => {
        setShowAlert(false);
      }

    const editState= ()=>{
        putTemplate(body.url,body.address_value,body.active,body.priority,body.event_taxonomy,body.event_feed,body.case_lifecycle,body.case_tlp,body.case_state)
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