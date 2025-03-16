import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';


export default function Answer({n, ml, v, handlehange}) {
  const [selectedOption, setSelectedOption] = useState("");


  return (
    <div className='flex flex-row items-center'>
        <div className='text-xl text-bold' style={{marginLeft: `${ml}px`}}>{n}</div>
        
        <RadioGroup row 
          aria-label="options"
          name={`q${n}`}
          value={v || ""}
          onChange={handlehange(n)}
        >
          <Radio value="1"/>
          <Radio value="2"/>
          <Radio value="3"/>
          <Radio value="4"/>

        </RadioGroup>
    </div>
  );
}


