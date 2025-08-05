import * as React from "react";
import { AuthProvider, useAuth } from "../Components/AuthContext";
import { useState, useEffect } from "react";
import "../App.css";
import Button from "@mui/material/Button";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DownloadIcon from "@mui/icons-material/Download";
import RuleIcon from "@mui/icons-material/Rule";
import AnswerSheet from "@mui/icons-material/DocumentScanner";
import PdfView from "../Components/PdfViewer";
import Modal from "../Components/Modal";
import Loading from "../Components/Skelton";
import CheckList from "../Components/CheckList";
import { Typography } from "@mui/material";
import NextGen from "../pages/NextGen";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Backdrop from '@mui/material/Backdrop'


export default function TestGen() {
  const { user } = useAuth();

  const [blobName, setBlobName] = useState(null);
  const [showButton, setButton] = useState(true);
  const [showImage, setImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [answer_types, setAnswerTypes] = useState({});
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [isChecking, setIsChecking] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [expire, setExpire] = useState(false);
  const [nextGen, setNextGen] = useState(null);
  const [testMaxScore, setTestMaxScore] = useState("");

  const generateEmptyAnswers = (currentTaskCount) => {
    return Array.from({ length: currentTaskCount }, (_, i) => [
      String(i + 1),
      "-1",
    ]).reduce(
      (acc, [id, val]) => {
        acc.data[id] = val;
        return acc;
      },
      { data: {} }
    );
  };

  const checkGen = async () => {
    try {
      const response = await fetch("http://localhost:8000/can-generate", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setExpire(false);
        setIsChecking(false);
        return;
      }

      const data = await response.json();

      if (data["can_generate"] === true) {
        setExpire(false);
      } else if (data["can_generate"] === false) {
        setExpire(true);
        setNextGen(data["next_available"]);
      }
    } catch (error) {
      console.error("Error in checkGen:", error);
      setExpire(true);
    } finally {
      setIsChecking(false);
    }
  };

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    checkGen();
  }, []);

  useEffect(() => {
    const emptyAnswers = generateEmptyAnswers(taskCount);

    setAnswers({
      ...emptyAnswers,
      test: `${user?.id}/${blobName}`, 
    });
  }, [taskCount, blobName, user]);

  const handleChange = (questionNumber) => (val) => {
    setAnswers((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [questionNumber]: val.length > 3 ? val.slice(0, 3) : val,
      },
    }));
  };

  const handleChangeChoose = (questionNumber) => (value) => {
    setAnswers((prev) => ({
      ...prev, // Spread the previous state
      data: {...prev.data, [questionNumber]: value, 
      },
    }));
  };

  const handleSelect = (event) => {
    setTestMaxScore(event.target.value);
  };

  const fetchPdf = async () => {
    setLoading(true);
    setImage(false);
    setButton(false);

    // https://testgen.duckdns.org/pdf?test-task-count=${testMaxScore}

    try {
      const response = await fetch(
        `http://localhost:8000/pdf?test_max_score=${testMaxScore}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch PDF");
      }

      const data = await response.json();

      setTaskCount(data["task-count"]);
      setAnswerTypes(data["answer-type-template"]);
      console.log("Answer Types:", data["answer-type-template"]);
      setBlobName(data["pdf-path"]);
      setShowPdf(true);
      setExpire(false);
    } catch (error) {
      console.error("Error fetching the PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswers = async (e) => {

    console.log(answers);
    setOpen(true);
    setIsCalculating(true);

    const payload = {
      user_answer: answers,
      test_max_score: testMaxScore,
      test_template: answer_types,
    }

  try {
    const res = await fetch("http://localhost:8000/check", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    
    setScore(data.score);
  } catch (err) {
    console.error("Submit failed", err);
  } finally {
    setIsCalculating(false);
    
  }
  };

  const handleClose = () => {
    setOpen(false);
    const emptyAnswers = generateEmptyAnswers(taskCount);
    setAnswers((prev) => ({
      ...prev, // Preserve the existing fields in the state
      data: emptyAnswers, // Update only the `data` field with `emptyAnswers`
    }));
    setTimeout(() => {
      setScore(0);
    }, 1000);

    setShowPdf(false);
    setImage(false);
    setButton(false);
    setLoading(false);

    setIsChecking(true);
    checkGen(); // Recheck if the user can generate a new test
  };

  return (
    <AuthProvider>
      <Box sx={{ visibility: isChecking ? "hidden" : "visible" }}>
        {expire 
        ? <NextGen nextAvailableTime={nextGen} />  
        : (
          <div>
            <div className="w-screen flex items-center justify-center">
              {showImage ? (
                <img src="/Home.png" className="size-130 shrink-0" alt="Error" />
              ) : null}

              {showButton && (
                <div className="flex flex-col items-center justify-center text-center gap-y-7">
                  <p className="w-[30em] text-xl">
                    Գեներացրեք թեստեր, լրացրեք պատասխաների ձևաթուղթը և ստացեք ձեր
                    միավորը վայրկյաների ընթացքում:
                  </p>

                  {/* Select the nuber of tasks */}
                  <Box sx={{ minWidth: 220 }}>
                    <FormControl fullWidth>
                      <InputLabel id="task-count">Առավելագույն միավոր</InputLabel>
                      <Select
                        labelId="task-count"
                        id="demo-simple-select"
                        value={testMaxScore}
                        label="Առավելագույն միավոր"
                        onChange={handleSelect}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <MenuItem value={120}>120 (ԻԿՄ)</MenuItem>
                        <MenuItem value={100}>100 (ԿՖՄ)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    className="btn"
                    sx={{
                      padding: "10px",
                      fontSize: "1.2em",
                      fontFamily: "Hack",
                      fontWeight: "500",
                      letterSpacing: "1px",
                    }}
                    variant="contained"
                    endIcon={<DownloadIcon />}
                    onClick={fetchPdf}
                  >
                    ԳԵՆԵՐԱՑՆԵԼ
                  </Button>
                </div>
              )}

              {loading && <Loading />}

              {showPdf && (
                <div className="flex">
                  <div className="flex flex-row w-full gap-x-2">
                    <div className="w-140">
                      <PdfView file={blobName} />
                    </div>

                    <div className="bg-[#EBF5FB] max-w-dvw py-[1em] mr-20 pb-0 rounded-lg text-center h-dvh flex flex-col overflow-auto">
                      <div>
                        <Typography
                          variant="h5"
                          className="font-[Hack] font-medium mb-2"
                        >
                          Պատասխաների ձևաթուղթ
                        </Typography>
                      </div>

                      <div>
                        <Button
                          className="btn"
                          sx={{
                            fontSize: "1em",
                            fontFamily: "Hack",
                            fontWeight: "300",
                            letterSpacing: "1px",
                          }}
                          variant="contained"
                          endIcon={<RuleIcon />}
                          onClick={checkAnswers}
                        >
                          Ստուգել
                        </Button>
                      </div>

                      <CheckList
                        answer_types={answer_types}
                        answers={answers}
                        handleChange={handleChange}
                        handleChangeChoose={handleChangeChoose}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Modal open={open} handleClose={handleClose} score={score} loading={isCalculating}/>
          </div>
          )
        }
      </Box>


      <Backdrop
        open={isChecking}
        sx={{
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
      >
        <CircularProgress size="5rem" />
      </Backdrop>
    </AuthProvider>
  );
}
