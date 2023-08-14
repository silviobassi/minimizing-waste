import { Card } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';

interface MenuHomePageProps {
  children: React.ReactNode;
  link: string;
}

export default function MenuHomePage(props: MenuHomePageProps) {
  return (
    <>
      {' '}
      <Card
        style={{
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 19,
          backgroundColor: '#001529',
        }}
      >
        <Link style={{color: 'rgba(155, 155, 155, 1)'}} to={props.link}>{props.children}</Link>
      </Card>
    </>
  );
}
