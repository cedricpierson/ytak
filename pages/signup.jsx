import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Gender from '../components/signup/Gender';
import DayOfBirth from '../components/signup/DayOfBirth';
import 'dayjs/locale/fr';

const Signup = () => {
  const [value, setValue] = useState(dayjs());
  const [values, setValues] = useState({
    email: '',
    password: '',
    lastname: '',
    firstname: '',
    dayOfBirth: { value },
    rememberMe: false,
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickSignUp = (e) => {
    e.preventDefault();
    const userData = {
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
      dayOfBirth: value.dayOfBirth,
      rememberMe: values.rememberMe,
    };
    axios.post('http://localhost:5000/auth/signup', userData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      console.log(response.data);
    });
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Animation Background */}
      <div class="bg" />
      <div class="bg bg2" />
      <div class="bg bg3" />
      <div class="content">
        <Stack
          style={{
            alignItems: 'center',
          }}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: { xs: '1rem', sm: '2rem' },
                backgroundColor: 'primary.lighter',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <Typography variant="h1" fontFamily="Expletus Sans" color="initial">
                  YTAK
                </Typography>
                <Typography variant="h3" fontFamily="Expletus Sans" color="initial">
                  Inscription
                </Typography>
                <Button
                  elevation={3}
                  data="signinGoogle"
                  sx={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  variant="contained"
                >
                  <GoogleIcon />
                </Button>
              </Box>

              {/* // Prénom + NOM */}
              <Stack sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="Prénom"
                  sx={{ width: { xs: 'auto', sm: '20ch' }, marginTop: '0.5rem' }}
                  onChange={handleChange('firstname')}
                />
                <TextField
                  id="demo-helper-text-misaligned-no-helper"
                  label="NOM"
                  sx={{ width: { xs: 'auto', sm: '30ch' }, marginTop: '0.5rem' }}
                  onChange={handleChange('lastname')}
                />
              </Stack>

              {/* Sexe */}
              {/* <Gender /> */}

              {/* Day of birth */}
              <DayOfBirth value={value} setValue={setValue} />

              {/* Email */}
              <FormControl variant="standard">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    data="username"
                    label="Adresse mail"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                </Box>
              </FormControl>

              {/* Password */}
              <FormControl variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Mot de Passe</InputLabel>
                <Input
                  id="standard-adornment-password"
                  data="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  spacing={2}
                >
                  <Button
                    elevation={3}
                    data="signup"
                    sx={{
                      width: '6rem',
                      height: '6rem',
                      borderRadius: '50%',
                      marginTop: '1.5rem',
                    }}
                    variant="contained"
                    onClick={handleClickSignUp}
                  >
                    S'inscrire
                  </Button>
                </Stack>
              </FormControl>
            </Box>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
};

export default Signup;
