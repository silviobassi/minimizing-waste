import { Permission } from '../@types';
import Service from '../Service';

class PermissionService extends Service {
  static getAllPermissions(): Permission.CollectionDetailedModel {
    return this.Http.get<Permission.CollectionDetailedModel>(
      '/roles/permissions',
    ).then(this.getData);
  }

  static getAllPermissionsAllNotGranted(
    roleId: number,
  ): Permission.CollectionDetailedModel {
    return this.Http.get<Permission.CollectionDetailedModel>(
      `/roles/permissions/${roleId}`,
    ).then(this.getData);
  }
}

export default PermissionService;
