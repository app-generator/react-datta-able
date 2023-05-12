import React, { useState, useEffect } from 'react';
import { getEvidence } from '../../../api/services/evidences';
import { getFiles } from '../../../api/services/files';
import CrudButton from '../../../components/Button/CrudButton';



const ViewFiles = (props) => {
    const [data, setData] = useState({})
    
    const downloadFile = async () => {
        const response = await fetch(data.file);
        //console.log(response)
        const blob = await response.blob();
        console.log(blob)
        const url = URL.createObjectURL(blob);
        console.log(url)
        /*const url= await getFiles(data.file).then((response) => {
          return window.URL.createObjectURL(new Blob([response.data]))
          
        })
        .catch();*/
    
        const link = document.createElement('a');
        link.href = url;
        
        //obtengo la extencion del archivo
        const fileName = data.file.split("/").pop();
        const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        link.download = 'downloaded_file'+"."+extension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    useEffect( ()=> { 
        const fetchEvents = async () => {
                getEvidence(props.url).then((response) => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch();  
        }
        
        fetchEvents()
        console.log(data)

    },[])
    console.log(data)
  return (
    <div>
         <CrudButton type='download' name={props.index} onClick={downloadFile} /> 
        
    </div>
  )
}

export default ViewFiles