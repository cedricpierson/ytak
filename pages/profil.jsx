import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import NavMarquee from '../components/navMarquee';
import AvatarMenu from '../components/AvatarMenu';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Stack } from '@mui/system';
import 'dayjs/locale/fr';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, compareAsc } from 'date-fns';
import jwt_decode from 'jwt-decode';

const ProfilChange = Yup.object({
  firstname: Yup.string().min(2, 'Trop court!').max(50, 'Trop long!').required('Obligatoire'),
  lastname: Yup.string().min(2, 'Trop court!').max(50, 'Trop long!!').required('Obligatoire'),
  birthday: Yup.date().max(dayjs()).required('Obligatoire'),
  email: Yup.string().email('Email invalide').required('Obligatoire'),
  password: Yup.string()
    .required('Obligatoire')
    .min(8, 'Le mot de passe doit avoir au moins 8 charactères')
    .matches(/[0-9]/, 'Le mot de passe doit contenir un nombre')
    .matches(/[a-z]/, 'Le mot de pasimport jwt_decode from "jwt-decode";se doit contenir une lettre minuscule')
    .matches(/[A-Z]/, 'Le mot de passe doit contenir une lettre majuscule')
    .matches(/[^\w]/, 'Le mot de passe doit contenir un symbole'),
  changepassword: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], 'Les mots de passe doivent être identiques'),
  }),
});

const Profil = () => {
  const inputRef = useRef();
  const [errors, setErrors] = useState();
  const [avatar, setAvatar] = useState();
  const [msg, setMsg] = useState();
  const [decoded, setDecoded] = useState();
  const [image, setImage] = useState(false);
  const [birthday, setBirthday] = useState(dayjs());
  const [values, setValues] = useState({
    currentUser: {},
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const decoded = jwt_decode(token);
    var config = {
      headers: {
        'x-accessToken': token,
      },
    };
    axios.get(`http://localhost:5001/api/users/${decoded.id}`, config).then((response) => {
      setValues({ ...values, currentUser: response.data });
    });
  }, [image]);

  console.log(values);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: values.currentUser?.firstname,
      lastname: values.currentUser?.lastname,
      birthday: values.currentUser?.dayOfBirth ? format(new Date(values.currentUser.dayOfBirth), 'yyyy-MM-dd') : '',
      email: values.currentUser?.email,
      imageUrl: values.currentUser?.imageUrl,
    },
    validationSchema: ProfilChange,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClickProfilUp = (e) => {
    e.preventDefault();
    const userData = {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      dayOfBirth: dayjs(formik.values.birthday).format('YYYY-MM-DD'),
      email: formik.values.email,
    };

    const token = localStorage.getItem('accessToken');
    const decoded = jwt_decode(token);
    axios
      .put(`http://localhost:5001/api/users/${decoded.id}`, userData)
      .then((response) => {
        setMsg('Les informations ont été mise à jour');
        console.warn(response.status);
      })
      .then(router.push('profil'));
  };

  const hOnChange = (evt) => {
    evt.preventDefault();
    if (inputRef.current.files[0].size >= 1000000) {
      setErrors('Le fichier est trop volumineux !');
      console.log(size);
    } else {
      setAvatar('Avatar mis à jour');
      const formData = new FormData();
      formData.append('avatar', inputRef.current.files[0]);
      const token = localStorage.getItem('accessToken');
      const decoded = jwt_decode(token);

      axios.post(`http://localhost:5001/api/users/avatar/${decoded.id}`, formData).then(() => {
        setImage(true);
      });
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Animation Background */}
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <div className="content">
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div class="content">
            <Box sx={{ margin: '2rem 3.2rem 1.5rem 1.8rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: 'grey.800',
                  borderRadius: '10px 50px 50px 10px',
                  height: '80px',
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.01,
                    transition: {
                      default: { ease: 'linear' },
                    },
                  }}
                >
                  <Link href="/regarder">
                    <Button
                      sx={{
                        height: '75px',
                        backgroundColor: 'primary.dark',
                        margin: '0.2rem',
                        '&:hover': {
                          backgroundColor: 'secondary.dark',
                        },
                      }}
                    >
                      <Typography variant="h1" fontFamily="Expletus Sans" color="initial">
                        YTAK
                      </Typography>
                    </Button>
                  </Link>
                </motion.div>
                <NavMarquee />

                {/* <AvatarMenu /> */}
              </Box>
              <Stack style={{ marginTop: '1rem', alignItems: 'center' }}>
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
                        Profil
                      </Typography>
                    </Box>

                    <form encType="multipart/form-data">
                      {/* AVATAR */}
                      <Stack>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          justifyContent="center"
                          onChange={hOnChange}
                        >
                          <input hidden accept="image/*" type="file" name="avatar" ref={inputRef} />

                          <Avatar
                            alt="avatar"
                            src={`http://localhost:5001/${values?.currentUser?.imageUrl}`}
                            sx={{
                              width: '6rem',
                              height: '6rem',
                              borderRadius: '50%',
                              marginTop: '1.5rem',
                            }}
                          >
                            <PhotoCamera />
                          </Avatar>
                        </IconButton>
                      </Stack>
                    </form>
                    <Typography>
                      {errors}
                      {avatar}
                    </Typography>

                    <form>
                      {/* Prénom + NOM */}
                      <Stack>
                        <TextField
                          required
                          fullWidth
                          id="demo-helper-text-misaligned-no-helper-firstname"
                          name="firstname"
                          label="Prénom"
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                          InputLabelProps={{
                            shrink: true,
                          }}
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
                            InputLabelProps={{
                              shrink: true,
                            }}
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
                      <Stack
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        spacing={2}
                      >
                        <Button
                          type="submit"
                          onClick={/*() => formik.validateForm().then(() => */ handleClickProfilUp}
                          disabled={formik.isSubmitting}
                          elevation={3}
                          data="profil"
                          sx={{
                            width: '6rem',
                            height: '6rem',
                            borderRadius: '50%',
                            marginTop: '1.5rem',
                          }}
                          variant="contained"
                        >
                          Enregistrer
                        </Button>
                        {msg}
                      </Stack>
                    </form>
                  </Box>
                </Paper>
              </Stack>
            </Box>
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default Profil;