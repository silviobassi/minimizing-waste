import usePageTitle from "../../core/usePageTitle";
import {Button, Col, Divider, Row, Space, Table, Tooltip} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import React from "react";

interface WorkStation {
    key: number;
    id: number;
    name: string;
    localization: string;
    sector: string;
}

export default function Setor() {
    usePageTitle('Estações de Trabalho')
    const navigate = useNavigate();

    const data: WorkStation[] = [
        {
            key: 1,
            id: 1,
            name: 'Revestimento',
            localization: 'Bloco B Apto 27',
            sector: 'Acabamento',
        },
        {
            key: 2,
            id: 2,
            name: 'Assentamento de Tijolo',
            localization: 'Bloco B Apto 27',
            sector: 'Edificação',
        },
        {
            key: 3,
            id: 3,
            name: 'Assentamento de Tijolo',
            localization: 'Bloco B Apto 27',
            sector: 'Edificação',
        }
    ];

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Localização',
            dataIndex: 'localization',
            key: 'localization',
        },
        {
            title: 'Setor',
            dataIndex: 'sector',
            key: 'sector',
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, data: WorkStation) =>
                <Space size={"middle"} direction={"horizontal"}>
                    <Tooltip title={"Editar"}>
                        <Button type={"primary"} shape={"round"} icon={<EditFilled/>}
                        onClick={() => navigate('/estacao-de-trabalho/' + data.key)}/>
                    </Tooltip>

                    <Tooltip title={"Excluir"}>
                        <Button type={"primary"} shape={"round"} icon={<DeleteFilled/>}/>
                    </Tooltip>
                </Space>
        },

    ];

    return <>
        <Row justify="center">
            <Col span={16}>
                <Button type='primary'>CRIAR ESTAÇÃO DE TRABALHO</Button>
            </Col>
        </Row>

        <Row justify="center">
            <Col span={16}>
                <Divider/>
            </Col>
        </Row>

        <Row justify="center">
            <Col span={16}>
                <Table dataSource={data} columns={columns}/>
            </Col>
        </Row>
    </>;

};