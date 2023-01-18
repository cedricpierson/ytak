import React, { useState } from 'react';
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
  firstname: Yup.string().min(2, 'Trop court!').max(50, 'Trop long!').required('Obligatoire'),
  lastname: Yup.string().min(2, 'Trop court!').max(50, 'Trop long!!').required('Obligatoire'),
  birthday: Yup.date().max(dayjs()).required('Obligatoire'),
  email: Yup.string().email('Email invalide').required('Obligatoire'),
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

const Signup = () => {
  const [birthday, setBirthday] = useState(dayjs());
  const [values, setValues] = useState({
    showPassword: false,
    showPasswordVerify: false,
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      birthday: dayjs(),
      email: '',
      password: '',
      isPremium: false,
      isAdmin: false,
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
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      dayOfBirth: dayjs(formik.values.birthday).format('YYYY-MM-DD'),
      email: formik.values.email,
      password: formik.values.password,
      isPremium: false,
      isAdmin: false,
    };
    console.log(userData.isPremium);

    axios.post('http://localhost:5001/auth/signup', userData).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
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

              <form>
                {/* // Prénom + NOM */}
                <Stack sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    required
                    id="demo-helper-text-misaligned-no-helper-firstname"
                    name="firstname"
                    label="Prénom"
                    type="text"
                    value={formik.values.firstname}
                    error={formik.errors.firstname}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    sx={{ width: { xs: 'auto', sm: '20ch' }, marginTop: '0.5rem' }}
                    helperText={formik.errors.firstname}
                  />
                  <TextField
                    required
                    type="text"
                    name="lastname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    id="demo-helper-text-misaligned-no-helper-lastname"
                    label="NOM"
                    sx={{ width: { xs: 'auto', sm: '30ch' }, marginTop: '0.5rem' }}
                    error={formik.errors.lastname}
                    helperText={formik.errors.lastname}
                  />
                </Stack>

                {/* Day of birth */}

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <Stack spacing={3}>
                    <Box sx={{ display: { xs: 'block', sm: 'none' }, marginTop: '1rem' }}>
                      <MobileDatePicker
                        required
                        disableFuture
                        type="date"
                        dateFormat="dd, mm, yyyy"
                        label="Date de naissance"
                        value={formik.values.birthday}
                        onBlur={formik.handleBlur}
                        onChange={(value) => {
                          formik.setFieldValue('birthday', Date.parse(value));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        error={formik.errors.birthday}
                        helperText={formik.errors.birthday}
                      />
                    </Box>

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <DesktopDatePicker
                        required
                        disableFuture
                        type="date"
                        label="Date de naissance"
                        format="MM/dd/yyyy"
                        value={formik.values.birthday}
                        minDate={dayjs('1900-01-01')}
                        maxDate={dayjs()}
                        onBlur={formik.handleBlur}
                        onChange={(value) => {
                          formik.setFieldValue('birthday', Date.parse(value));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        error={formik.errors.birthday}
                        helperText={formik.errors.birthday}
                      />
                    </Box>
                  </Stack>
                </LocalizationProvider>

                {/* Email */}
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

                  {/* Password */}
                  <FormControl variant="standard" sx={{ marginTop: '1rem' }}>
                    <TextField
                      id="standard-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      required
                      fullWidth
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
                      label="Confirmer votre mot de Passe"
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

export default Signup;
