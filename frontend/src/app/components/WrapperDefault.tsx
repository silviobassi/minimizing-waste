import { Card } from 'antd';
import React from 'react';

interface WrapperDefaultProps {
  children: React.ReactNode;
  title: string;
}

export default function WrapperDefault(props: WrapperDefaultProps) {
  return (
    <Card type="inner" title={props.title} style={{height: '100%'}}>
      {props.children}
    </Card>
  );
}
