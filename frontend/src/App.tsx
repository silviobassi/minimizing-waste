import { Route, Routes } from 'react-router-dom';

import HomeView from './app/views/Home.view';
import SectorListView from './app/views/SectorList.view';

import NotificationListView from './app/views/NotificationList.view';
import SupplyListView from './app/views/SupplyList.view';
import TaskListView from './app/views/TaskList.view';
import UserListView from './app/views/UserList.view';
import WorkStationListView from './app/views/WorkStationList.view';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/setores'} element={<SectorListView />} />
      <Route path={'/estacoes-de-trabalho'} element={<WorkStationListView />} />
      <Route path={'/recursos'} element={<SupplyListView />} />
      <Route path={'/tarefas'} element={<TaskListView />} />
      <Route path={'/colaboradores'} element={<UserListView />} />
      <Route path={'/notificacoes'} element={<NotificationListView />} />
    </Routes>
  );
}

export default App;
