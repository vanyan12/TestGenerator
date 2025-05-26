import * as React from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import SignUp from "../Components/SignUp";
import getUserInfo from "../Utils";
import { AuthProvider, useAuth } from "../Components/AuthContext";
import { useState, useEffect } from 'react';
import '../App.css'
import Button from '@mui/material/Button';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import RuleIcon from '@mui/icons-material/Rule';
import AnswerSheet from '@mui/icons-material/DocumentScanner';
import PdfView from '../Components/PdfViewer';
import Modal from '../Components/Modal';
import Loading from '../Components/Skelton';
import CheckList from '../Components/CheckList';
import { Typography } from "@mui/material";


export default function TestGen() {

  const {token} = useAuth();
  const user = getUserInfo(token);

  const [pdfUrl, setPdfUrl] = useState(null)
  const [blobName, setBlobName] = useState(null)
  const [showButton, setButton] = useState(true)
  const [showImage, setImage] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [taskCount, setTaskCount] = useState(0)
  const [answer_types, setAnswerTypes] = useState({})
  const [open, setOpen] = useState(false)
  const [score, setScore] = useState(0)

  const generateEmptyAnswers = (currentTaskCount) => {
    return Array.from({ length: currentTaskCount }, (_, i) => [String(i + 1), "-1"]).reduce(
      (acc, [id, val]) => {
        acc.data[id] = val;
        return acc;
      },
      { data: {} }
    );
  };

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const emptyAnswers = generateEmptyAnswers(taskCount);
    
    setAnswers({
      ...emptyAnswers,
      test: blobName,
    });
  }, [taskCount, blobName]);


  const handleChange = (questionNumber) => (val) => {
    setAnswers((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [questionNumber]: val.length > 3 ? val.slice(0, 3) : val,
      },
    }));

  };

  const handleChangeChoose = (questionNumber) => (event) => {
    setAnswers((prev) => ({
      ...prev, // Spread the previous state
      data: {
        // Update only the "data" object
        ...prev.data,
        [questionNumber]: event.target.value, // Update the answer for the current question
      },
    }));
  };




  const fetchPdf = async () => {
    setLoading(true)
    setImage(false)
    setButton(false)

    try {
      const response = await fetch("http://127.0.0.1:8000/pdf", {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const data = await response.json()

      setTaskCount(data["task-count"])
      setAnswerTypes(data["answer-type-template"])
      // setBlobName(`${user.sub}/${data["pdf-path"]}`);
      setBlobName(data["pdf-path"]);


      // try{
      //   const pdf_response = await fetch(`http://127.0.0.1:8000/get-test/${data["pdf-path"]}`,{
      //     method: "GET",
      //     headers: {
      //       "Authorization": `Bearer ${token}`,
      //     }
      //   })

      //   const blob = await pdf_response.blob(); // Convert response to Blob
      //   const url = URL.createObjectURL(blob); // Create object URL
      //   setPdfUrl(url+"#toolbar=0")


      // } catch (e){
      //   console.error(e)
      // }


    } catch (error) {
      console.error('Error fetching the PDF:', error);
    }
    setShowPdf(true)
    setLoading(false)
    
  };

  
  const checkAnswers = async (e) => {
    // e.preventDefault();

    console.log(answers)

    const response = await fetch("http://127.0.0.1:8000/check", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers)
    })

    const data = await response.json()

    const score = data["score"]

    setScore(score);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    const emptyAnswers = generateEmptyAnswers(taskCount);
    setAnswers({
      ...emptyAnswers,
      test: blobName,
    });
    setTimeout(() => {
      setScore(0);
    }, 1000);
  };

  return (
    <AuthProvider>
      <div>

        <div className="w-screen flex items-center justify-center">
            {showImage ? (<img src='/Home.png' className="size-130 shrink-0" alt="Error" />) : null  }

            {showButton && (
              <div className="flex flex-col items-center justify-center text-center gap-y-7">
                <p className="w-[50em]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit distinctio ratione eveniet, placeat illo eum sint, minus fugiat corrupti rem nostrum temporibus. Ipsam facere obcaecati ab quos nihil nam totam.
                </p>
                <Button className="btn" sx={{ padding: '10px', fontSize: "1.2em", fontFamily: "Hack" , fontWeight: "500", letterSpacing: "1px" }} variant="contained" endIcon={<DownloadIcon />} onClick={fetchPdf}>
                  ԳԵՆԵՐԱՑՆԵԼ
                </Button>
              </div>

            )}

            {loading && <Loading />}

            {showPdf && (
              <div className="">
                <div className="flex flex-row justify-start w-full gap-x-7">

                  <div className="w-150">
                    <PdfView file={blobName}/>
                  </div>

                  <div className="bg-[#EBF5FB] max-w-dvw py-[1em] pb-0 mr-20 rounded-lg text-center h-dvh flex flex-col overflow-auto">

                    <div>
                      <Typography variant="h5" className="font-[Hack] font-medium mb-2">Պատասխաների ձևաթուղթ</Typography>
                    </div>

                    <div>
                      <Button 
                      className="btn" 
                      sx={{  
                        fontSize: "1em", 
                        fontFamily: "Hack" , 
                        fontWeight: "300", 
                        letterSpacing: "1px" 
                      }} 
                      variant="contained" 
                      endIcon={<RuleIcon />}
                      onClick={checkAnswers}
                      >
                        Ստուգել
                      </Button>
                    </div>

                    <CheckList answer_types={answer_types} answers={answers} handleChange={handleChange} handleChangeChoose={handleChangeChoose}/>

                    

                  </div>
                </div>

                
                  
              </div>

              
            )}
        </div>

        <Modal open={open} handleClose={handleClose} score={score} />
        
        

        
                
      </div>

    </AuthProvider>
  );
}
