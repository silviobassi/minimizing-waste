import { Routes as MainRoutes, Route } from 'react-router-dom';

import HomeView from './views/Home.view';
import SectorListView from './views/SectorList.view';

import { message, notification } from 'antd';
import React, { Suspense, useEffect } from 'react';
import CustomError from '../sdk/CustomError';
import GlobalLoading from './components/GlobalLoading';
const AccessProfileCreateView = React.lazy(
  () => import('./views/AccessProfileCreate.view'),
);
const AccessProfileEditView = React.lazy(
  () => import('./views/AccessProfileEdit.view'),
);

const AccessProfileListView = React.lazy(
  () => import('./views/AccessProfileList.view'),
);
const ChangedPasswordView = React.lazy(
  () => import('./views/ChangedPassword.view'),
);
const EmployeeCreateView = React.lazy(
  () => import('./views/EmployeeCreate.view'),
);
const EmployeeDetailedView = React.lazy(
  () => import('./views/EmployeeDetailed.view'),
);
const EmployeeEditView = React.lazy(() => import('./views/EmployeeEdit.view'));
const EmployeeListView = React.lazy(() => import('./views/EmployeeList.view'));
const GrantPermissionsView = React.lazy(
  () => import('./views/GrantPermissions.view'),
);
const GrantRoleView = React.lazy(() => import('./views/GrantRole.view'));
const NotFound404View = React.lazy(() => import('./views/NotFound404.view'));
const NotificationListView = React.lazy(
  () => import('./views/NotificationList.view'),
);
const RevoKePermissionsView = React.lazy(
  () => import('./views/RevokePermissions.view'),
);
const RevokeRoleView = React.lazy(() => import('./views/RevokeRole.view'));
const SectorCreateView = React.lazy(() => import('./views/SectorCreate.view'));
const SectorEditView = React.lazy(() => import('./views/SectorEdit.view'));
const SupplyCreateView = React.lazy(() => import('./views/SupplyCreate.view'));
const SupplyDetailedView = React.lazy(
  () => import('./views/SupplyDetailed.view'),
);
const SupplyEditView = React.lazy(() => import('./views/SupplyEdit.view'));
const SupplyListView = React.lazy(() => import('./views/SupplyList.view'));
const SupplyMovementCreateView = React.lazy(
  () => import('./views/SupplyMovementCreate.view'),
);
const SupplyMovementDetailedView = React.lazy(
  () => import('./views/SupplyMovementDetailed.view'),
);
const SupplyMovementEditView = React.lazy(
  () => import('./views/SupplyMovementEdit.view'),
);
const SupplyMovementListView = React.lazy(
  () => import('./views/SupplyMovementList.view'),
);
const TaskAssignView = React.lazy(() => import('./views/TaskAssign.view'));
const TaskCreateView = React.lazy(() => import('./views/TaskCreate.view'));
const TaskDetailedView = React.lazy(() => import('./views/TaskDetailed.view'));
const TaskEditView = React.lazy(() => import('./views/TaskEdit.view'));
const TaskListView = React.lazy(() => import('./views/TaskList.view'));
const TaskUnassignView = React.lazy(() => import('./views/TaskUnassign.view'));
const WorkStationCreateView = React.lazy(
  () => import('./views/WorkStationCreate.view'),
);
const WorkStationEditView = React.lazy(
  () => import('./views/WorkStationEdit.view'),
);
const WorkStationListView = React.lazy(
  () => import('./views/WorkStationList.view'),
);

const AssignmentsResponsibleListView = React.lazy(
  () => import('./views/AssignmentsResponsibleList.view'),
);

