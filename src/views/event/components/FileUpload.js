import React from 'react'

const FileUpload = ({body , setFiles}) => {
    const removeFile = (filename) => {
        //setFiles(files.filter(file => file.name !== filename))
      }
      const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles({...body,
            ["evidence"] : event.target.files})
      }
      const deleteFileHandler = (_name) => {
        removeFile(_name)
        }
  return (
    <div>
         <input type="file" onChange={uploadHandler} />
                    <button>
                        Upload
                    </button>
                    <ul className="file-list">
            {/*
                files &&
                files.map(f => (f.name))
  */}
        </ul>
    </div>
  )
}

export default FileUpload