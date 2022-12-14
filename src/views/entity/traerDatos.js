import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddButton from './elements/AddButton';
import axios from 'axios';
import {API_SERVER} from './../../config/constant';
import { data } from 'jquery';

const TraerEntity = () => {
    
    const urlLog = 'https://localhost:8000/api/login';
    const urlBase = 'https://localhost:8000/api/entity/';

    const login = (request, callback) =>{
        var responseOk = false;
        fetch (urlLog,{
            method : "POST",
            headers:{"Content-Type": "application/json"},
            body : JSON.stringify(request)
        }) 
        .then((httpResponse) =>{
            if(httpResponse.ok){
                responseOk = true;
            }
            return httpResponse.json();
        })
        .then(body =>{

        if(responseOk){
            console.log("Salio Todo bien");
            console.log(body);
            localStorage.setItem("token",body.result);
            callback(body);
        }else{
            alert(body.result); 
        }
        })
    }
    const tok = JSON.parse(localStorage.getItem("datta-account")).token;
    console.log(tok);    

    const getEntity = async () => {

//        fetch(`${API_SERVER}`+'entity/', {
    const res = await fetch('http://localhost:8000/api/entity/', {
        method: "GET",
            credentials: 'include',
            mode: 'cors',
            redirect : 'manual',
            headers:{
                'Access-Control-Allow-Credentials': 'true',
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tok,
            }
        });
        console.log(res);
    const data = await data.response;
//
    }
    getEntity();

     
    
{/*    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;
    axios.Authorization = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/entity/');
    



    const url = "/api/entity/";  
    const urlLogin = "http://localhost:8000/api/login/";
    
    const csrf = document.cookie.split('=')[1]
    const option = {
        withCredentials: 'true',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': 'csrftoken=dqzgnWfy71FsuvO6v81NWMsJt7JPTUk6takSudEoaEXPWcxZouHg8DSEZ9UwjOwk; sessionid=gknnvltavloeauk3f0zbcrw7l8hvuxx7',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*'

          },
    }
    const datos4 = fetch(url,option).then((res) => console.log(res)) 

    
    
    async function loginUser(credentials) {
        return fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }
    loginUser({'user':'ngen','password':'ngen'});
    const cookie = document.cookie

    const login = async() => {
        const res = await fetch(url, option);
        const data = await data.response;
        console.log(res)
    }
    getEntities();

    const datos4 = fetch().then((res) => res.json()).then((data) => console.log(data)) 
    var myHeaders = new Headers();
    myHeaders.append('Cookie',`${cookie}`)
    myHeaders.append('Access-Control-Allow-Origin', '*')
    
    var myInit = { 
        mode: 'cors',
        credentials: "include",
        cache: 'default',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Cookie':`${cookie}`,
        },
        origin : 'http://localhost:3000'
    };
    
    const datos3 = fetch(url, { 
        credentials : 'include',
        headers: {
            'Access-Control-Allow-Credentials':'true',
            'Cookie':`${cookie}`,
        },
        origin : 'http://localhost:3000'
    }).then((res) => res.json()).then((data) => console.log(data))        
   
    const datos2 = fetch(url).then((res) => res.json()).then((data) => console.log(data))        
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie' : {cookie}}
            }
        )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setData(data.results)
        })
    }, [])
*/}    

return (
    <React.Fragment>
        <Row>
            <Col>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col sm={12} lg={9}>
                                {/*<Search></Search>*/}
                            </Col> 
                            <Col sm={12} lg={3}>
                                <AddButton></AddButton>
                            </Col> 
                        </Row>                                 
                    </Card.Header>
                    <Card.Body>
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Activo</th>
                                    <th>Creado</th>
                                    <th>Modificado</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                </tr>
                                {/* 
                                {articulos.map((art, index) => {
                                    return (
                                        console.log(articulos),
                                        <tr key={art.id}>
                                        <th scope="row">{index +1}</th>
                                        <td>{art.nombre}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-success' title='Activo'>
                                            <i className='feather icon-check-circle'/>
                                        </Button>
                                        </td>
                                        <td>{art.direccion}</td>
                                        <td>{art.telefono}</td>
                                        <td>
                                        <Button className="btn-icon btn-rounded" variant='outline-primary' title='Detalle' href='/entity/show'>
                                            <i className='fas fa-eye'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-warning' title='Editar' href='/entity/edit'>
                                            <i className='fas fa-edit'/>
                                        </Button>
                                        <Button className="btn-icon btn-rounded" variant='outline-danger' title='Eliminar'>
                                            <i className='fas fa-trash-alt'/>
                                        </Button>
                                    </td>
                                    </tr>
                                    );
                                })}
                            */}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
);                            
}
export default TraerEntity;