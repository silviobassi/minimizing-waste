import { Route, Routes, useNavigate } from 'react-router-dom';

import HomeView from './app/views/Home.view';
import SectorListView from './app/views/SectorList.view';

import { notification } from 'antd';
import { useEffect } from 'react';
import TaskDetailedView from './app/features/TaskDetailed';
import EmployeeCreateView from './app/views/EmployeeCreate.view';
import EmployeeDetailedView from './app/views/EmployeeDetailed.view';
import EmployeeEditView from './app/views/EmployeeEdit.view';
import EmployeeListView from './app/views/EmployeeList.view';
import NotFound404View from './app/views/NotFound404.view';
import NotificationListView from './app/views/NotificationList.view';
import SectorCreateView from './app/views/SectorCreate.view';
import SectorEditView from './app/views/SectorEdit.view';
import SupplyAllocateView from './app/views/SupplyAllocation.view';
import SupplyCreateView from './app/views/SupplyCreate.view';
import SupplyDetailedView from './app/views/SupplyDetailed.view';
import SupplyEditView from './app/views/SupplyEdit.view';
import SupplyListView from './app/views/SupplyList.view';
import SupplyMovementCreateView from './app/views/SupplyMovementCreate.view';
import SupplyMovementEditView from './app/views/SupplyMovementEdit.view';
import SupplyMovementGiveBackForm from './app/views/SupplyMovementGiveBack.view';
import SupplyMovementListView from './app/views/SupplyMovementList.view';
import TaskAssignView from './app/views/TaskAssign.view';
import TaskCreateView from './app/views/TaskCreate.view';
import TaskEditView from './app/views/TaskEdit.view';
import TaskListView from './app/views/TaskList.view';
import WorkStationCreateView from './app/views/WorkStationCreate.view';
import WorkStationEditView from './app/views/WorkStationEdit.view';
import WorkStationListView from './app/views/WorkStationList.view';
import AuthService from './auth/Authorization.service';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    async function identify() {
      const isInAuthorizationRoute = window.location.pathname === '/authorize';
      const code = new URLSearchParams(window.location.search).get('code');

      const codeVerifier = AuthService.getCodeVerifier();
      const accessToken = AuthService.getAccessToken();

      if (!accessToken && !isInAuthorizationRoute) {
        AuthService.imperativelySendToLoginScreen();
      }

      if (isInAuthorizationRoute) {
        if (!code) {
          notification.error({
            message: 'Código não foi informado',
          });
          return;
        }

        if (!codeVerifier) {
          // necessario fazer logout
          return;
        }

        // busca o primeiro token de acesso
        const { access_token, refresh_token } =
          await AuthService.getFirstAccessTokens({
            code,
            codeVerifier,
            redirectUri: 'http://127.0.0.1:5173/authorize',
          });

        AuthService.setAccessToken(access_token);
        AuthService.setRefreshToken(refresh_token);

        navigate('/');
      }
    }

    identify();
  }, []);
  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/home'} element={<HomeView />} />
      <Route path={'/setores'} element={<SectorListView />} />
      <Route path={'/setor/criar'} element={<SectorCreateView />} />
      <Route path={'/setor/editar/:id'} element={<SectorEditView />} />
      <Route
        path={'/setor/:id/alocacao/recurso'}
        element={<SupplyAllocateView />}
      />
      <Route path={'/estacoes-de-trabalho'} element={<WorkStationListView />} />
      <Route
        path={'/estacao-de-trabalho/criar'}
        element={<WorkStationCreateView />}
      />
      <Route
        path={'/estacao-de-trabalho/editar/:id'}
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
        path={'/movimento-recursos/editar/:id'}
        element={<SupplyMovementEditView />}
      />
      <Route
        path={'/movimento-recursos/devolver-recurso/:id'}
        element={<SupplyMovementGiveBackForm />}
      />
      <Route path={'/recursos/criar'} element={<SupplyCreateView />} />
      <Route path={'/recursos/editar/:id'} element={<SupplyEditView />} />
      <Route
        path={'/recursos/:supplyId/detalhes'}
        element={<SupplyDetailedView />}
      />

      <Route path={'/tarefas'} element={<TaskListView />} />
      <Route path={'/tarefa/criar'} element={<TaskCreateView />} />
      <Route path={'/tarefa/editar/:id'} element={<TaskEditView />} />
      <Route
        path={'/tarefas/:taskId/detalhes'}
        element={<TaskDetailedView />}
      />
      <Route path={'/tarefa/:id/atribuicao'} element={<TaskAssignView />} />
      <Route path={'/colaboradores'} element={<EmployeeListView />} />
      <Route path={'/colaborador/criar'} element={<EmployeeCreateView />} />
      <Route path={'/colaborador/editar/:id'} element={<EmployeeEditView />} />
      <Route
        path={'/colaboradores/:employeeId/detalhes'}
        element={<EmployeeDetailedView />}
      />
      <Route path={'/notificacoes'} element={<NotificationListView />} />
      <Route path="/404" element={<NotFound404View />} />
    </Routes>
  );
}

export default App;
