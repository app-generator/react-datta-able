import React, { useState } from 'react';

const Search = (props) => {
    const [search, setSearch] = useState("")
    const searcher = (e) => {
        props.setSearch(e.target.value) 
    }
    const text= `Buscar ${props.type} . . .`

  return (
   
        <div className="input-group">
            <input value={props.search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder={text} />
            <span className="search-btn btn btn-primary" onClick={()=>props.action()}>
                <i className="feather icon-search " />
            </span>
        </div>
    
  )
}

export default Search