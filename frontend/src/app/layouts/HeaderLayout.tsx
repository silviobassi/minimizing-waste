import {Layout, Menu} from "antd";
import React from "react";
import NavbarLayout from "./NavbarLayout";
const { Header } = Layout;
export default function HeaderLayout(){
    return (
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', marginBottom: 20 }}>
            <div className="logo" />
            <NavbarLayout />
        </Header>
    );
}