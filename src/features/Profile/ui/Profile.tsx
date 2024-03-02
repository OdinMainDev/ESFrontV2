import React from 'react';
import { IGetMe, IGetMyPermissions } from '../models/getters';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getMe, getMyPermissions } from '../api/gettersApi';

const Profile = () => {
  const apiKey = Cookies.get("auth_token");
  if(!apiKey){
    return (<div></div>);
  }
    axios
      .get<IGetMe>(getMe(), {
        headers: {
          'Authorization': `Bearer: ${apiKey}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        
      })
      .finally(() => {
        
      });

      axios
      .get<IGetMyPermissions>(getMyPermissions(), {
        headers: {
          'Authorization': `Bearer: ${apiKey}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        
      })
      .finally(() => {
        
      });

  return (
    <div></div>
  );
};

export default Profile;
