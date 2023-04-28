import React from 'react';

import { useState, useEffect } from 'react';
import LetterFormat from './LetterFormat'

const CallBackendByName = ({url, callback, useBadge}) => {
    const [data, setData] = useState('');

    useEffect(() => {

        callback(url, setData)
        
    }, []);
 


    
return (
        data && 
        <React.Fragment>
                <LetterFormat useBadge={useBadge} data={data}/>
        </React.Fragment>
    );
};

export default CallBackendByName; 