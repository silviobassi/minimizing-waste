import { Popconfirm } from 'antd';
import React from 'react';

interface DoubleConfirmProps {
  children: React.ReactNode;
  popConfirmTitle: string;
  popConfirmContent: string;
  onConfirm?: () => void;
  deactivatePermission: boolean;
}

export default function DoubleConfirm(props: DoubleConfirmProps) {
  return (
    <Popconfirm
      disabled={props.deactivatePermission}
      title={props.popConfirmTitle}
      onConfirm={props.onConfirm}
    >
      {props.children}
    </Popconfirm>
  );
}
