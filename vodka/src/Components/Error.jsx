import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



export default function Error(){
    return(
        <div className='flex items-center justify-center'>
            <Alert 
                severity="error" 
                sx={{
                    width: "fit-content",
                    padding: "20px",
                    }}
            >
                <AlertTitle sx={{fontWeight: "bold"}}>Error</AlertTitle>
                Try again or contact us.
            </Alert>
        </div>
    );
}

