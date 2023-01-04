import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Card } from 'react-bootstrap';

const Searcher = ({data}) => {
    //valores ingresados
    const [search, setSearch] = useState("");
    const searcher = (e) => {
        setSearch(e.target.value) //actualizar
        //console.log(e.target)    
        }
    
    //filtro
    let show = []
    if (!search) {
        show = data
    } else {
        show = data.filter( (item) => 
            item.username.toLowerCase().includes(search.toLowerCase())
        )
    }

    return (
        <div className="input-group">
            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder="Buscar entidad . . ." />
            <span className="search-btn btn btn-primary">
                <i className="feather icon-search " />
            </span>
        </div>
    )
}
export default Searcher;
