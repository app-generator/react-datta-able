import React from 'react'
import {Badge} from 'react-bootstrap';

const LetterFormat = ({useBadge, stringToDisplay, color}) => {
    return (useBadge ?
          <div>
              <Badge className="badge mr-1" 
                  style={{background: `${color}`, color: '#111111'}}>{stringToDisplay}</Badge> 
          </div>
        :    <div> {stringToDisplay}</div>)
}

export default LetterFormat