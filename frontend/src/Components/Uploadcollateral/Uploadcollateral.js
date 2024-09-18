import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Viewcollateral from './Viewcollateral';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
function Uploadcollateral() {
   
    const[name,setName]=useState("");
    const[title,setTitle]=useState("");
    const[file, saveFile]=useState("");
    const [allPdf, setAllPdf] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);




    useEffect(() => {
        getpdf();
    },[]);

    const getpdf = async () => {
        const result = await axios.get("http://localhost:5000/getFile");
        console.log(result.data.data);
        setAllPdf(result.data.data);
    }

    const submitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
     
        formData.append("name", name);
        formData.append("title", title); 
        formData.append("file", file); 
        console.log(name, title, file);
    
    try{
        const result = await axios.post("http://localhost:5000/uploadFile", formData,{
            headers: 
                {'Content-Type': 'multipart/form-data'}
            });
            console.log(result);

            if(result.data.status === 200){
                alert("File uploaded successfully");
                getpdf();
            }else{
                alert("Upload Failed. Please try again");
            }
        
    }catch(err){
        console.error("Error Uploading File" +err.message);
        alert("An error occured while uploading. Please try again");
    }
};

    const showPdf = (pdf) => {
        setPdfFile(`http://localhost:5000/file/${pdf}`);
    };

  return (
    <div>
      <h1>Upload Collateral Document</h1>
      <form onSubmit={submitPdf}>
      <label>Borrower's Name</label><br></br>
      <input required type="text" onChange={(e) => setName(e.target.value)}></input><br></br><br></br>
        <label>Document Title</label><br></br>
        <input required type="text" onChange={(e) => setTitle(e.target.value)}></input><br></br><br></br>
        <label>Select PDF File</label><br></br>
        <input type='file' accept='application/pdf' onChange={(e) => saveFile(e.target.files[0])} required></input><br></br><br></br>
        <button>Upload</button>


      </form>

<div>
    <h1>Collateral Document Details</h1>
    {allPdf == null 
    ? "" 
    : allPdf.map((data) => (
        <div key={data._id}>
            <h3>Borrower's Name: {data.name}</h3>
            <h3>Title: {data.title}</h3>
            <button onClick={() => showPdf(data.pdf)}>Show Document</button>
        </div>
    ))}
</div>
    <Viewcollateral pdfFile={pdfFile} />
</div>
  );
}

export default Uploadcollateral
