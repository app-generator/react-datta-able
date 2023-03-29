import React, { useState } from 'react';

const Search = ({type, action}) => {
    const [search, setSearch] = useState("")
    const searcher = (e) => {
        setSearch(e.target.value) 
    }
    const text= "Buscar "+type+"  . . ."
  return (
   
        <div className="input-group">
            <input value={search} onChange={searcher} type="text" id="m-search" className="form-control" placeholder={text} />
            <span className="search-btn btn btn-primary" onClick={()=>action()}>
                <i className="feather icon-search " />
            </span>
        </div>
    
  )
}

export default Search