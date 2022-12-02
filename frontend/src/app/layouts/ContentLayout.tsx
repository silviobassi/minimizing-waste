import {Breadcrumb, Button, Layout} from "antd";
import React from "react";
import BreadcrumbLayout from "./BreadcrumbLayout";
const { Content } = Layout;

export interface ContentLayoutProps {
    children: React.ReactNode
}

export default function ContentLayout(props: ContentLayoutProps){
    return (
        <Content style={{ padding: '0 50px' }}>
            <BreadcrumbLayout />
            <Content
                style={{
                    padding: '40px',
                    background: '#fff',
                    minHeight: 280 }}>
                {props.children}
            </Content>
        </Content>
    );
}