import React from 'react'
import './FileItem.css'
import {Button} from 'react-bootstrap';

const FileItem = ({ index, file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item"
                key={index}>
                <p>{file.name}</p>
                <div className="actions">
                    {!file.isUploading &&
                        <Button className='btn-icon btn-rounded' 
                            variant='outline-danger' 
                            onClick={() => deleteFile(index)}>
                           <i className='fas fa-trash-alt' />
                        </Button>
                    }
                </div>
            </li>
        </>
    )
}

export default FileItem
