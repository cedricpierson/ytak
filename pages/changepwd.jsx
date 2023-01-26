import React, { useState, useEffect } from 'react';
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
  password: Yup.string()
    .required('Obligatoire')
    .min(8, 'Le mot de passe doit avoir au moins 8 charactères')
    .matches(/[0-9]/, 'Le mot de passe doit contenir un nombre')
    .matches(/[a-z]/, 'Le mot de passe doit contenir une lettre minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir une lettre majuscule')
    .matches(/[^\w]/, 'Le mot de passe doit contenir un symbole'),
  changepassword: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Les mots de passe doivent être identiques'),
  }),
});

const Changepwd = () => {
  const [values, setValues] = useState({
    showPassword: false,
    showPasswordVerify: false,
  });
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const resetTokenUrl = searchParams.get('resetToken');
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      changepassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
  const handleClickSignUp = (e) => {
    e.preventDefault();
    const userData = {
      email: formik.values.email,
      password: formik.values.password,
    };

    axios
      .post('http://localhost:5001/auth/changepwd', userData)
      .then((response) => {
        console.warn(response.status);
      })
      .then(router.push('signin'));
  };

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
                  Changement Mot de Passe
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

              <form>
                <FormControl variant="standard" required>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '1rem' }}>
                    <TextField
                      required
                      fullWidth
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
                          <InputAdornment position="end">
                            <AccountCircle
                              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </FormControl>
                {/* Password */}
                <FormControl variant="standard">
                  <TextField
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    required
                    label="Mot de Passe"
                    autoComplete="on"
                    data="password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    helperText={formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl variant="standard" sx={{ marginTop: '1rem' }}>
                  <InputLabel htmlFor="standard-adornment-password-verify" />
                  <TextField
                    id="standard-adornment-password-verify"
                    required
                    type={values.showPasswordVerify ? 'text' : 'password'}
                    data="changepassword"
                    fullWidth
                    name="changepassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange('changepassword')}
                    value={formik.values.changepassword}
                    label="Confirmer mot de Passe"
                    autoComplete="on"
                    error={formik.errors.changepassword}
                    helperText={formik.errors.changepassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordVerify}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {formik.values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>

                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  spacing={2}
                >
                  <Button
                    type="submit"
                    onClick={/*() => formik.validateForm().then(() => */ handleClickSignUp}
                    disabled={formik.isSubmitting}
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
                    S'inscrire
                  </Button>
                </Stack>
              </form>
            </Box>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
};

export default Changepwd;
