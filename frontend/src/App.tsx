import { Route, Routes } from 'react-router-dom';

import HomeView from './app/views/Home.view';
import SectorListView from './app/views/SectorList.view';

import EmployeeCreateView from './app/views/EmployeeCreate.view';
import EmployeeEditView from './app/views/EmployeeEdit.view';
import EmployeeListView from './app/views/EmployeeList.view';
import NotificationListView from './app/views/NotificationList.view';
import SectorCreateView from './app/views/SectorCreate.view';
import SectorEditView from './app/views/SectorEdit.view';
import SupplyCreateView from './app/views/SupplyCreate.view';
import SupplyEditView from './app/views/SupplyEdit.view';
import SupplyListView from './app/views/SupplyList.view';
import TaskAssignView from './app/views/TaskAssign.view';
import TaskCreateView from './app/views/TaskCreate.view';
import TaskEditView from './app/views/TaskEdit.view';
import TaskListView from './app/views/TaskList.view';
import WorkStationCreateView from './app/views/WorkStationCreate.view';
import WorkStationEditView from './app/views/WorkStationEdit.view';
import WorkStationListView from './app/views/WorkStationList.view';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/setores'} element={<SectorListView />} />
      <Route path={'/setor/criar'} element={<SectorCreateView />} />
      <Route path={'/setor/editar/:id'} element={<SectorEditView />} />
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
      <Route path={'/recurso/criar'} element={<SupplyCreateView />} />
      <Route path={'/recurso/editar/:id'} element={<SupplyEditView />} />
      <Route path={'/tarefas'} element={<TaskListView />} />
      <Route path={'/tarefa/criar'} element={<TaskCreateView />} />
      <Route path={'/tarefa/editar/:id'} element={<TaskEditView />} />
      <Route path={'/tarefa/atribuicao/:id'} element={<TaskAssignView />} />
      <Route path={'/colaboradores'} element={<EmployeeListView />} />
      <Route path={'/colaborador/criar'} element={<EmployeeCreateView />} />
      <Route path={'/colaborador/editar/:id'} element={<EmployeeEditView />} />
      <Route path={'/notificacoes'} element={<NotificationListView />} />
    </Routes>
  );
}

export default App;
