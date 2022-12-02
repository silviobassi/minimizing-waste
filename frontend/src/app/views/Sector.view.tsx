import React from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Space, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import TableCustom from "../features/TableCustom";

interface SectorType {
    key: React.Key,
    id: number,
    name: string
}

const columns: ColumnsType<SectorType> = [
    {title: 'ID', dataIndex: 'id'},
    {title: 'Nome', dataIndex: 'name'},
    {title: 'Ações' , dataIndex: 'actions',
        render: ( _:any, workstation) => (
            <Space size={"middle"}>
                <Tooltip title={"Editar"}>
                    <Button type={"primary"} shape={'circle'} icon={<EditOutlined />} />
                </Tooltip>
                <Tooltip title={"Excluir"}>
                    <Button type={"primary"} shape={'circle'} icon={<DeleteOutlined />} />
                </Tooltip>
            </Space>
        )
    }
]

const data: SectorType[] = [];

for(let i = 1; i < 20;i++){
    data.push({
        key: i,
        id: i,
        name: `Alvenaria #${i}`,
    });
}

export default function SectorView() {
    return (
        <TableCustom
            data={data}
            columns={columns}
            buttonAndTableColWidth={10}
            createButtonLabel={'CRIAR SETOR'}
            tablePageSize={5}
        />
    )
}