import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RuleIcon from '@mui/icons-material/Rule';


export default function Toolbar({pdfUrl, setPdfUrl, setLoading}){
    const [generated, setGenerated] = useState(false)
    const [checkAnswer, setCheckAnswer] = useState(false)

    const fetchPdf = async () => {
        setLoading(true)
        setGenerated(true)
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


    return(
        <>
            <Stack direction="column" spacing={2}>
                {!generated && (
                    <Button className="btn" variant="contained" endIcon={<InsertDriveFileIcon />} onClick={fetchPdf}>
                        Generate
                    </Button>
                )}
                
                {checkAnswer && (
                    <Button className="btn" variant="contained" endIcon={<RuleIcon />}>
                        Check Answers
                    </Button>
                )}
            </Stack>
        </>
    );
}

