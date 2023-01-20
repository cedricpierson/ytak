import React, { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import AuthContext from '../context/AuthProvider';
import axios from './api/axios';
import jwt_decode from 'jwt-decode';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
// import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Stack } from '@mui/system';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

const LOGIN_URL = '/auth/signin';

const Signin = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();
  const router = useRouter();

  const { data: session } = useSession();

  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
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
  const handleSignOut = () => {
    signOut({ redirect: false });
    localStorage.removeItem(isAdmin, accessToken);
    document.cookie = `name=${response.data.accessToken}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
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

  const handleSignin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const isAdmin = response?.data?.isAdmin;
        setAuth({ email, password, accessToken, isAdmin });
        setEmail('');
        setPassword('');
        setSuccess(true);
      } catch (err) {
        if (!err.response) {
          setErrMsg('Chargement');
        } else if (err?.response.status === 400) {
          setErrMsg("Il manque l'email ou le mot de passe");
        } else if (err?.response.status === 401) {
          setErrMsg('Accès refusé');
        } else {
          setErrMsg('La connexion a échoué');
        }
        // errRef.current.focus();
      }
      let approved = false;
      const userData = {
        email: email,
        password: password,
      };
      axios.post(LOGIN_URL, userData).then((response) => {
        console.log(response.status);
        console.log(response.data);
        const decodedToken = response.data.accessToken ? jwt_decode(response.data.accessToken) : undefined;
        const isAdmin = decodedToken.isAdmin;
        if (response.status === 200) {
          router.push('/regarder');
        }
        if (isAdmin && isAdmin === true) {
          localStorage.setItem('isAdmin', true);
        }
        if (response.data.accessToken) {
          document.cookie = `name=${response.data.accessToken}`;
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
          approved = true;
          setStatus(true);
        }
      });
    }
  };

  return (
    <>
      {success && approved ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Alert severity="success">Vous êtes connecté</Alert>
        </Box>
      ) : (
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

                  <FormControl variant="standard">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        id="input-with-sx"
                        data="email"
                        ref={emailRef}
                        label="Adresse mail"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>
                  </FormControl>

                  <FormControl sx={{ ml: 4 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Mot de Passe</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      data="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      href="#"
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
      )}
    </>
  );
};

export default Signin;