export default function Routes() {
  useEffect(() => {
    window.onunhandledrejection = ({ reason }) => {
      if (reason instanceof CustomError) {
        if (reason.data?.objects) {
          reason.data.objects.forEach((error: any) => {
            message.error(error.userMessage);
          });
        } else {
          notification.error({
            message:
              reason.message === reason.data.detail ? '' : reason.message,
            description:
              reason.data?.detail === 'Network Error'
                ? 'Erro de Rede'
                : reason.data?.detail,
          });
        }
      } else {
        reason?.data?.objects?.forEach((object: { userMessage: string }) => {
          message.error(object.userMessage);
        });
        notification.error({
          message: reason?.message || 'Houve um erro',
        });
      }
    };

    return () => {
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <Suspense fallback={<GlobalLoading />}>
      <MainRoutes>
        <Route path={'/'} element={<HomeView />} />
        <Route path={'/home'} element={<HomeView />} />
        <Route path={'/setores'} element={<SectorListView />} />
        <Route path={'/setor/criar'} element={<SectorCreateView />} />
        <Route path={'/setor/editar/:sectorId'} element={<SectorEditView />} />
        <Route
          path={'/estacoes-de-trabalho'}
          element={<WorkStationListView />}
        />
        <Route
          path={'/estacao-de-trabalho/criar'}
          element={<WorkStationCreateView />}
        />
        <Route
          path={'/estacao-de-trabalho/editar/:workStationId'}
          element={<WorkStationEditView />}
        />
        <Route path={'/recursos'} element={<SupplyListView />} />
        <Route
          path={'/movimento-recursos'}
          element={<SupplyMovementListView />}
        />
        <Route
          path={'/movimento-recursos/criar'}
          element={<SupplyMovementCreateView />}
        />
        <Route
          path={'/movimento-recursos/editar/:supplyMovementId'}
          element={<SupplyMovementEditView />}
        />
        <Route
          path={'/movimento-recursos/detalhes/:supplyMovementId'}
          element={<SupplyMovementDetailedView />}
        />
        <Route path={'/recursos/criar'} element={<SupplyCreateView />} />
        <Route
          path={'/recursos/editar/:supplyId'}
          element={<SupplyEditView />}
        />
        <Route
          path={'/recursos/:supplyId/detalhes'}
          element={<SupplyDetailedView />}
        />

        <Route path="/perfis-de-acesso" element={<AccessProfileListView />} />

        <Route
          path="/perfil-de-acesso/editar/:roleId"
          element={<AccessProfileEditView />}
        />

        <Route
          path="/conceder-roles/perfis-de-acesso"
          element={<GrantRoleView />}
        />

        <Route
          path="/revogar-roles/perfis-de-acesso"
          element={<RevokeRoleView />}
        />

        <Route
          path="/conceder-permissoes/perfis-de-acesso"
          element={<GrantPermissionsView />}
        />

        <Route
          path="/revogar-permissoes/perfis-de-acesso"
          element={<RevoKePermissionsView />}
        />

        <Route
          path="/perfil-de-acesso/criar"
          element={<AccessProfileCreateView />}
        />

        <Route path={'/tarefas'} element={<TaskListView />} />
        <Route
          path={'/tarefas/responsavel'}
          element={<AssignmentsResponsibleListView />}
        />
        <Route path={'/tarefa/criar'} element={<TaskCreateView />} />
        <Route
          path={'/tarefa/editar/:assignmentId'}
          element={<TaskEditView />}
        />
        <Route
          path={'/tarefas/:assignmentId/detalhes'}
          element={<TaskDetailedView />}
        />
        <Route
          path={'/tarefa/:assignmentId/atribuicao'}
          element={<TaskAssignView />}
        />
        <Route
          path={'/tarefa/:assignmentId/desatribuicao'}
          element={<TaskUnassignView />}
        />
        <Route path={'/colaboradores'} element={<EmployeeListView />} />
        <Route path={'/colaborador/criar'} element={<EmployeeCreateView />} />
        <Route
          path={'/colaborador/editar/:userId'}
          element={<EmployeeEditView />}
        />
        <Route
          path={'/colaborador/:employeeId/detalhes'}
          element={<EmployeeDetailedView />}
        />

        <Route
          path={'/user/alteracao-de-senha'}
          element={<ChangedPasswordView />}
        />
        <Route path={'/notificacoes'} element={<NotificationListView />} />
        <Route path="/404" element={<NotFound404View />} />
      </MainRoutes>
    </Suspense>
  );
}
