import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/FormEvent'
import Navigation from '../../components/Navigation/Navigation'
import { postEvent} from "../../api/services/events";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllPriorities } from "../../api/services/priorities";
import { getAllUsers } from "../../api/services/users";
import { getAllArtifacts } from "../../api/services/artifact";
import Alert from '../../components/Alert/Alert';

const CreateEvent = () => {
  const formEmpty={   
    children: [], 
    todos: [],
    artifacts: [], 
    comments: null, // verificar aca si escribo y borro todo, se envia "" lo mismo para notes
    cidr: "",
    domain: "", //cuidado con cargar "" , si o si tiene que ser requerido me lo pide por que no tine un atributo filter
    date: "",
    notes: null, 
    parent: [],
    priority: "-1",
    tlp: "-1",
    taxonomy: "-1",
    feed: "-1",
    reporter: [],
    case: [],
    tasks:[]
  }  
  const [evidence, setEvidence] = useState([])
  const [body, setBody] = useState(formEmpty)
  const [error,setError]=useState()
  const [TLP, setTLP] = useState([])
  const [feeds, setFeeds] = useState([])
  const [taxonomy, setTaxonomy] = useState([])
  const [priorities, setPriorities] = useState([])
  const [users, setUsers] = useState([])
  const [listArtifact, setListArtifact] = useState([])
  const [loading, setLoading] = useState(true)
  const [contactCreated, setContactsCreated ] = useState(null);
  const [showAlert, setShowAlert] = useState(false)

  const resetShowAlert = () => {
    setShowAlert(false);
  }  

  useEffect( ()=> {
    const fetchPosts = async () => {
        setLoading(true)
        getTLP().then((response) => { 
          console.log(response.data.results)
          setTLP(response.data.results)
        })
        .catch((error) => {
            setShowAlert(true) //hace falta?
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getAllTaxonomies().then((response) => { 

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

        getAllUsers().then((response) => { //se hardcodea las paginas
          console.log(response)
          setUsers(response)
        })
        .catch((error) => {
            setError(error)
            
        }).finally(() => {
            setLoading(false)
        })

        getAllArtifacts()
        .then((response) => {
          var list= []
          console.log(response)
          response.map((artifact)=>{
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
    
    const formDataEvent = new FormData();

    //console.log(fecha.toISOString())//YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]

    formDataEvent.append("date", body.date)// tengo que hacer esto porque solo me acepta este formato, ver a futuro
    //f.append("date", fecha.toISOString())
    formDataEvent.append("priority",body.priority)
    formDataEvent.append("tlp", body.tlp)
    formDataEvent.append("taxonomy", body.taxonomy)
    formDataEvent.append("feed", body.feed)
    formDataEvent.append("domain", body.domain)
    formDataEvent.append("todos", body.todos)
    formDataEvent.append("comments", body.comments)
    formDataEvent.append("cidr", body.cidr)
    formDataEvent.append("notes", body.notes)
    formDataEvent.append("parent", body.parent)
    formDataEvent.append("reporter", body.reporter)
    formDataEvent.append("case", body.case) 
    formDataEvent.append("tasks", body.tasks)
    if (evidence !== null){
      for (let index=0; index< evidence.length  ; index++){
        formDataEvent.append("evidence", evidence[index])
        console.log(evidence[index])
      }
    }else{
      formDataEvent.append("evidence", evidence)
    }
    //no se estan enviando los artefactos revisar backend
    body.artifacts.forEach((item) => {
      formDataEvent.append('artifacts', item);
    });

    postEvent(formDataEvent)
    /*postEvent(f, body.children, body.todos, body.artifacts, body.comments, body.cidr, 
      body.domain, body.date, body.evidence_file_path, body.notes, body.parent, body.priority, body.tlp, 
      body.taxonomy, body.feed, body.reporter, body.case, body.tasks)*/
      .then(() => {
        window.location.href = '/events';
    })
    .catch((error) => {
        setShowAlert(true)
        setError(error);            
    })  
  }
  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Row>
          <Navigation actualPosition="Agregar evento" path="/events" index ="Evento"/>
        </Row>
        <FormEvent createEvent={createEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP} priorities={priorities} users={users} listArtifact={listArtifact} setContactsCreated={setContactsCreated} evidence={evidence} setEvidence={setEvidence}/>
          
    </div>
  )
}

export default CreateEvent