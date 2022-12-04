import { Card } from 'antd';
import React from 'react';

interface WrapperDefaultProps {
  children: React.ReactNode;
  title: string
}

export default function WrapperDefault(props: WrapperDefaultProps) {
  return (
    <Card title={props.title} >
      <Card type="inner">{props.children}</Card>
    </Card>
  );
}
