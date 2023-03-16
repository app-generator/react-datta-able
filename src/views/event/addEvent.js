import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/formEvent'
import Navigation from '../../components/navigation/navigation'
import { postEvent} from "../../api/services/events";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomy";
import { getFeeds } from "../../api/services/feeds";


const AddEvent = () => {
  const formEmpty={
    evidence: null,
    children: [], 
    todos: [],
    artifacts: [], 
    comments: null, 
    cidr: null,
    domain: "",
    date: null,
    evidence_file_path: "",
    notes: "",
    parent: null,
    priority: null,
    tlp: null,
    taxonomy: null,
    feed: null,
    reporter: null,
    case: null,
    tasks:[]
  }

  const [body, setBody] = useState(formEmpty)
  const [alert, setAlert] = useState(null)
  const [stateAlert, setStateAlert] = useState(null)
  const [error,setError]=useState()
  const [TLP, setTLP] = useState([])
  const [feeds, setFeeds] = useState([])
  const [taxonomy, setTaxonomy] = useState([])
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
        
    }  
    fetchPosts()
    
  },[]);

  const createEvent=()=>{
    console.log(body)
    postEvent(body)
    .then((response) => { 
        sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
        window.location.href = "/list-events"
    }).catch((error) => {
        setError(error)
        setAlert({name:`El usuario ${body.username} NO ha sido creada`, type:0})
        setTimeout(() => {
            setAlert(null)
            setStateAlert(null)
        }, 3000);
    }); 
}

  return (
    <div>
          <Navigation actualPosition="Agregar " path="./list-Event" index ="Evento"/>
          <Card>
              <Card.Header>
                  <Card.Title as="h5">Agregar Evento</Card.Title>
              </Card.Header>
              <FormEvent createEvent={createEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP}/>
          </Card>
    </div>
  )
}

export default AddEvent