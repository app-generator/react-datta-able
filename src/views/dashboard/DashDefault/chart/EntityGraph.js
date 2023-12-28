import NVD3Chart from 'react-nvd3';
import React,{useState, useEffect} from 'react'

const EntityGraph = ({list}) => {

    const [entity, setEntity] = useState([]);

    const filtrarEventosNoCero = (datos) => { //opino que se debe mostrar aquellas fuentes que este asociados a uno amas eventos 
        return datos.filter((objeto) => objeto.eventCount !== 0);
    };

    useEffect( ()=> {
        setEntity(filtrarEventosNoCero(list))
        
    }, [list])
    console.log(list)

    return (
        <div>
        {
            entity.length > 0 ? <NVD3Chart id="chart" height={600} type="pieChart" datum={entity} x="name" y="eventCount"  labelType="percent" /> :
            "No hay fuentes que esten asociadas a un evento"
                
        }
        </div>
    );
}

export default EntityGraph