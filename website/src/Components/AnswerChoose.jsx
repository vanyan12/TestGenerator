import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';


export default function AnswerChoose({n, ml, v, handleChange, options}) {

  return (
    <div className='flex flex-row items-center gap-x-[1em]'>
        <div className='text-xl text-bold' style={{marginLeft: n >= 10 ? `${ml}px`:0}}>{n}</div>
        
        <RadioGroup row 
          aria-label="options"
          name={`q${n}`}
          value={v || ""}
          onChange={(e) => handleChange(n)(e.target.value)}
          sx={{
            '& .MuiRadio-root': {
              padding: '2px',
              fontSize: '0.7rem',
              margin: '5px 0px',
            },
          }}
          
        >
          {options.map((option, index) => {
            const val = ['Ճիշտ','Սխալ','Չգիտեմ'].includes(option)
              ? option === 'Ճիշտ' ? '1'
              : option === 'Սխալ' ? '0'
              : '-1'
              : option;

              return (
                <Radio
                  key={index}
                  value={val}
                  sx={{ margin: '0' }}
                />
                )
              })
            }


        </RadioGroup>
    </div>
  );
}


