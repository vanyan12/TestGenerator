import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';

const steps = [
  {
    label: 'Ընտրեք Ձեր ներկայիս կարգավիճակը',
    content: {
      1: 'Սովորում եմ ավագ դպրոցում',
      2: 'Դիմորդ եմ',
      3: 'Ուսանող եմ',
      4: 'Ավարտել եմ ուսումը',
    }
  },
  {
    label: 'Ինչպես ե՞ք պատրաստվում/պատրաստվել ընդունելության քննություններին',
    content: {
      1: 'Անձամբ',
      2: 'Կրկնուսույցի հետ',
      3: 'Դպրոցում՝ ուսուցիչների հետ',
    }
  },
  {
    label: 'Ի՞նչ հաճախականությամբ եք թեստեր գրում/գրել',
    content: {
      1: 'Ամեն օր',
      2: 'Շաբաթական 1-3 անգամ',
      3: 'Ամսական 1-3 անգամ',
      4: 'Չեմ գրում/գրել թեստեր',
    }
  },
  {
    label: 'Որտեղի՞ց եք ձեռք բերում/բերել թեստերը',
    content: {
      1: 'Օգտագործել եմ անցած տարիների թեստերը',
      2: 'Դիմորդի ուղեցույցից',
      3: 'Կրկնուսույցից',
      4: 'Ընկերներից',
      5: 'Գնել եմ թեստերի գրքույկներ',
      6: 'Համացանցից',
      7: 'Այլ',
    }
  },
  {
    label: 'Արդյոք Ձեզ հասանելի թեստերի քանակը բավարար է/է եղել',
    content: {
      1: 'Այո, լիովին բավարար է/է եղել',
      2: 'Մասամբ բավարար է/է եղել',
      3: 'Ոչ, թեստերի սահմանափակ քանակությունը խանգարում/խանգարել է ինձ',
    }
  },
  {
    label: 'Ամսեկան մոտավորապես որքա՞ն գումար եք ծախսում/ծախսել թեստերի վրա',
    content: {
      1: '~1000 դրամ',
      2: '1001-2000 դրամ',
      3: '2001-5000 դրամ',
      4: '5001 և ավելի դրամ',
      5: 'Գումար չեմ ծախսում/ծախսել թեստերի վրա, թեստերը տրամադրում/տրամադրել է ուսուցիչս կամ կրկնուսույցս',
      6: 'Գումար չեմ ծախսում/ծախսել թեստերի վրա, բավարարվել եմ ինձ հասանելի թեստերով',
    }
  },
  {
    label: 'Ավելի շատ թեստեր գրելը կօգնի/օգնել է ինձ լավ պատրաստվել ընդունելության քննություններին',
    content: {
      1: 'Համաձայն եմ, շատ կօգնի/օգնել է ինձ',
      2: 'Մասամբ, մի փոքր կօգնի/օգնել է ինձ',
      3: 'Համաձայն չեմ, չի օգնի/օգնել ինձ',
      4: 'Չգիտեմ',
    }
  }

];

export default function VerticalStepper({setSubmited, onSubmit}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [answers, setAnswers] = React.useState({});
  const [otherInputs, setOtherInputs] = React.useState({});

  const handleOptionChange = (stepIndex, value) => {
    setAnswers((prev) => ({ ...prev, [stepIndex]: value }));
  };

  const handleOtherInputChange = (stepIndex, value) => {
    setOtherInputs((prev) => ({ ...prev, [stepIndex]: value }));
  };

  const handleNext = async () => {
    // Prevent proceeding if "Other" is selected but no input provided
    const selected = answers[activeStep];
    if (selected === 'Այլ' && !otherInputs[activeStep]) return;

    if (activeStep === steps.length - 1) {
    const result = steps.reduce((acc, step, idx) => {
      acc[step.label] = answers[idx] === 'Այլ' ? otherInputs[idx] : answers[idx];
      return acc;
    }, {});

    // await fetch('http://127.0.0.1:8000/submit-form', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(result),
    // }
    // )
    // .then((res) => res.json())
    // .then((data) => console.log('Submitted:', data))
    // .catch((err) => console.error('Error submitting form:', err));

    onSubmit(result);
    setSubmited(true);

    setActiveStep((prev) => prev + 1);
  } else {
    setActiveStep((prev) => prev + 1);
  }

  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setAnswers({});
    setOtherInputs({});
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Stepper 
        activeStep={activeStep} 
        orientation="vertical"
        sx={{
          '& .MuiStepConnector-line': {
            display: 'none',
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <FormControl>
                <RadioGroup
                  value={answers[index] || ''}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                >
                  {Object.entries(step.content).map(([key, option]) => (
                    <FormControlLabel
                      key={key}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {/* If "Other" selected, show text input */}
                {answers[index] === 'Այլ' && (
                  <TextField
                    label="Գրեք ձեր տարբերակը"
                    hiddenLabel
                    value={otherInputs[index] || ''}
                    onChange={(e) => handleOtherInputChange(index, e.target.value)}
                    fullWidth
                  />
                )}
              </FormControl>

              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'primary'}
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={
                    !answers[index] ||
                    (answers[index] === 'Այլ' && !otherInputs[index])
                  }
                >
                  {index === steps.length - 1 ? 'Հաստատել և գրանցվել' : 'Առաջ'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1 }}
                >
                  Հետ
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
