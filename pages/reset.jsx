import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  MuiAlert,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { Stack } from '@mui/system';
import DayOfBirth from '../components/signup/DayOfBirth';
import 'dayjs/locale/fr';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const SignupSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Obligatoire'),
});

const Reset = () => {
  const router = useRouter();
  const [values, setValues] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5001/auth/reset', values);
        if (response.status === 200) {
          // password reset was successful, you can redirect the user to the login page
          router.push('/signin');
        }
      } catch (error) {
        console.error(error);
        // handle the error
      }
    },
  });

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleChangeVerify = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowPasswordVerify = () => {
    setValues({
      ...values,
      showPasswordVerify: !values.showPasswordVerify,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  // const handleClickReset = (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     email: formik.values.email,
  //   };

  //   axios
  //     .post('http://localhost:5001/auth/reset', userData)
  //     .then((response) => {
  //       console.warn(response.status);
  //       if (response.status === 200) {
  //         router.push('signin');
  //       }
  //     })
  //     .catch((error) => console.warn(error.message));
  // };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Animation Background */}
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <div className="content">
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
                  Mot de passe oublié
                </Typography>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                {/* Email */}
                <FormControl variant="standard" required>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginTop: '1rem' }}>
                    <TextField
                      required
                      sx={{ width: '35ch' }}
                      id="input-with-sx"
                      data="username"
                      label="Adresse mail"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      name="email"
                      error={formik.errors.email}
                      helperText={formik.errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle sx={{ color: 'action.active' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      type="submit"
                      // onClick={handleClickReset}
                      // disabled={formik.isSubmitting}
                      elevation={3}
                      data="signup"
                      sx={{
                        width: '6rem',
                        height: '6rem',
                        borderRadius: '50%',
                        marginTop: '1.5rem',
                      }}
                      variant="contained"
                    >
                      Envoyer
                    </Button>
                  </Stack>
                </FormControl>
              </form>
            </Box>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
};

export default Reset;
