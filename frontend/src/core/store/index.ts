import { Middleware, configureStore, isRejected } from '@reduxjs/toolkit';
import { notification } from 'antd';
import authReducer from './Auth.slice';
import authPhotoReducer from './AuthPhoto.slice';
import UserReducer from './User.reducer';

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
    authPhoto: authPhotoReducer,
  },
  middleware: function (getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(observeActions);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
