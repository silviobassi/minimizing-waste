
import { User } from '../@types';
import { File } from '../@types/File';
import Service from '../Service';

class FileService extends Service {

  static async updatePhoto(file: File, userPhotoId: number) {
    const formData = new FormData();
    formData.append('description', file.name);
    formData.append('file', file);
    return this.Http.put<File.UploadRequest>(
      `/users/${userPhotoId}/photo`,
      formData,
    ).then(this.getData);
  }

  static getUserPhoto(userPhotoId: number){
    return this.Http.get<User.Avatar>(`/users/${userPhotoId}/photo/recovered`).then(
      this.getData,
    );
  }

}

export default FileService;
