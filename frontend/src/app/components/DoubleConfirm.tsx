import { Popconfirm } from 'antd';
import React from 'react';

interface DoubleConfirmProps {
  children: React.ReactNode;
  popConfirmTitle: string;
  popConfirmContent: string;
  onConfirm?: () => void;
}

export default function DoubleConfirm(props: DoubleConfirmProps) {
  return (
    <Popconfirm
      title={props.popConfirmTitle}
      description={props.popConfirmContent}
      onConfirm={props.onConfirm}
    >
      {props.children}
    </Popconfirm>
  );
}
