import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from './CustomIcons';
import AlertMsg from '../AlertMsg';
import { useNavigate } from 'react-router-dom';
import Survey from '../Survey';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignInCard() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  })

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState('');
  const [showSurvey, setShowSurvey] = useState(false);



  const showSnackbar = (message, status) => {
    setSnackbarMessage(message);
    setSnackbarStatus(status);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const validateInputs = () => {
    const email = formData.email;
    const password =formData.password;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showSnackbar('Please enter a valid email address.', "warning");
      isValid = false;
    }

    if (!password || password.length < 6) {
      showSnackbar('Password must be at least 6 characters long.', "warning");
      isValid = false;
    }

    return isValid;
  };

  const handleFormOpen = () => {
      setShowSurvey(true);
  }

  const RegisterUser = async (surveyData) => {

      const payload = {
        ...formData,
        surveyForm: surveyData
      }

      try{
          const response = await fetch('http://127.0.0.1:8000/signup', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const response_json = await response.json();
        
        switch (response_json["code"]) {
          case 0:
            console.log(response_json["message"]);

            showSnackbar('User registered successfully', "success");

            // Clear the form data
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
          });
            
            break;
          case -1:
            showSnackbar(response_json["message"], "error");
            break;
          case 1:
            showSnackbar(response_json["message"], "warning");
            console.log(snackbarStatus);
            break;
          default:
            showSnackbar("Unknown error occurred", "error");
            break;
        }

      }
      catch (error) {
        console.error('Error registering user:', error);
        showSnackbar('Խնդրում ենք փորձեք մի փոքր ուշ', "error");
      }


  };


  return (
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Գրանցվել
          </Typography>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Անուն</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="John"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Ազգանուն</FormLabel>
              <TextField
                autoComplete="surname"
                name="surname"
                required
                fullWidth
                id="surname"
                placeholder="Smith"
                value={formData.surname}
                onChange={(e) => {
                  setFormData({ ...formData, surname: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Էլ․ փոստ</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Գաղտնաբառ</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={() => {
                if (validateInputs()) {
                  handleFormOpen();
                }
              }}
            >
              Գրանցվել
            </Button>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Արդեն գրանցված ե՞ք{' '}
              <Link
                variant="body2"
                sx={{ alignSelf: 'center' }}
                onClick={() => {
                  navigate('/login');
                }}
              >
                Մուտք գործել
              </Link>
            </Typography>
          </Box>

          {showSnackbar && (
            <AlertMsg
              open={openSnackbar}
              handleClose={handleCloseSnackbar}
              status={snackbarStatus}
              message={snackbarMessage}

            />
          )}

          {showSurvey && (
            <Survey
              open={showSurvey}
              handleClose={() => setShowSurvey(false)}
              formData={formData}
              onSubmit={RegisterUser}
            />
          )}
        </Card>
  );
}
