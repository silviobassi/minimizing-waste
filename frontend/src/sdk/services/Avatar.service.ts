import { Avatar } from '../@types';
import Service from '../Service';

class AvatarService extends Service {
  static upload(avatar: Avatar.Input): Avatar.Url {
    const formData = new FormData();
    formData.append('file', avatar);
    return this.Http.post<Avatar.Url>('/users/upload/avatar', formData).then(
      this.getData,
    );
  }
}

export default AvatarService;
