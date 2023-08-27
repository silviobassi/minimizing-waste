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

  static remove(filename: string) {
    return this.Http.delete<void>(`/users/remove/avatar/${filename}`).then(
      this.getStatus,
    );
  }
}

export default AvatarService;
