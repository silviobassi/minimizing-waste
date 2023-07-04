import axios from 'axios';
import jwtDecode from 'jwt-decode';
import pkceChallenge from 'pkce-challenge';

import { Authentication } from './Auth';

const decodedToken: Authentication.AccessTokenDecodedPayload = jwtDecode(
  'eyJ4NXQjUzI1NiI6ImNHT081RVVxRWxJTHZYeUZaaWN6c1U2ejZyNy10cnY0QWpKVDNFUEsxdjAiLCJraWQiOiJtaW5pbWl6aW5nd2FzdGUiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJzaWx2aW9iYXNzaTJAZ21haWwuY29tIiwiYXVkIjoibWluaW1pemluZy13ZWIiLCJuYmYiOjE2NzczNDg3MDMsInVzZXJfaWQiOiIxIiwic2NvcGUiOlsiUkVBRCIsIldSSVRFIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImV4cCI6MTY3NzM0OTYwMywiaWF0IjoxNjc3MzQ4NzAzLCJhdXRob3JpdGllcyI6WyJBUFBST1ZFX0FTU0lHTk1FTlRTIiwiRURJVF9VU0VSIiwiVkFDQVRFX0FTU0lHTk1FTlRTIiwiQ09OU1VMVF9TRUNUT1JTIiwiQ09OU1VMVF9VU0VSIiwiRURJVF9TRUNUT1JTIiwiRURJVF9BU1NJR05NRU5UUyIsIkVESVRfV09SS19TVEFUSU9OUyIsIkNPTlNVTFRfQVNTSUdOTUVOVFMiLCJDT05TVUxUX1NVUFBMSUVTIiwiQ09NUExFVEVfQVNTSUdOTUVOVFMiLCJHSVZFX0JBQ0tfQVNTSUdOTUVOVFMiLCJDT05TVUxUX1dPUktfU1RBVElPTlMiLCJFRElUX1NVUFBMSUVTIl19.CaEiNGLmeOp0dVeaz4WN0l_EDc1COXt5QLoCo9GnCkj0XCjGputVB-gLFjgsKl7MDBQTR7VaA0pJf-1lGWvkXEYzTg9D4svhUvRAb4gkgxQHksBTeIpd7l_6rM3F-lPhJ0ipqsZsfK29adUZd6DRwTe2MBIudRUT5YdsK3NQHdqGS4edPh3dhu2mO3K-9IuwTalfR401ZneXLKkG6NfCNBP2QTHcka3ce9pCdgGGFImJi-8QYOfUCki0ulHnublVrQiFlCaPjdRUvn_lV53T78jFAuRc4mkSdjv4wdQvrB7ban9K6O_gAi5thzGkNOv9bIwxmLdQsNx7HxJfsHLLbg',
);

import qs from 'qs';

const authServer = axios.create({
  baseURL: 'http://localhost:8080',
});

authServer.interceptors.response.use(undefined, async (error) => {
  if (error?.response?.status === 403) {
    console.log('entrou');
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
    window.location.href = `http://localhost:8080/logout?redirect=http://127.0.0.1:5173/`;
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
          Authorization: `Basic ${btoa('minimizing-web:web123')}`,
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
      code_verifier: 'ABC123',
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    };

    const encodedData = qs.stringify(data);

    return authServer
      .post<OAuthAuthorizationTokenResponse>('/oauth2/token', encodedData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa('minimizing-web:web123')}`,
        },
      })
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: 'code',
      client_id: 'minimizing-web',
      state: 'abc',
      redirect_uri: `${window.location.origin}/authorize`,
      scope: 'READ WRITE',
      code_challenge: '4L69IoGZk0JYFIZrYnAeKRnqJvE3BJnBA3tTudScLIo',
      code_challenge_method: 'S256',
    });

    return `http://localhost:8080/oauth2/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    const { code_challenge, code_verifier } = await pkceChallenge();
    this.setCodeVerifier(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge);
    console.log(loginUrl);
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
