import {Breadcrumb} from "antd";
import {Link, useLocation, useParams} from "react-router-dom";

export default function BreadcrumbLayout(){

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{}</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    );
}