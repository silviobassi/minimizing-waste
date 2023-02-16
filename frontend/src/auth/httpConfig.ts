import Service from '../Service';
import AuthService from './Authorization.service';

Service.setRequestInterceptors(async (request) => {
  const storage = {
    accessToken: AuthService.getAccessToken()
  }

  const {accessToken} = storage

  if(accessToken){
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request;
});
