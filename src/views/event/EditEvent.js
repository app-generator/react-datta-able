import React, { useState, useEffect } from 'react'
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/FormEvent'
import Navigation from '../../components/Navigation/Navigation'
import { putEvent} from "../../api/services/events";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomy";
import { getFeeds } from "../../api/services/feeds";
import { getPriorities } from "../../api/services/priorities";

const EditEvent = () => {
    const location = useLocation();
    const event = location.state.event;
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [body,setBody]=useState(event)
    const [TLP, setTLP] = useState([])
  const [feeds, setFeeds] = useState([])
  const [taxonomy, setTaxonomy] = useState([])
  const [priorities, setPriorities] = useState([])
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
        
    }  
    fetchPosts()
    
  },[]);

    const createEvent=()=>{
        console.log(body)
        putEvent(body.url, body.evidence, body.children, body.todos, body.artifacts, body.comments, body.cidr, 
          body.domain, body.date, body.evidence_file_path, body.notes, body.parent, body.priority, body.tlp, 
          body.taxonomy, body.feed, body.reporter, body.case, body.tasks)
        .then((response) => { 
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
            window.location.href = "/list-event"
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
        <Navigation actualPosition="Editar Evento " path="./list-Event" index ="Evento"/>
          <Card>
              <Card.Header>
                  <Card.Title as="h5">Editar Evento</Card.Title>
              </Card.Header>
              <FormEvent createEvent={createEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP} priorities={priorities}/>
          </Card>
        
    </div>
  )
}

export default EditEvent