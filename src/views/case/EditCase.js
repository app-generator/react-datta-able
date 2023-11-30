import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { getCase } from '../../api/services/cases';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getState } from '../../api/services/states';

const EditCase = () => {

    const location = useLocation();
    const fromState = location.state;
    const [url, setUrl] = useState(fromState);
    
    const [caseItem, setCaseItem] = useState(null);
 
    //multiselect
    const [allStates, setSupportedStates] = useState([]) 

    useEffect(()=> {
        getCase(url)
            .then(response => {
                console.log(response.data)
                setCaseItem(response.data)
            })
            .catch(error => {
            })
    
    },[])

    useEffect(()=>{
        let listStates =[]
        if(caseItem) {

            getState(caseItem.state)
            .then((response) => {
                console.log(response)
            
                listStates.push({value:response.data.url, label:response.data.name})
                let children = response.data.children;
                children.forEach((child)=>{
                    getState(child)
                    .then((responseChild)=>{
                        console.log(responseChild)
                        listStates.push({value:responseChild.data.url, label:responseChild.data.name})
                    })
                    .catch((error)=>{
                        console.log(error)
                    })
                })
            console.log(listStates);
            setSupportedStates(listStates);
            })
            .catch((error)=>{
                console.log(error)
            })
        }

    },[caseItem])



    return ( caseItem &&
        <React.Fragment>
            <Row>
                <Navigation actualPosition="Editar Caso" path="/cases" index ="Casos"/>
            </Row>
            <FormCase caseItem={caseItem} allStates={allStates} edit={true} save='Guardar Cambios'/>
        </React.Fragment>
    );
};

export default EditCase;
