import { Card } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

import React from 'react';
import { Link } from 'react-router-dom';

interface MenuHomePageProps {
  children: React.ReactNode;
  link: string;
  backgroundColor?: string;
  labelColor?: string;
  border?: string;
}

export default function MenuHomePage(props: MenuHomePageProps) {
  const { xs, sm, md } = useBreakpoint();

  const size = xs || sm || md? 15 : 19;
  return (
    <>
      {' '}
      <Link to={props.link} style={{ textAlign: 'center' }}>
        <Card
          style={{
            height: 120,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: props.border,
            fontSize: size,
            backgroundColor: props.backgroundColor,
            color: props.labelColor,
            margin: '10px 0',
          }}
        >
          {props.children}
        </Card>
      </Link>
    </>
  );
}
