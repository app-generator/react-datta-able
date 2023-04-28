import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/FormEvent'
import Navigation from '../../components/Navigation/Navigation'
import { postEvent} from "../../api/services/events";
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getFeeds } from "../../api/services/feeds";
import { getPriorities } from "../../api/services/priorities";
import { getUsers } from "../../api/services/users";
import { getArtefacts } from "../../api/services/artifact";


const CreateEvent = () => {
  const formEmpty={
    evidence: [],
    children: [], 
    todos: [],
    artifacts: [], 
    comments: null, 
    cidr: null,
    domain: ".com", //cuidado con cargar "" , si o si tiene que ser requerido me lo pide por que no tine un atributo filter
    date: "",
    notes: null, //cuidado con cargar ""
    parent: [],
    priority: "-1",
    tlp: "-1",
    taxonomy: "-1",
    feed: "-1",
    reporter: [],
    case: [],
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
          console.log(response)
          setTaxonomy(response)
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
    const f = new FormData();

    //console.log(fecha.toISOString())//YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]

    f.append("date", body.date)// tengo que hacer esto porque solo me acepta este formato, ver a futuro
    //f.append("date", fecha.toISOString())
    f.append("priority",body.priority)
    f.append("tlp", body.tlp)
    f.append("taxonomy", body.taxonomy)
    f.append("feed", body.feed)
    f.append("domain", body.domain)
    f.append("todos", body.todos)
    f.append("comments", body.comments)
    f.append("cidr", body.cidr)
    f.append("notes", body.notes)
    f.append("parent", body.parent)
    f.append("reporter", body.reporter)
    f.append("case", body.case) 
    f.append("tasks", body.tasks)
    if (body.evidence !== null){
      for (let index=0; index< body.evidence.length  ; index++){
        f.append("evidence", body.evidence[index])
        console.log(body.evidence[index])
      }
    }else{
      f.append("evidence", body.evidence)
    }
    postEvent(f)
    /*postEvent(f, body.children, body.todos, body.artifacts, body.comments, body.cidr, 
      body.domain, body.date, body.evidence_file_path, body.notes, body.parent, body.priority, body.tlp, 
      body.taxonomy, body.feed, body.reporter, body.case, body.tasks)*/
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
          <Navigation actualPosition="Agregar evento" path="./list-Event" index ="Evento"/>
          
              <FormEvent createEvent={createEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP} priorities={priorities} users={users} listArtifact={listArtifact} setContactsCreated={setContactsCreated}/>
          
    </div>
  )
}

export default CreateEvent