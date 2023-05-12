import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap';
import FormState from './components/FormState'
import Navigation from '../../components/Navigation/Navigation'
import { postState} from "../../api/services/states";
import { useLocation } from 'react-router-dom';
import Alert from '../../components/Alert/Alert';

const AddState = () => {
    const states = useLocation().state;
     //descripcion  y active en postman me lo marca como requerido
     //nombre debe ser unico en el sistema
     //slug no es unico ¿deberia serlo? ademas es un campo requerido pero toma el valor de nombre
 
    const formEmpty={ 
        slug: "",//requerido
        name: "",//requerido
        attended: null,//requerido
        solved: null,//requerido
        active: null,
        description: "",
        children: []
    }
    const [body, setBody] = useState(formEmpty)
    const [alert, setAlert] = useState(null)
    const [stateAlert, setStateAlert] = useState(null)
    const [error,setError]=useState()
    const [childernes, setChildernes]=useState([])
    const [showAlert, setShowAlert] = useState(false)

    const resetShowAlert = () => {
        setShowAlert(false);
    }
    useEffect( ()=> {
        var listChildren = []
        states.map((state, index)=>{
            listChildren.push({value:state.url, label:state.name})
        })
        setChildernes(listChildren)
        
    },[])
    const slugify = (str) => {
        return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '')
    }

    const createState=()=>{
        console.log(body.children)
        postState(body.name, body.attended, body.solved, 1, body.description, body.children)
        .then(() => {
            window.location.href = '/app/states';
        })
        .catch((error) => {
            setShowAlert(true) 
            setError(error);           
        })
        .finally(() => {
            setShowAlert(true) 
        })  
    }
  return (
    <div>
        <Alert showAlert={showAlert} resetShowAlert={resetShowAlert}/>
        <Navigation actualPosition="Agregar Estado" path="/app/states" index ="Estados"/>
        <Card>
            <Card.Header>
                <Card.Title as="h5">Agregar Prioridad</Card.Title>
            </Card.Header>
            <FormState body={body} setBody={setBody} createState={createState} childernes={childernes} />
      </Card>
    </div>
  )
}
export default AddState