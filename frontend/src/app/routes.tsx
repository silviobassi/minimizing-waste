import { Routes as MainRoutes, Route } from 'react-router-dom';

import HomeView from './views/Home.view';
import SectorListView from './views/SectorList.view';

import { message, notification } from 'antd';
import { useEffect } from 'react';
import CustomError from '../sdk/CustomError';
import EmployeeCreateView from './views/EmployeeCreate.view';
import EmployeeDetailedView from './views/EmployeeDetailed.view';
import EmployeeEditView from './views/EmployeeEdit.view';
import EmployeeListView from './views/EmployeeList.view';
import NotFound404View from './views/NotFound404.view';
import NotificationListView from './views/NotificationList.view';
import SectorCreateView from './views/SectorCreate.view';
import SectorEditView from './views/SectorEdit.view';
import SupplyCreateView from './views/SupplyCreate.view';
import SupplyDetailedView from './views/SupplyDetailed.view';
import SupplyEditView from './views/SupplyEdit.view';
import SupplyListView from './views/SupplyList.view';
import SupplyMovementCreateView from './views/SupplyMovementCreate.view';
import SupplyMovementEditView from './views/SupplyMovementEdit.view';
import SupplyMovementDetailedView from './views/SupplyMovementDetailed.view';
import SupplyMovementListView from './views/SupplyMovementList.view';
import TaskAssignView from './views/TaskAssign.view';
import TaskCreateView from './views/TaskCreate.view';
import TaskDetailedView from './views/TaskDetailed.view';
import TaskEditView from './views/TaskEdit.view';
import TaskListView from './views/TaskList.view';
import TaskUnassignView from './views/TaskUnassign.view';
import WorkStationCreateView from './views/WorkStationCreate.view';
import WorkStationEditView from './views/WorkStationEdit.view';
import WorkStationListView from './views/WorkStationList.view';
import EmployeeAccessControlView from './views/EmployeeAccessControl.view'

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
        notification.error({
          message: `${reason.message}`,
        });
      }
    };

    return () => {
      window.onunhandledrejection = null;
    };
  }, []);

  return (
    <MainRoutes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/home'} element={<HomeView />} />
      <Route path={'/setores'} element={<SectorListView />} />
      <Route path={'/setor/criar'} element={<SectorCreateView />} />
      <Route path={'/setor/editar/:sectorId'} element={<SectorEditView />} />
      <Route path={'/estacoes-de-trabalho'} element={<WorkStationListView />} />
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
      <Route path={'/recursos/editar/:supplyId'} element={<SupplyEditView />} />
      <Route
        path={'/recursos/:supplyId/detalhes'}
        element={<SupplyDetailedView />}
      />

      <Route path='/usuarios/controle-de-acesso' element={<EmployeeAccessControlView/>}/>

      <Route path={'/tarefas'} element={<TaskListView />} />
      <Route path={'/tarefa/criar'} element={<TaskCreateView />} />
      <Route path={'/tarefa/editar/:assignmentId'} element={<TaskEditView />} />
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
      <Route path={'/notificacoes'} element={<NotificationListView />} />
      <Route path="/404" element={<NotFound404View />} />
    </MainRoutes>
  );
}
