import React from 'react';

const Search = () => {
    const searchOnHandler = () => {
            document.querySelector('#navbar-right').classList.add('d-none');
    };

    return (
        <React.Fragment>
            <div id="main-search" className='open'>
                <div className="input-group">
                    <input type="text" id="m-search" className="form-control" placeholder="Buscar fuente de informacion . . ." />
                    <span className="search-btn btn btn-primary" onClick={searchOnHandler}>
                        <i className="fas fa-search " />
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Search;