import { Button, Col, Divider, Row, Table, TableColumnsType } from "antd";

interface TableCustomProps {
    data: any,
    columns: TableColumnsType<any>,
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
                            pageSize: props.tablePageSize
                        }} />
                </Col>
            </Row>
        </>
    );
}