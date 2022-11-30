import {Button, Layout} from "antd";
const { Content } = Layout;

export interface ContentLayoutProps {
    children: React.ReactNode
}

export default function ContentLayout(props: ContentLayoutProps){
    return (
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            {props.children}
        </Content>
    );
}