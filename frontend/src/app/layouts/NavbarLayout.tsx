import {Menu} from "antd";
import {Link, redirect} from "react-router-dom";

const items = [
    { label: 'Home', key: 'item-1' }, // remember to pass the key prop
    { label: 'Setores', key: 'item-2' }, // which is required
];

export default function NavbarLayout() {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
        />
        /*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key={1}>
                <Link to={'/'}>Home</Link>
            </Menu.Item>
            <Menu.Item key={2}>
                <Link to={'/setores'}>Setores</Link>
            </Menu.Item>
            <Menu.Item key={3}>
                <Link to={'/estacoes-de-trabalho'}>Estações de Trabalho</Link>
            </Menu.Item>
            <Menu.Item key={4}>
                <Link to={'/recursos'}>Recursos</Link>
            </Menu.Item>
            <Menu.Item key={5}>
                <Link to={'/colaboradores'}>Colaboradores</Link>
            </Menu.Item>
            <Menu.Item key={6}>
                <Link to={'/tarefas'}>Tarefas</Link>
            </Menu.Item>
            <Menu.Item key={7}>
                <Link to={'/usuarios'}>Usuários</Link>
            </Menu.Item>
        </Menu>*/
    );
}