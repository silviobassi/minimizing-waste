import Routes from './app/routes';

import { notification } from 'antd';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Authentication } from './auth/Auth';
import AuthService from './auth/Authorization.service';
import useAuth from './core/hooks/useAuth';
import useAuthPhoto from './core/hooks/useAuthPhoto';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fetchUser } = useAuth();
  const { fetchUserPhoto } = useAuthPhoto();

  useEffect(() => {
    async function identify() {
      const isInAuthorizationRoute = window.location.pathname === '/authorize';
      const code = new URLSearchParams(window.location.search).get('code');

      const codeVerifier = AuthService.getCodeVerifier();
      const accessToken = AuthService.getAccessToken();

      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthorizationRoute) {
        if (!code) {
          notification.error({
            message: 'Código não foi informado',
          });
          return;
        }

        if (!codeVerifier) {
          AuthService.imperativelySendToLogout();
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessTokens({
            code,
            codeVerifier,
            redirectUri: 'http://127.0.0.1:5173/authorize',
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        const decodedToken: Authentication.AccessTokenDecodedPayload =
          jwtDecode(access_token);
        fetchUser(decodedToken.user_id);
          fetchUserPhoto(decodedToken.user_id)
        navigate('/');
      }

      if (accessToken) {
        const decodedToken: Authentication.AccessTokenDecodedPayload =
          jwtDecode(accessToken);
        fetchUser(decodedToken.user_id);
        fetchUserPhoto(decodedToken.user_id)
      }
    }

    identify();
  }, [dispatch, navigate, fetchUser, fetchUserPhoto]);
  return <Routes />;
}

export default App;
