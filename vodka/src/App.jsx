import * as React from 'react';
import { useState } from 'react';
import './App.css'
import Error from './Components/Error';
import Loading from './Components/Loading';
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PdfView from './Components/PdfViewer';
import LandingPage from './Components/LandingPage';
import Modal from './Components/Modal';
import Header from './Components/Header';





function App() {

  const [pdfUrl, setPdfUrl] = useState(null)
  const [showButton, setButton] = useState(true)
  const [showImage, setImage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [taskCount, setTaskCount] = useState(0)
  const [answer_types, setAnswerTypes] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [showLandingPage, setShowLandingPage] = useState(true)



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
      setPdfUrl("/ErrorPage.html")
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


 

  return (
    <div>
        <Header onGenerate={generatePage} isLoggedIn={true} userAvatar={"https://www.google.com/imgres?q=avatar%20img&imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F02%2F79%2F66%2F93%2F360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Davatar%2Bwoman&docid=ByPk3gPuxgInEM&tbnid=Nq2tF7l4Wrh5eM&vet=12ahUKEwj_1L_m2MaMAxVaQ_EDHXk8BP8QM3oECFMQAA..i&w=360&h=360&hcb=2&ved=2ahUKEwj_1L_m2MaMAxVaQ_EDHXk8BP8QM3oECFMQAA"}/>
        {showLandingPage ? <LandingPage /> : (
              <div className='flex justify-center items-center h-screen'>
                <div className='mx-auto flex items-center justify-items-center gap-x-25'>

          
                  {showImage ? (<img src='/Load.gif' className="size-150 shrink-0" alt="Error" />) : null  }
        

        
                  {showButton && (
                      <div className='flex flex-col items-center gap-y-20'>
                        <div className="text-4xl font-medium slog">Preparation is the key</div>
                        <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1em", letterSpacing: "1px" }} variant="contained" endIcon={<InsertDriveFileIcon />} onClick={fetchPdf}>
                          GENERATE
                        </Button>
                      </div>
                  )}
        
                  {showPdf && (
                    <div className='mt-80 mb-10'>
                      < PdfView url={pdfUrl}/>
        
                      <Button className="btn w-50" sx={{ padding: '10px', fontSize: "1em", letterSpacing: "1px" }} variant="contained" onClick={openAnswerModal}>
                        ANSWER SHEET
                      </Button>
        
                      <Modal open={openModal} setOpen={setOpenModal} taskCount={taskCount} answer_types={answer_types}/>
        
                    </div>
                  )}
        
        
        
                </div>
                <div className='flex items-center justify-items-center'>
                  {loading && <Loading />}
                </div>
              </div>
                
        )}
        


    </div>
    
  )
}

export default App
