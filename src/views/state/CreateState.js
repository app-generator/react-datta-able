import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap';
import FormState from './components/FormState'
import Navigation from '../../components/Navigation/Navigation'
import { postState} from "../../api/services/states";
import { useLocation } from 'react-router-dom';

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
        postState(slugify(body.name),body.name, body.attended, body.solved, 1, body.description, body.children)
        .then((response) => { 
            sessionStorage.setItem('Alerta', JSON.stringify({name:`El usuario ${body.username} ha sido creada`, type:1}));
            window.location.href = "/list-states"
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
        <Navigation actualPosition="Agregar Estado" path="./list-states" index ="Estados"/>
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