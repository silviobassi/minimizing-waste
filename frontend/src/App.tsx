import {
    Route,
    Routes
} from "react-router-dom";

import Sector from "./app/views/Sectors.view";
import Home from "./app/views/Home.view";
import WorkStations from "./app/views/WorkStations.view";
import Supplies from "./app/views/Supplies.view";
import Employees from "./app/views/Employees.view";
import Tasks from "./app/views/Tasks.view";
import Users from "./app/views/Users.view";

function App() {
    return (

        <Routes>
            <Route path={'/'} index={1} element={<Home />}/>
            <Route path={'/setores'} element={<Sector />}/>
            <Route path={'/estacoes-de-trabalho'} element={<WorkStations />}/>
            <Route path={'/recursos'} element={<Supplies />}/>
            <Route path={'/colaboradores'} element={<Employees />}/>
            <Route path={'/tarefas'} element={<Tasks />}/>
            <Route path={'/usuarios'} element={<Users />}/>
        </Routes>
    );
}

export default App
