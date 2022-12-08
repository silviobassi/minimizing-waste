import { Route, Routes } from 'react-router-dom';

import HomeView from './app/views/Home.view';
import SectorListView from './app/views/SectorList.view';

import NotificationListView from './app/views/NotificationList.view';
import SectorCreateView from './app/views/SectorCreate.view';
import SectorEditView from './app/views/SectorEdit.view';
import SupplyCreateView from './app/views/SupplyCreate.view';
import SupplyEditView from './app/views/SupplyEdit.view';
import SupplyListView from './app/views/SupplyList.view';
import TaskListView from './app/views/TaskList.view';
import UserListView from './app/views/UserList.view';
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
        path={'/estacao-de-trabalho/editar/:id'}yarn 
        element={<WorkStationEditView />}
      />
      <Route path={'/recursos'} element={<SupplyListView />} />
      <Route path={'/recurso/criar'} element={<SupplyCreateView />} />
      <Route path={'/recurso/editar/:id'} element={<SupplyEditView />} />
      <Route path={'/tarefas'} element={<TaskListView />} />
      <Route path={'/colaboradores'} element={<UserListView />} />
      <Route path={'/notificacoes'} element={<NotificationListView />} />
    </Routes>
  );
}

export default App;
