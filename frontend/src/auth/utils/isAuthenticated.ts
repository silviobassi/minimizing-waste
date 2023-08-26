import { Assignment, Permission, User } from '../../sdk/@types';

function hasPermission(permissionType: string, user: User.Detailed): boolean {
  return user?.role?.permissions?.some(
    (permission: Permission.DetailedModel) =>
      permission.name === permissionType,
  );
}

function hasEmployeeCurrent(
  assignment: Assignment.AssignmentModel,
  user: User.Detailed,
): boolean {
  return assignment?.employeesResponsible.some(
    (employee: any) => employee?.id === user?.id,
  );
}

export { hasEmployeeCurrent, hasPermission };
