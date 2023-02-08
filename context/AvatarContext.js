import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext({});

export default AuthContext;

export const AvatarContextProvider = ({ children }) => {
  const [values, setValues] = useState({
    currentUser: {},
  });
  const [image, setImage] = useState('');
  const token = localStorage.getItem('accessToken');
  const decoded = jwt_decode(token);
  var config = {
    headers: {
      'x-accessToken': token,
    },
  };
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

  const imgProfil = async () => {
    await axios.get(`http://localhost:5001/api/users/${decoded.id}`, config).then((response) => {
      setValues({ ...values, currentUser: response.data });
      {
        localStorage.setItem('accessToken');
        setImage(values.currentUser.imageUrl);
      }
    });
  };

  return <AuthContext.Provider value={{ image, values }}>{children}</AuthContext.Provider>;
};
