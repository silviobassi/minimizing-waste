import { Card } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';

interface MenuHomePageProps {
  children: React.ReactNode;
  link: string;
  backgroundColor?: string;
  labelColor?: string;
  border?: string
}

export default function MenuHomePage(props: MenuHomePageProps) {
  return (
    <>
      {' '}
      <Link to={props.link}>
        <Card
          style={{
            height: 120,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: props.border,
            fontSize: 19,
            backgroundColor: props.backgroundColor,
            color: props.labelColor
          }}
        >
          {props.children}
        </Card>
      </Link>
    </>
  );
}
