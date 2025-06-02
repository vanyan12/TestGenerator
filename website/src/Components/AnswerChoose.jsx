import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';


export default function AnswerChoose({n, ml, v, handleChange}) {
  const [selectedOption, setSelectedOption] = useState("");


  return (
    <div className='flex flex-row items-center gap-x-[1em]'>
        <div className='text-xl text-bold' style={{marginLeft: n >= 10 ? `${ml}px`:0}}>{n}</div>
        
        <RadioGroup row 
          aria-label="options"
          name={`q${n}`}
          value={v || ""}
          onChange={handleChange(n)}
          sx={{
            '& .MuiRadio-root': {
              padding: '2px',
              fontSize: '0.7rem',
              margin: '5px 0px',
            },
          }}
          
        >
          <Radio value="1"/>
          <Radio value="2"/>
          <Radio value="3"/>
          <Radio value="4"/>

        </RadioGroup>
    </div>
  );
}


