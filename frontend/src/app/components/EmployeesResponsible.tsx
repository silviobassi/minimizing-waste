import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, List, Row, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React from 'react';
import { User } from '../../sdk';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';

type EmployeeResponsibleType = User.Assigned;

interface EmployeesResponsibleProps {
  employeeResponsible: EmployeeResponsibleType;
  color?: string;
  isAssignScreen?: boolean;
  children?: React.ReactNode;
}

export default function EmployeesResponsible(props: EmployeesResponsibleProps) {
  const { xs, sm, lg } = useBreakpoint();

  return (
    <>
      <List.Item>
        <Row  align={'middle'}>
          <Col xs={24} lg={3}>
            <Avatar
              size={40}
              icon={<UserOutlined />}
              src={props?.employeeResponsible.avatarUrl}
            />
          </Col>
          <Col xs={24} lg={14} style={xs || sm ? { marginTop: 10 } : {}}>
            <div
              style={
                xs || sm
                  ? {
                      display: 'flex',
                      flexDirection: 'column',
                    }
                  : {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                    }
              }
            >
              <Typography.Text>
                <strong>Nome: </strong>
                {props.employeeResponsible?.name}
              </Typography.Text>
              <Typography.Text>
                <strong>Cargo: </strong>
                {props.employeeResponsible?.office}
              </Typography.Text>
              <Typography.Text>
                <strong>Função: </strong>
                {props.employeeResponsible?.occupation}
              </Typography.Text>
              <Typography.Text>
                <strong>WhatsApp: </strong>
                {phoneToFormat(props.employeeResponsible?.whatsApp)}
              </Typography.Text>
            </div>
          </Col>

          {props.children && (
            <Col xs={24} lg={7} style={xs || sm ? { marginTop: 10 } : {}}>
              <div
                style={
                  xs || sm
                    ? { width: '100%', display: 'flex', justifyContent: 'start' }
                    : {width: '100%', display: 'flex', justifyContent: 'end' }
                }
              >
                {props.children}
              </div>
            </Col>
          )}
        </Row>
      </List.Item>
    </>
  );
}
