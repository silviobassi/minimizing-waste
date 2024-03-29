import axios from 'axios';
import pkceChallenge from 'pkce-challenge';

import qs from 'qs';

const APP_CLIENT_URI = import.meta.env.VITE_REACT_APP_CLIENT_URI;
const APP_AUTH_SERVER = import.meta.env.VITE_REACT_APP_AUTH_SERVER;
const APP_CLIENT_ID = import.meta.env.VITE_REACT_APP_CLIENT_ID
const APP_CLIENT_PASSWORD = import.meta.env.VITE_REACT_APP_CLIENT_PASSWORD
const APP_STATE = import.meta.env.VITE_REACT_APP_STATE

const authServer = axios.create({
  baseURL: APP_AUTH_SERVER,
});

authServer.interceptors.response.use(undefined, async (error) => {
  if (
    error?.response?.status === 401 ||
    (error?.response?.status === 400 &&
      error?.response?.data?.error == 'invalid_grant')
  ) {
    AuthService.imperativelySendToLogout();
  }

  return Promise.reject(error);
});

export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer' | string;
  expires_in: number;
  scope: string;
  [key: string]: string | number;
}

export default class AuthService {
  public static imperativelySendToLogout() {
    window.localStorage.clear();
    window.location.href = `${APP_AUTH_SERVER}/logout?redirect=${APP_CLIENT_URI}`;
  }

  public static async renewToken(config: {
    refreshToken: string;
    codeVerifier: string;
  }) {
    const formUrlEncoded = qs.stringify({
      refresh_token: config.refreshToken,
      code_verifier: config.codeVerifier,
      grant_type: 'refresh_token',
    });

    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth2/token', formUrlEncoded, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${APP_CLIENT_ID}:${APP_CLIENT_PASSWORD}`)}`,
        },
      })
      .then((res) => res.data);
  }

  public static async getFirstAccessTokens(config: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }) {
    const data = {
      code: config.code,
      code_verifier: config.codeVerifier,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    };

    const encodedData = qs.stringify(data);

    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth2/token', encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${APP_CLIENT_ID}:${APP_CLIENT_PASSWORD}`)}`,
        },
      })
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: APP_CLIENT_ID,
      state: APP_STATE,
      redirect_uri: `${window.location.origin}/authorize`,
      scope: 'READ WRITE',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return `${APP_AUTH_SERVER}/oauth2/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    const { code_challenge, code_verifier } = await pkceChallenge();
    this.setCodeVerifier(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge);

    // imperativo
    // gera efeito colateral
    window.location.href = loginUrl;
  }

  public static getAccessToken() {
    return window.localStorage.getItem('accessToken');
  }
  public static setAccessToken(token: string) {
    return window.localStorage.setItem('accessToken', token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem('refreshToken');
  }
  public static setRefreshToken(token: string) {
    return window.localStorage.setItem('refreshToken', token);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem('codeVerifier');
  }
  public static setCodeVerifier(getCodeVerifier: string) {
    return window.localStorage.setItem('codeVerifier', getCodeVerifier);
  }
}
