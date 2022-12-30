import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import { motion } from 'framer-motion';
import {
  Button,
  Card,
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

const Account = () => {
  return (
    <Container sx={{ display: '-ms-grid' }}>
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
          <Typography variant="h1" fontFamily="Expletus Sans" color="grey.800">
            YTAK
          </Typography>
          <Typography variant="h2" color="grey.100" margin="1rem">
            Faites votre choix
          </Typography>
          <Stack sx={{ flexDirection: { sm: 'column', md: 'row' } }}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.1 }}
              style={{ zIndex: '1', backgroundColor: 'grey.800' }}
            >
              <Link href="/signup" data="basic" style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ margin: '0.3rem' }}>
                  <Button
                    sx={{
                      '&:hover': {
                        backgroundColor: 'grey.800',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '300px',
                      paddingX: '3rem',
                      paddingY: '1.5rem',
                      backgroundColor: 'primary.dark',
                      borderRadius: '5px',
                    }}
                  >
                    <Typography variant="h3" color="grey.0" marginBottom="1rem">
                      BASIC
                    </Typography>
                    <ul>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          Une offre pour tous
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          Accès à 100% du contenu
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          Les meilleurs cours
                        </Typography>
                      </li>
                    </ul>
                  </Button>
                </Paper>
              </Link>
            </motion.div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Poppins',
                  color: 'grey.0',
                }}
              >
                ou
              </Typography>
            </Box>
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 1.1 }} style={{ zIndex: '1' }}>
              <Link href="/signup" data="vip" style={{ textDecoration: 'none' }}>
                <Paper elevation={3} sx={{ margin: '0.3rem' }}>
                  <Button
                    sx={{
                      '&:hover': {
                        backgroundColor: 'grey.800',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',

                      width: '300px',
                      paddingX: '3rem',
                      paddingY: '1.5rem',
                      backgroundColor: 'secondary.dark',
                      borderRadius: '5px',
                    }}
                  >
                    <Typography variant="h3" color="grey.0" marginBottom="1rem">
                      VIP
                    </Typography>

                    <ul>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          Une offre personnalisée
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          Accès au Live Hebdo
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 'light',
                            color: 'grey.0',
                          }}
                        >
                          1h hebdo cours perso
                        </Typography>
                      </li>
                    </ul>
                  </Button>
                </Paper>
              </Link>
            </motion.div>
          </Stack>
        </Stack>
      </div>
    </Container>
  );
};

export default Account;
