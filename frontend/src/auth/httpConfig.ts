import axios from 'axios';
import Service from '../Service';
import AuthService from './Authorization.service';

Service.setRequestInterceptors(async (request) => {
  const accessToken = AuthService.getAccessToken();

  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return request;
});

Service.setResponseInterceptors(
  (response) => response,
  async (error) => {
    console.dir(error);

    // recupera informações da requisição
    const originalRequest = error.config;

    // Caso o erro seja de autenticação e ainda não foi feito o retry
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // recupera o code verifier e o refresh token
      const storage = {
        codeVerifier: AuthService.getCodeVerifier(),
        refreshToken: AuthService.getRefreshToken(),
      };

      const { codeVerifier, refreshToken } = storage;

      // Caso algum não exista, não é possível renovar o token
      if (!refreshToken || !codeVerifier) {
        window.alert('TODO: IMPLEMENTAR LOGOUT');
        return;
      }

      // Renova o token
      const tokens = await AuthService.renewToken({
        codeVerifier,
        refreshToken,
      });

      // Armazena os tokens para novas requisições
      AuthService.setAccessToken(tokens.access_token);
      AuthService.setRefreshToken(tokens.refresh_token);

      // Implementa o token na requisição
      originalRequest.headers[
        'Authorization'
      ] = `Bearer ${tokens.access_token}`;

      // Retorna uma nova chamada do axios com essa requisição
      return axios(originalRequest);
    }
  },
);
