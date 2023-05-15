import React,{useState,useEffect} from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import FormTemplate from './components/FormTemplate'
import Navigation from '../../components/Navigation/Navigation'
import { postTemplate} from "../../api/services/templates";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllPriorities } from "../../api/services/priorities";
import { getAllStates } from "../../api/services/states";
import Alert from '../../components/Alert/Alert';

const CreateTemplate = () => {
  const formEmpty={ 
    cidr: "",
    domain: "",
    active: false,
    priority: "-1",
    event_taxonomy: "-1",
    event_feed: "-1",
    case_lifecycle: "-1",
    case_tlp: "-1",
    case_state: "-1"

  }
  const [body, setBody] = useState(formEmpty)
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
          console.log(response)
          setTaxonomy(response)
        })
        .catch((error) => {
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getAllFeeds().then((response) => { //se hardcodea las paginas
          setFeeds(response)
        })
        .catch((error) => {
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getAllPriorities().then((response) => { //se hardcodea las paginas
          setPriorities(response)
        })
        .catch((error) => {
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getAllStates().then((response) => { 
          setStates(response)
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

  const createTemplate=()=>{
    console.log(body)
    postTemplate(body.cidr,body.domain,body.active,body.priority,body.event_taxonomy,body.event_feed,body.case_lifecycle,body.case_tlp,body.case_state)
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
        <Navigation actualPosition="Agregar Plantilla" path="/templates" index ="Plantillas"/>
      </Row>
      
      <FormTemplate body={body} setBody={setBody} createTemplate={createTemplate} tlp={TLP} feeds={feeds} taxonomy={taxonomy} priorities={priorities} states={states}/>
          
        
    </React.Fragment>
  )
}

export default CreateTemplate