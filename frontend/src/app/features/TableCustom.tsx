import {ColumnsType} from "antd/es/table";
import {Button, Col, Divider, Row, Table} from "antd";
import React from "react";

interface TableCustomProps {
    data: any,
    columns: ColumnsType<any>,
    buttonAndTableColWidth: string | number,
    createButtonLabel: string,
    tablePageSize: number,
}

export default function TableCustom(props: TableCustomProps) {

    const colWidth = props.buttonAndTableColWidth

    return (
        <>
            <Row justify={"center"}>
                <Col span={colWidth}>
                    <Button type={'primary'} size={'large'}>{props.createButtonLabel}</Button>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={colWidth}>
                    <Divider></Divider>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={colWidth}>
                    <Table
                        columns={props.columns}
                        dataSource={props.data}
                        pagination={{
                            pageSize:
                            props.tablePageSize
                        }}/>
                </Col>
            </Row>
        </>
    );
}