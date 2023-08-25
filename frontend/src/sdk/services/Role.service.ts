import { Role } from '../@types';
import Service from '../Service';

class RoleService extends Service {
  static getAllRoles(): Role.CollectionDetailed {
    return this.Http.get<Role.CollectionDetailed>('/roles').then(this.getData);
  }

  static getRole(roleId: number): Role.Detailed {
    return this.Http.get<Role.Detailed>(`/roles/${roleId}`).then(this.getData);
  }

  static getRoleUser(userId: number): Role.Detailed {
    return this.Http.get(`/users${userId}/roles`).then(this.getData);
  }

  static createRole(role: Role.Input): Role.Detailed {
    return this.Http.post<Role.Detailed>('/roles', role).then(this.getData);
  }

  static updateExistingRole(roleId: number, role: Role.Input): Role.Detailed {
    return this.Http.put<Role.Detailed>(`/roles/${roleId}`, role).then(
      this.getData,
    );
  }

  static deleteExistingRole(roleId: number): {} {
    return this.Http.delete<{}>(`/roles/${roleId}`).then(this.getStatus);
  }

  static associateRoleToUser(userId: number, roleId: number) {
    return this.Http.put<{}>(`/users/${userId}/roles/${roleId}`).then(
      this.getStatus,
    );
  }

  static disassociateRoleToUser(userId: number, roleId: number) {
    return this.Http.delete<{}>(`/users/${userId}/roles/${roleId}`).then(
      this.getStatus,
    );
  }
}

export default RoleService;
