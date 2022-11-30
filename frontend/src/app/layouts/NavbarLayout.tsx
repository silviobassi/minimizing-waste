import {Menu} from "antd";
import {generatePath, Link, redirect} from "react-router-dom";
import {HomeOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";

const items = [
    { label: <Link to={'/'}>Home</Link>, key: 'home', icon: <HomeOutlined />},
    { label: <Link to={'/setores'}>Setores</Link>, key: 'setores', icon:  <TeamOutlined />},
    { label: <Link to={'/estacoes-de-trabalho'}>Estações de Trabalho</Link>, key: 'estações de trabalho', icon:  <TeamOutlined />},
    { label: <Link to={'/recursos'}>Recursos</Link>, key: 'recursos', icon:  <TeamOutlined />},
    { label: <Link to={'/colaboradores'}>Colaboradores</Link>, key: 'colaboradores', icon:  <TeamOutlined />},
    { label: <Link to={'/tarefas'}>Tarefas</Link>, key: 'tarefas', icon:  <TeamOutlined />},
    { label: <Link to={'/usuarios'}>Usuários</Link>, key: 'usuários', icon:  <TeamOutlined />},
];

export default function NavbarLayout() {
    return (
        <Menu
            mode="horizontal"
            defaultOpenKeys={["home"]}
            defaultSelectedKeys={['2']}
            items={items}
        />
    );
}