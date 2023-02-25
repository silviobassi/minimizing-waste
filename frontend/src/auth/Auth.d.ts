export declare namespace Authentication {
  export type AccessTokenDecodedPayload = {
    sub: string;
    aud: string;
    nbf: number;
    user_id: number;
    scope: string[];
    iss: string;
    exp: number;
    iat: number;
    authorities: string[];
  };
}
