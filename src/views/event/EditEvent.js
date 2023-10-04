import React, { useState, useEffect } from 'react'
import { Row, Card } from 'react-bootstrap';
import FormEvent from './components/FormEvent'
import Navigation from '../../components/Navigation/Navigation'
import { putEvent} from "../../api/services/events";
import { useLocation } from "react-router-dom";
import Alert from '../../components/Alert/Alert';
import { getTLP } from "../../api/services/tlp";
import { getAllTaxonomies } from "../../api/services/taxonomies";
import { getAllFeeds } from "../../api/services/feeds";
import { getAllPriorities } from "../../api/services/priorities";
import { getEvidence, deleteEvidence} from "../../api/services/evidences";
import { getAllUsers } from "../../api/services/users";
import { getAllArtifacts } from "../../api/services/artifact";

const EditEvent = () => {
  //const [date, setDate] = useState(caseItem.date  != null ? caseItem.date.substr(0,16) : '') //required
  const location = useLocation();
  const fromState = location.state;
  const [event, setEvent] = useState(fromState);  


    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [body,setBody]=useState(event)
    const [evidence, setEvidence] = useState([])
    const [TLP, setTLP] = useState([])
    const [feeds, setFeeds] = useState([])
    const [taxonomy, setTaxonomy] = useState([])
    const [priorities, setPriorities] = useState([])
    const [users, setUsers] = useState([])
    const [listArtifact, setListArtifact] = useState([])
    const [contactCreated, setContactsCreated ] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

  useEffect( ()=> {
    event.date = event.date.substr(0,16)
    event.reporter = event.reporter == null ? "": event.reporter
    event.domain = event.domain == null ? "": event.domain
    event.cidr = event.cidr == null ? "": event.cidr
    setBody(event)

    const fetchPosts = async () => {
        setLoading(true)
        var list = []
        event.evidence.forEach((url) => {
           
          getEvidence(url).then((response) => { 
                list.push(response.data)
            })
          
        });
        setEvidence(list)
        
        
        getTLP().then((response) => { 
          setTLP(response.data.results)
        })
        .catch((error) => {
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

        getAllUsers().then((response) => { //se hardcodea las paginas
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
  

    const resetShowAlert = () => {
      setShowAlert(false);
    }


    const editEvent=()=>{
      const formDataEvent = new FormData();

      //se eliminan las evidencias
      if (evidence instanceof FileList){
        event.evidence.forEach((url) => {
          deleteEvidence(url).then((response) => { 
                console.log(response)
            })
        });
      }
      //console.log(fecha.toISOString())//YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]
      
      formDataEvent.append("date", body.date)// tengo que hacer esto porque solo me acepta este formato, ver a futuro
      //f.append("date", fecha.toISOString())
      formDataEvent.append("priority",body.priority)
      formDataEvent.append("tlp", body.tlp)
      formDataEvent.append("taxonomy", body.taxonomy)
      formDataEvent.append("artifacts", body.artifacts)
      formDataEvent.append("feed", body.feed)
      if (body.domain !== ""){
        formDataEvent.append("domain", body.domain)
      }
      formDataEvent.append("cidr", body.cidr)
      formDataEvent.append("todos", body.todos)
      formDataEvent.append("comments", body.comments)
      //f.append("cidr", body.cidr)// 'null' does not appear to be an IPv4 or IPv6 network"
      formDataEvent.append("notes", body.notes)
      //f.append("parent", body.parent) //"Invalid hyperlink - No URL match."]
      formDataEvent.append("reporter", body.reporter)
      //f.append("case", body.case) //"Invalid hyperlink - No URL match.
      formDataEvent.append("tasks", body.tasks)

      if (evidence !== null){
        for (let index=0; index< evidence.length  ; index++){
          formDataEvent.append("evidence", evidence[index])
       
        }
      }else{
        formDataEvent.append("evidence", evidence)
      }


      /*body.artifacts.forEach((item) => {
        formDataEvent.append('artifacts', item);
      });*/
      formDataEvent.append('artifacts',body.artifacts);


      putEvent(body.url,formDataEvent).then(() => {
        window.location.href = '/events';
        console.log(body)
      })
      .catch((error) => {
          setShowAlert(true) //hace falta?
          setError(error);           
      }) 
      
         
    }

  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Row>
          <Navigation actualPosition="Editar Evento " path="/events" index ="Evento"/>
        </Row>
          
              <FormEvent createEvent={editEvent} setBody={setBody} body={body} feeds={feeds} taxonomy={taxonomy} tlp={TLP} priorities={priorities} users={users} listArtifact={listArtifact} setContactsCreated={setContactsCreated} evidence={evidence} setEvidence={setEvidence}/>

        
    </div>
  )
}

export default EditEvent