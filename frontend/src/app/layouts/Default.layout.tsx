import HeaderLayout from "./HeaderLayout";
import ContentLayout from "./ContentLayout";
import BreadcrumbLayout from "./BreadcrumbLayout";
import {Layout} from "antd";
import React from "react";

import {
    BrowserRouter as Router
} from "react-router-dom";

interface DefaultLayoutProps {
    children: React.ReactNode
}

export default function DefaultLayout(props: DefaultLayoutProps){
    return (

        <Layout>
            <Router>
                <HeaderLayout/>
                <ContentLayout>
                    <BreadcrumbLayout/>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                        {props.children}
                    </div>
                </ContentLayout>
            </Router>
        </Layout>

    );
}