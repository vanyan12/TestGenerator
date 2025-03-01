import * as React from 'react';
import { useState } from 'react';
import './App.css'
import Toolbar from './Components/Toolbar';
import Loading from './Components/Loading';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';




function App() {

  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPdf = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:8000/');
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      const blob = await response.blob(); // Convert response to Blob
      const url = URL.createObjectURL(blob); // Create object URL
      setPdfUrl(url+"#toolbar=0&zoom=auto");

      setCheckAnswer(true)
      setGenerated(true)

    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
    setLoading(false)
  };

 

  return (
    <div className='mx-auto flex items-center justify-items-center gap-x-25'>

      <img src='/Home.png' className="size-150 shrink-0" alt="Error" />

      {/* {loading && (
        <Loading />
      )} */}

      {/* {pdfUrl && (
        <iframe src={pdfUrl} width="100%" height="600px"></iframe>
      )} */}

      {/* <Toolbar id="tool-bar" pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} setLoading={setLoading}/> */}
      <div className='flex flex-col items-center gap-y-20'>
        <div class="text-4xl font-medium slog">Preparation is the key</div>
        <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1em", letterSpacing: "1px" }} variant="contained" endIcon={<InsertDriveFileIcon />} onClick={fetchPdf}>
          GENERATE
        </Button>
      </div>

    </div>
  )
}

export default App
