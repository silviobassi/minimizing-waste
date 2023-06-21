import { File } from '../@types/File';
import Service from '../Service';

class FileService extends Service {
  private static uploadFileToSignedUrl(signedUrl: string, file: File) {
    return this.Http.put<{}>(signedUrl, file, {
      headers: { 'Content-Type': file.type },
    }).then(this.getData);
  }

  static async updatePhoto(file: File, userPhotoId: number) {
    const formData = new FormData();
    formData.append('description', file.name);
    formData.append('file', file);
    return this.Http.put<File.UploadRequest>(
      `/users/${userPhotoId}/photo`,
      formData,
    ).then(this.getData);
  }

  static getUserPhoto(userPhotoId: number): any {
    return this.Http.get<File.UploadRequest>(
      `/users/${userPhotoId}/photo/recovered`,
    ).then(this.getData);
  }

  static async upload(file: File) {
    return file;
  }
}

export default FileService;
