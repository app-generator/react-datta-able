import React, { useState } from 'react';

const Search = ({type, setWordToSearch, wordToSearch, setLoading}) => {
    const [search, setSearch] = useState("")

    const searcher = (e) => {
        setSearch(e.target.value) 
    }

    const action = () => {
        console.log("search="+search+'&')
        setWordToSearch("search="+search+'&')
        if (wordToSearch !== "search="+search+'&'){ // este if esta porque si no hay cambios en el WordToSearch 
                                                    //haciendo que no se vuelva a ejecutar el useEffect y qeu al setearce setloading en true quede en un bucle infinito
          setLoading(true)
        }
    }

    const text= `Buscar ${type} . . .`

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