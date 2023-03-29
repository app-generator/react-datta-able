import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap';
import FormTemplate from './components/FormTemplate'
import Navigation from '../../components/Navigation/Navigation'
import { postTemplate} from "../../api/services/templates";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getFeeds } from "../../api/services/feeds";
import { getPriorities } from "../../api/services/priorities";
import { getStates } from "../../api/services/states";

const CreateTemplate = () => {
  const formEmpty={ 
    cidr: null,
    domain: "",
    active: false,
    priority: null,
    event_taxonomy: null,
    event_feed: null,
    case_lifecycle: null,
    case_tlp: null,
    case_state: null

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

  const createTemplate=()=>{
    console.log(body)
    postTemplate(body.cidr,body.domain,body.active,body.priority,body.event_taxonomy,body.event_feed,body.case_lifecycle,body.case_tlp,body.case_state)
    .then((response) => { 
        sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
        window.location.href = "/list-template"
    }).catch((error) => {
        setError(error)
        
        setTimeout(() => {
            setAlert(null)
            setStateAlert(null)
        }, 3000);
    }); 
  }
  return (
    <React.Fragment>
      <Navigation actualPosition="Agregar Plantilla" path="./list-template" index ="Plantillas"/>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Agregar Plantilla</Card.Title>
            </Card.Header>
            <FormTemplate body={body} setBody={setBody} createTemplate={createTemplate} tlp={TLP} feeds={feeds} taxonomy={taxonomy} priorities={priorities} states={states}/>
      </Card>
    </React.Fragment>
  )
}

export default CreateTemplate