import { Route, Routes } from 'react-router-dom';

import EmployeeView from './app/views/Employee.view';
import HomeView from './app/views/Home.view';
import SectorView from './app/views/Sector.view';
import SupplyEquipmentView from './app/views/SupplyEquipment.view';
import SupplyMaterialView from './app/views/SupplyMaterial.view';
import TaskView from './app/views/Task.view';
import UserView from './app/views/User.view';
import WorkStationView from './app/views/WorkStation.view';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<HomeView />} />
      <Route path={'/setores'} element={<SectorView />} />
      <Route path={'/estacoes-de-trabalho'} element={<WorkStationView />} />
      <Route path={'/recursos/materiais'} element={<SupplyMaterialView />} />
      <Route path={'/recursos/equipamentos'} element={<SupplyEquipmentView />} />
      <Route path={'/colaboradores'} element={<EmployeeView />} />
      <Route path={'/tarefas'} element={<TaskView />} />
      <Route path={'/usuarios'} element={<UserView />} />
    </Routes>
  );
}

export default App;
