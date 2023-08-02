import { Middleware, configureStore, isRejected } from '@reduxjs/toolkit';
import { notification } from 'antd';
import assignmentReducer from './Assignment.slice';
import authReducer from './Auth.slice';
import supplyReducer from './Supply.slice';
import UserReducer from './User.reducer';
import usersAssignmentReducer from './UsersAssignment.slice';
import sectorReducer from './Sector.slice'
import workStationReducer from './WorkStation.slice'

const observeActions: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const ignoredActions = ['user/getAllUsers/rejected'];

    const shouldNotify = !ignoredActions.includes(action.type);

    if (shouldNotify) {
      notification.error({
        message: action.error.message,
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
    workStations: workStationReducer
  },
  middleware: function (getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
