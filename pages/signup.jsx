import React, { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AuthContext from '../context/AuthProvider';

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
  const { data: session } = useSession();
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  const { setAuth } = useContext(AuthContext);

  const [values, setValues] = useState({
    showPassword: false,
    showPasswordVerify: false,
  });
  const router = useRouter();

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

  const handleOAuthSignIn = (provider) => () => {
    signIn(provider);
  };
  const handleSignOut = () => {
    signOut({ redirect: false });
    localStorage.removeItem('isAdmin', 'accessToken');
    // document.cookie = `name=${response.data.accessToken}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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
  function getTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    return titleCase;
  }
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

    axios
      .post(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/auth/signup`, userData)
      .then((response) => {
        console.warn(response.status);
      })
      .then(router.push('signin'));
  };
  if (session) {
    return (
      <Stack
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Paper elevation={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '2rem',
              backgroundColor: 'primary.lighter',
            }}
          >
            <img
              src={session.user.image}
              width="56"
              height="56"
              alt=""
              style={{ borderRadius: '50%', marginBottom: '1rem' }}
            />
            <Typography variant="h3" fontFamily="Expletus Sans" color="initial" textAlign="center">
              Bienvenue {getTitleCase(session.user.name)} <br />
            </Typography>
            <Button
              onClick={() => handleSignOut()}
              elevation={3}
              data="signoutGoogle"
              sx={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey.700',
                color: 'white',
              }}
            >
              Se déconnecter
            </Button>
          </Box>
        </Paper>
      </Stack>
    );
  }
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
                  onClick={handleOAuthSignIn('google')}
                >
                  <GoogleIcon />
                </Button>
              </Box>
              {errMsg ? (
                <Snackbar
                  open={status}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
                >
                  <Alert severity="error" ref={errRef}>
                    {errMsg}
                  </Alert>
                </Snackbar>
              ) : undefined}
              <form>
                {/* // Prénom + NOM */}
                <Stack>
                  <TextField
                    required
                    fullWidth
                    id="demo-helper-text-misaligned-no-helper-firstname"
                    name="firstname"
                    label="Prénom"
                    type="text"
                    value={formik.values.firstname}
                    error={formik.errors.firstname}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    sx={{ marginTop: '0.5rem' }}
                    helperText={formik.errors.firstname}
                  />
                </Stack>
                <Stack>
                  <TextField
                    required
                    type="text"
                    name="lastname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    id="demo-helper-text-misaligned-no-helper-lastname"
                    label="NOM"
                    sx={{ marginTop: '0.5rem' }}
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
