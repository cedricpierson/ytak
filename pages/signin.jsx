import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
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
import Image from 'next/image';

const Signin = () => {
  const { data: session } = useSession();

  const [values, setValues] = useState({
    userName: '',
    password: '',
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

  const handleOAuthSignIn = (provider) => () => {
    signIn(provider);
  };
  const handleSignOut = () => {
    signOut({ redirect: false });
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
  return (
    <Container>
      <div class="bg" />
      <div class="bg bg2" />
      <div class="bg bg3" />
      <div class="content">
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
                  <Button
                    elevation={3}
                    data="signinGitHub"
                    sx={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      marginTop: '2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    variant="contained"
                    onClick={handleOAuthSignIn('github')}
                  >
                    <GitHubIcon />
                  </Button>
                </Box>
              </Box>
              <FormControl variant="standard">
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    data="email"
                    label="Adresse mail"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange('email')}
                  />
                </Box>
              </FormControl>

              <FormControl sx={{ ml: 4 }} variant="standard">
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
                <Link sx={{ display: 'flex', justifyContent: 'flex-end' }} data="forgotten" href="#" underline="hover">
                  <Typography variant="body2">Mot de passe oublié</Typography>
                </Link>

                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Se souvenir de moi" data="remember" />
                </FormGroup>
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
                    elevation={3}
                    data="signin"
                    sx={{ width: '6rem', height: '6rem', borderRadius: '50%' }}
                    variant="contained"
                    onClick={() => signIn()}
                  >
                    Entrer
                  </Button>
                  <Link href="/account">
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
