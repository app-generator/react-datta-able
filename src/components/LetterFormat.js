import React from 'react'
import {Badge} from 'react-bootstrap';

const LetterFormat = (props) => {
    return (props.useBadge ?
          <div>
              <Badge className="badge mr-1" 
                  style={{background: `${props.data.color}`, color: '#111111'}}>{props.data.name}</Badge> 
          </div>
        :    <div> {props.data.name}</div>)
}

export default LetterFormat