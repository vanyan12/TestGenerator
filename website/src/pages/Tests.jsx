import * as React from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import SignUp from "../Components/SignUp";
import { AuthProvider } from "../Components/AuthContext";
import { useState } from 'react';
import '../App.css'
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import AnswerSheet from '@mui/icons-material/DocumentScanner';
import PdfView from '../Components/PdfViewer';
import Modal from '../Components/Modal';
import Loading from '../Components/Skelton';


export default function Texts() {

  const [pdfUrl, setPdfUrl] = useState(null)
  const [showButton, setButton] = useState(true)
  const [showImage, setImage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [taskCount, setTaskCount] = useState(0)
  const [answer_types, setAnswerTypes] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [showLandingPage, setShowLandingPage] = useState(false)



  const fetchPdf = async () => {
    setLoading(true)
    setImage(false)
    setButton(false)

    //https://apicontainer-auchgsfzcdaxdrdx.westeurope-01.azurewebsites.net/pdf

    try {
      const response = await fetch("http://127.0.0.1:8000/pdf");
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const data = await response.json()

      setTaskCount(data["task-count"])
      setAnswerTypes(data["answer-type-template"])

      try{
        const pdf_response = await fetch(`http://127.0.0.1:8000/pdf/${data["pdf-path"]}`)

        const blob = await pdf_response.blob(); // Convert response to Blob
        const url = URL.createObjectURL(blob); // Create object URL
        setPdfUrl(url+"#toolbar=0")

      } catch (e){
        console.error(e)
      }


    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
    setShowPdf(true)
    setLoading(false)
  };

  const openAnswerModal = () => {
    setOpenModal(true)
  }

  const generatePage = () => {
    setShowLandingPage(false)
  }

  const downloadTest = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "Math_test.pdf" // Specify the file name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <AuthProvider>
      <Header />

      <div>
        
        <div className='flex justify-center items-center h-screen'>
          <div className='mx-auto flex items-center justify-items-center gap-x-25'>

    
            {showImage ? (<img src='/Home.png' className="size-150 shrink-0" alt="Error" />) : null  }



            {showButton && (
                <div className='flex flex-col items-center gap-y-20'>
                  <div className="text-4xl font-medium slog font-[Hack]">Սովորել, սովորել, սովորել</div>
                  <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1.2em", fontFamily: "Hack" , fontWeight: "500", letterSpacing: "1px" }} variant="contained" endIcon={<InsertDriveFileIcon />} onClick={fetchPdf}>
                    ԳԵՆԵՐԱՑՆԵԼ
                  </Button>
                </div>
            )}

            {showPdf && (
              <div className='mt-60 mb-5'>
                < PdfView url={pdfUrl}/>
                
                <div className='flex justify-center gap-x-5'>
                  <Button className="btn w-60" sx={{ padding: '10px', fontFamily: "Hack", fontSize: "1.2em", letterSpacing: "1px" }} variant="contained" startIcon={<AnswerSheet className='mr-5'/>} onClick={openAnswerModal}>
                    Ստուգել
                  </Button>
                  <Button className="btn w-60" sx={{ padding: '10px', fontSize: "1.2em", fontFamily: "Hack", letterSpacing: "1px" }} startIcon={<DownloadIcon/>} variant="contained" onClick={downloadTest}>
                    Ներբեռնել
                  </Button>
                </div>


                <Modal open={openModal} setOpen={setOpenModal} taskCount={taskCount} answer_types={answer_types}/>

              </div>
            )}



          </div>
          <div className='flex items-center justify-items-center'>
            {loading && <Loading />}
          </div>
        </div>
                
      </div>

    </AuthProvider>
  );
}
