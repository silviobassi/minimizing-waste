import { Permission } from '../@types';
import Service from '../Service';
import { generateQueryString } from '../utils';

class PermissionService extends Service {
  static getAllPermissions(
    search: Permission.Query,
  ): Permission.CollectionDetailedModel {
    return this.Http.get<Permission.CollectionDetailedModel>(
      '/roles/permissions',
    ).then(this.getData);
  }

  static getAllPermissionsAllNotOrGranted(
    roleId: number,
    search: Permission.Query,
  ): Permission.CollectionDetailedModel {
    const queryString = generateQueryString(search);
    return this.Http.get<Permission.CollectionDetailedModel>(
      `/roles/permissions/${roleId}`.concat(queryString),
    ).then(this.getData);
  }

  static associatePermissionsToRole(roleId: number, permissionId: number) {
    return this.Http.put<{}>(
      `/roles/${roleId}/permissions/${permissionId}`,
    ).then(this.getStatus);
  }

  static disassociatePermissionsToRole(roleId: number, permissionId: number) {
    return this.Http.delete<{}>(
      `/roles/${roleId}/permissions/${permissionId}`,
    ).then(this.getStatus);
  }
}

export default PermissionService;
