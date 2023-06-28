import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import FormCase from './components/FormCase';
import Navigation from '../../components/Navigation/Navigation';
import { getStates } from '../../api/services/states';
import Alert from '../../components/Alert/Alert';

const CreateCase = () => {
        
    //Alert
    const [showAlert, setShowAlert] = useState(false);
    const [allStates, setAllStates] = useState([]) //multiselect

    const caseItem = {
        lifecycle: '0',//required
        priority: '0', //required
        tlp: '0', //required
        state: '0', //required
        date: null, //required
        parent: null,
        assigned: null,
        attend_date: null, //imprime la hora actual +3horas
        solve_date: null,
        comments: [], //?
        evidence: [],
    }

    useEffect(()=> {

        getStates()
            .then((response) => {
                console.log(response);
                let listStates = []
                response.data.results.map((stateItem)=>{
                    listStates.push({value:stateItem.url, label:stateItem.name, childrenUrl:stateItem.children})
                })
                setAllStates(listStates)

                console.log(response.data.results)
            })
            .catch((error)=>{
                console.log(error)
            })

        },[])


    return (
        <React.Fragment>
            
            <Row>
                <Navigation actualPosition="Crear Caso" path="/cases" index ="Casos"/>
            </Row>
            <FormCase caseItem={caseItem} allStates={allStates} edit={false} save='Crear'/>
        </React.Fragment>
    );
};

export default CreateCase;
