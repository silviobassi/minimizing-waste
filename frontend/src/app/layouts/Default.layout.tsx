import React from "react";
import {Layout} from "antd";
import HeaderLayout from "./HeaderLayout";
import ContentLayout from "./ContentLayout";

const { Content } = Layout;

const items = [
    { label: 'item 1', key: 'item-1' },
    { label: 'item 2', key: 'item-2' },
];

interface DefaultLayoutProps {
    children: React.ReactNode
}
export default function DefaultLayout(props: DefaultLayoutProps) {
    return (
        <Layout>
            <HeaderLayout/>
            <ContentLayout>
                {props.children}
            </ContentLayout>
        </Layout>
    );
}