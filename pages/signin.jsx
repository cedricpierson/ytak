import React, { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AuthContext from '../context/AuthProvider';
import axios from './api/axios';
import jwt_decode from 'jwt-decode';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Alert,
  Button,
  Container,
  IconButton,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

const LOGIN_URL = '/auth/signin';

const Signin = () => {
  const SigninSchema = Yup.object({
    email: Yup.string().email('Email invalide').required('Obligatoire'),
    password: Yup.string()
      .required('Obligatoire')
      .min(8, 'Le mot de passe doit avoir au moins 8 charactères')
      .matches(/[0-9]/, 'Le mot de passe doit contenir un nombre')
      .matches(/[a-z]/, 'Le mot de passe doit contenir une lettre minuscule')
      .matches(/[A-Z]/, 'Le mot de passe doit contenir une lettre majuscule')
      .matches(/[^\w]/, 'Le mot de passe doit contenir un symbole'),
  });

  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();
  const router = useRouter();

  const { data: session } = useSession();

  const [status, setStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setStatus(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOAuthSignIn = (provider) => () => {
    signIn(provider);
  };
  const handleWelcome = () => {
    router.push('/regarder');
  };
  const handleSignOut = () => {
    signOut({ redirect: false });
    localStorage.removeItem('isAdmin', 'accessToken');
  };
  let userData = {
    email: formik.values.email,
    password: formik.values.password,
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
  //If Google authentication's session is open, say Welcome:
  if (session) {
    return (
      <Container>
        <div className="bg" />
        <div className="bg bg2" />
        <div className="bg bg3" />
        <div className="content">
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
                  borderRadius: '0.5rem',
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
                  onClick={() => handleWelcome()}
                  elevation={3}
                  sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'primary.darker',
                    color: 'white',
                  }}
                >
                  Vers les Masterclasses
                </Button>
                <Button
                  onClick={() => handleSignOut()}
                  elevation={3}
                  data="signoutGoogle"
                  sx={{
                    marginTop: '0.5rem',
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
        </div>
      </Container>
    );
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      axios
        .post(LOGIN_URL, userData)
        .then((response) => {
          const accessToken = response?.data?.accessToken;
          if (accessToken) {
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            setStatus(true);
          }
          const decodedToken = accessToken ? jwt_decode(accessToken) : undefined;
          const isAdmin = decodedToken.isAdmin;
          if (isAdmin && isAdmin === true) {
            localStorage.setItem('isAdmin', true);
          }
          const email = userData.email;
          const password = userData.password;
          setAuth({ email, password, accessToken, isAdmin });
          setErrMsg('Connexion . . .');
          setSuccess(true);
          if (response.status === 200) {
            router.push('/regarder');
          }
        })
        .catch((err) => {
          if (!err.response) {
            setStatus(true);
            setErrMsg('Connexion . . .');
          } else if (err.response.status == 400) {
            setStatus(true);
            setErrMsg('Erreur');
          } else if (err.response.status == 401) {
            setStatus(true);
            setErrMsg('Mot de passe invalide');
          } else if (err.response.status == 404) {
            setStatus(true);
            setErrMsg("Vérifiez l'adresse email");
          } else {
            setStatus(true);
            setErrMsg('La connexion a échoué . . .');
          }
        });
    }
  };
  return (
    <Container>
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <div className="content">
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
                flexDirection: 'column',
                padding: '5rem',
                backgroundColor: 'primary.lighter',
                borderRadius: '0.5rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Typography variant="h1" fontFamily="Expletus Sans" color="initial">
                  YTAK
                </Typography>
                <Typography variant="h3" fontFamily="Expletus Sans" color="initial">
                  Bienvenue à vous
                </Typography>
                <Box style={{ display: 'flex' }}>
                  <Button
                    elevation={3}
                    data="signinGoogle"
                    sx={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      marginTop: '2rem',
                      marginX: '0.5rem',
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
              </Box>
              {success ? (
                <Snackbar
                  open={status}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
                >
                  <Alert severity="success">Vous êtes connecté !</Alert>
                </Snackbar>
              ) : errMsg ? (
                <Snackbar
                  open={status}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
                >
                  {errMsg == 'Connexion . . .' ? (
                    <Alert severity="success" ref={errRef}>
                      {errMsg}
                    </Alert>
                  ) : (
                    <Alert severity="error" ref={errRef}>
                      {errMsg}
                    </Alert>
                  )}
                </Snackbar>
              ) : undefined}

              <FormControl variant="standard">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    data="email"
                    ref={emailRef}
                    label="Adresse mail"
                    variant="standard"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    name="email"
                    error={formik.errors.email}
                    helperText={formik.errors.email}
                  />
                </Box>
              </FormControl>

              <FormControl sx={{ ml: 4 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Mot de Passe</InputLabel>
                <Input
                  id="standard-adornment-password"
                  data="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                  helperText={formik.errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Link
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  data="forgotten"
                  href="/reset"
                  underline="hover"
                >
                  <Typography variant="body2">Mot de passe oublié</Typography>
                </Link>
                <Stack
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                  }}
                  spacing={2}
                  direction="row"
                >
                  <Button
                    type="submit"
                    elevation={3}
                    data="signin"
                    sx={{ width: '6rem', height: '6rem', borderRadius: '50%' }}
                    variant="contained"
                    onClick={handleSignin}
                  >
                    Entrer
                  </Button>
                  <Link href="/signup">
                    <Button
                      variant="text"
                      data="signup"
                      sx={{
                        width: '6rem',
                        height: '6rem',
                        borderRadius: '50%',
                        color: 'secondary.main',
                      }}
                    >
                      S'inscrire
                    </Button>
                  </Link>
                </Stack>
              </FormControl>
            </Box>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
};

export default Signin;
