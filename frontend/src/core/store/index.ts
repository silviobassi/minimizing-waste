import { Middleware, configureStore, isRejected } from '@reduxjs/toolkit';
import { notification } from 'antd';
import assignmentReducer from './Assignment.slice';
import authReducer from './Auth.slice';
import sectorReducer from './Sector.slice';
import supplyReducer from './Supply.slice';
import UserReducer from './User.reducer';

import roleReducer from './AccessProfile.slice';
import permissionsNotOrGrantedReducer from './Permission.slice';
import rolesNotOrGrantedReducer from './Role.slice';
import supplyMovementReducer from './SupplyMovement.slice';
import usersAssignmentReducer from './UsersAssignment.slice';
import workStationReducer from './WorkStation.slice';

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const ignoredActions = [
      'user/getAllUsers/rejected',
      'assignments/getAllUsersAssignmentAssign/rejected',
      'assignments/toggleComplete/rejected',
      'assignments/toggleApprove/rejected',
      'supplies-movements/getAllSuppliesMovements/rejected',
      'supplies-movements/giveBackSupplyMovement/rejected',
      'supplies-movements/vacateSupplyMovement/rejected',
      'auth/getUser/rejected',
      'sectors/getAllSectors/rejected',
      'supplies/getAllSupplies/rejected',
      'users/associateEmployee/rejected',
      'users/disassociateEmployee/rejected',
      'assignments/getAssignment/rejected',
      'users/getAllUsersAssignmentAssign/rejected',
      'work-stations/getAllWorkStations/rejected',
      'roles/getAllRoles/rejected',
      'permissions/getAllPermissionsNotOrGranted/rejected',
      'permissions/disassociatePermissionsToRole/rejected',
      'permissions/associatePermissionsToRole/rejected',
      'roles/getAllRolesNotOrGranted/rejected',
      'roles/associateRoleToUser/rejected',
      'roles/disassociateRoleToUser/rejected',
    ];

    const shouldNotify = !ignoredActions.includes(action.type);

    const message = action.meta.rejectedWithValue
      ? action.payload.message
      : action.error.message;

    if (shouldNotify) {
      notification.error({
        message,
      });
    }
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    user: UserReducer,
    auth: authReducer,
    assignment: assignmentReducer,
    usersAssignmentAssigned: usersAssignmentReducer,
    supplies: supplyReducer,
    sectors: sectorReducer,
    workStations: workStationReducer,
    suppliesMovements: supplyMovementReducer,
    roles: roleReducer,
    permissionsNotOrGranted: permissionsNotOrGrantedReducer,
    rolesNotOrGranted: rolesNotOrGrantedReducer,
  },
  middleware: function (getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
