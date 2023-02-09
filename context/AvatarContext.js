import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AvatarContext = createContext({});

export default AvatarContext;

export const AvatarContextProvider = ({ children }) => {
  const [values, setValues] = useState({
    currentUser: {},
  });
  const [image, setImage] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwt_decode(token);
      var config = {
        headers: {
          'x-accessToken': token,
        },
      };

      axios.get(`http://localhost:5001/api/users/${decoded.id}`, config).then((response) => {
        setValues({ ...values, currentUser: response.data });
        {
          window.localStorage.getItem('accessToken');
          setImage(values?.currentUser?.imageUrl);
        }
      });
    }
  }, [image]);

  return <AvatarContext.Provider value={{ image, values }}>{children}</AvatarContext.Provider>;
};
