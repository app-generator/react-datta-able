import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/FormEvent'
import Navigation from '../../components/Navigation/Navigation'
import { postEvent} from "../../api/services/events";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomy";
import { getFeeds } from "../../api/services/feeds";
import { getPriorities } from "../../api/services/priorities";
import { getUsers } from "../../api/services/users";
import { getArtefacts } from "../../api/services/artifact";


const CreateEvent = () => {
  const formEmpty={
    evidence: null,
    children: [], 
    todos: [],
    artifacts: [], 
    comments: null, 
    cidr: null,
    domain: ".com", //cuidado con cargar "" , si o si tiene que ser requerido me lo pide por que no tine un atributo filter
    date: "",
    evidence_file_path: null, //cuidado con cargar ""
    notes: null, //cuidado con cargar ""
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
  const [priorities, setPriorities] = useState([])
  const [users, setUsers] = useState([])
  const [listArtifact, setListArtifact] = useState([])
  const [loading, setLoading] = useState(true)
  const [contactCreated, setContactsCreated ] = useState(null);
  

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

        getUsers().then((response) => { //se hardcodea las paginas
          console.log(response.data.results)
          setUsers(response.data.results)
        })
        .catch((error) => {
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getArtefacts().then((response) => { //se hardcodea las paginas
          

        })
        .catch((error) => {
            setError(error)
            
        })

        getArtefacts()
        .then((response) => {
          var list= []
          response.data.results.map((artifact)=>{
            list.push({value:artifact.url, label:artifact.value})
          })
          setListArtifact(list)
        })
        .catch((error)=>{
            setError(error)
        }) 
        
    }  
    fetchPosts()
    
  },[contactCreated]);

  const createEvent=()=>{
    console.log(body)
    postEvent(body.evidence, body.children, body.todos, body.artifacts, body.comments, body.cidr, 
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
          <Navigation actualPosition="Agregar " path="./list-Event" index ="Evento"/>
          <Card>
              <Card.Header>
                  <Card.Title as="h5">Agregar Evento</Card.Title>
              </Card.Header>
              <FormEvent createEvent={createEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP} priorities={priorities} users={users} listArtifact={listArtifact} setContactsCreated={setContactsCreated}/>
          </Card>
    </div>
  )
}

export default CreateEvent