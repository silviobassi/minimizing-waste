import {Menu} from "antd";
import React from "react";
import {Link} from "react-router-dom";
import {
    ApartmentOutlined,
    ArrowDownOutlined,
    BankOutlined, FieldTimeOutlined,
    HomeOutlined,
    PlusOutlined,
    StockOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined
} from "@ant-design/icons";


export default function NavbarLayout() {

    const items = [
        { label: <Link to={'/'}>Home</Link>, key: 'home', icon: <HomeOutlined />},

        { label: <Link to={'/estacoes-de-trabalho'}>Estação de Trabalho</Link>, key: 'work stations',
            icon: <ApartmentOutlined /> },

        { label: <Link to={'/setores'}>Setores</Link>, key: 'sectors', icon: <BankOutlined /> },
        { label: <Link to={'/colaboradores'}>Colaboradores</Link>, key: 'employees', icon: <UsergroupAddOutlined /> },

        { label: 'Recursos', key: 'supplies',
            children: [
                {label: <Link to={'/recursos/equipamentos'}>Equipamentos</Link>, key: 'equipment',},
                {label: <Link to={'/recursos/materiais'}>Materiais</Link>, key: 'material'},
            ]
        },
        
        { label: <Link to={'/tarefas'}>Tarefas</Link>, key: 'tasks', icon: <BankOutlined /> },
        { label: <Link to={'/usuarios'}>Usuários</Link>, key: 'users', icon: <BankOutlined /> },
];

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
        />
    );
}