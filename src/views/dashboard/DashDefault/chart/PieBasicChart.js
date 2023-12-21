import NVD3Chart from 'react-nvd3';
import React,{useState, useEffect} from 'react'



const PieBasicChart = ({dashboardFeed}) => {
    const [feed, setFeed] = useState([]);

    const filtrarEventosNoCero = (datos) => { //opino que se debe mostrar aquellas fuentes que este asociados a uno amas eventos 
        return datos.filter((objeto) => objeto.event_count !== 0);
    };

    useEffect( ()=> {
        setFeed(filtrarEventosNoCero(dashboardFeed))
        
    }, [dashboardFeed])
    console.log(feed)
    return (
        <div>
        {
            feed.length > 0 ? <NVD3Chart id="chart" height={500} type="pieChart" datum={feed} x="feed_name" y="event_count" donut labelType="percent" /> :
            "No hay fuentes que esten asociadas a un evento"
                
        }
        </div>
    );
};


export default PieBasicChart;