import * as React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { HashLink } from 'react-router-hash-link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon } from './CustomIcons';
import { useAuth } from '../AuthContext';
import AlertMsg from '../AlertMsg';
import { useNavigate } from 'react-router-dom';


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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState('');

  const {login} = useAuth();
  const navigate = useNavigate();


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

  const LoginUser = async () => {
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  });

  const response = await res.json();

  if (res.status == 200){

    login(response.user);
    navigate("/dashboard");
  }

  }

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Մուտք գործել
      </Typography>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Էլ․ փոստ</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }
            }
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Գաղտնաբառ</FormLabel>
            <Link
              component="button"
              type="button"
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Մոռացել եք գաղտնաբառը?
            </Link>
          </Box>
          <TextField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }
            }
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Հիշել գաղտնաբառը"
        />
        <ForgotPassword />
        <Button 
          type="button" fullWidth 
          variant="contained" 
          onClick={() => {
            if (validateInputs()) {
              LoginUser();
            }
            else{
              console.log("Invalid inputs");
            }
          }}>
          Մուտք գործել
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Դեռ գրանցված չե՞ք{' '}
          <span>
            <HashLink smooth
              to="/#signup"
              variant="body2"
              sx={{ alignSelf: 'center' }}
              replace = {true}
              
            >
              Գրանցվել
            </HashLink>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
