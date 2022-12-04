/**
 * @app VuonDau
 * @author phutruongck
 */

import {useCookies as useCookiesBase} from 'react-cookie';

const cookieTags = {
  token: '@course/token',
  user: '@course/user',
};

const useCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookiesBase([
    cookieTags.user,
    cookieTags.token,
  ]);

  const setToken = (value?: string) => {
    setCookie(cookieTags.token, value, {
      maxAge: 2 * 60 * 1000,
      path: '/',
    });
  };

  const token = cookies[cookieTags.token];

  const setUserData = (value?: any) => {
    setCookie(cookieTags.user, value, {
      maxAge: 2 * 60 * 1000,
      path: '/',
    });
  };

  const userData = cookies[cookieTags.user];

  const removeAll = () => {
    removeCookie(cookieTags.token, {
      path: '/',
    });
    removeCookie(cookieTags.user, {
      path: '/',
    });
  };

  return {
    setUserData,
    removeAll,
    setToken,
    userData,
    token,
  };
};

export {useCookies};
