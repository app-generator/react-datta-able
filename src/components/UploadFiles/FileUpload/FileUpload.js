import React from 'react'
import './FileUpload.css'

const FileUpload = ({ files, setFiles, removeFile }) => {
    const uploadHandler = (event) => {
        const filesToUpload = event.target.files;
        // se concatenan las 2 listas una lista con los archivos que fueron cargados (files)  y la otra lista con los que se agregaron recientemente
        setFiles([...files, ...filesToUpload]);
    }

    return (
        <>
            <div className="file-card">
                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} multiple />
                    <button>
                        Cargar archivo/s
                    </button>
                </div>

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>
        </>
    )
}

export default FileUpload
