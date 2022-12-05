import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const DetailUser = () => {
    return (
        <>
          <h3 className="title-theme-color">Detalle de un usuario </h3>
             <div>
             <div className="mb-3 row" >
                <div className="col-2">
                    <strong >id del sistema: </strong>
                </div>
                <div className="col-5">
                    1
                </div>
            </div>
             <div className="mb-3 row" >
                <div className="col-2">
                    <strong >Username: </strong>
                </div>
                <div className="col-5">
                    @Mark
                </div>
            </div>
            <div className="mb-3 row" >
                <div className="col-2">
                    <strong >Nombre: </strong>
                </div>
                <div className="col-5">
                    Mark
                </div>
            </div>

            <div className="mb-3 row" >
                <div className="col-2">
                    <strong >ultima coneccion:  </strong>
                </div>
                <div className="col-5">
                        22-01-2022
                </div>
            </div>

            <div className="mb-3 row" >
                <div className="col-2">
                    <strong >creado el: </strong>
                </div>
                <div className="col-5">
                        22-01-2022
                </div>
            </div>

            <div className="mb-3 row" >
                <div className="col-2">
                    <strong >ultima actualizacion: </strong>
                </div>
                <div className="col-5">
                    22-01-2022
                </div>
            </div>

            <div className="mb-3 row" >
                <div className="col-2">
                    <strong >Email (?: </strong>
                </div>
                <div className="col-5">
                        Mark@mark.com
                </div>
            </div>
            <div >
                <Link to="/list-user" >
                    <button className="btn btn-dark">Volver</button>
                </Link>
            </div>

        </div>

            
        </>
    )
}

export default DetailUser