import * as React from 'react';
import { useState } from 'react';
import './App.css'
import Toolbar from './Components/Toolbar';
import Loading from './Components/Loading';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PdfView from './Components/PdfViewer';
import Modal from './Components/Modal';




function App() {

  const [pdfUrl, setPdfUrl] = useState(null)
  const [showButton, setButton] = useState(true)
  const [showImage, setImage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  const fetchPdf = async () => {
    setLoading(true)
    setImage(false)
    setButton(false)

    try {
      const response = await fetch('https://apicontainer-auchgsfzcdaxdrdx.westeurope-01.azurewebsites.net/pdf');
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      const blob = await response.blob(); // Convert response to Blob
      const url = URL.createObjectURL(blob); // Create object URL
      setPdfUrl(url+"#toolbar=0")
    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
    setShowPdf(true)
    setLoading(false)
  };

  const openAnswerModal = () => {
    setOpenModal(true)
  }


 

  return (
    <div className='mx-auto flex items-center justify-items-center gap-x-25'>

      
      {showImage && (<img src='/Home.png' className="size-150 shrink-0" alt="Error" />)}

      {loading && (
        <Loading />
      )}

      {/* <Toolbar id="tool-bar" pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} setLoading={setLoading}/> */}
      {showButton && (
          <div className='flex flex-col items-center gap-y-20'>
            <div className="text-4xl font-medium slog">Preparation is the key</div>
            <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1em", letterSpacing: "1px" }} variant="contained" endIcon={<InsertDriveFileIcon />} onClick={fetchPdf}>
              GENERATE
            </Button>
          </div>
      )}

      {showPdf && (
        <div>
          < PdfView url={pdfUrl}/>

          <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1em", letterSpacing: "1px" }} variant="contained" onClick={openAnswerModal}>
            CHECK ANSWERS
          </Button>

          <Modal open={openModal} setOpen={setOpenModal}/>

        </div>
      )}


    </div>
  )
}

export default App
