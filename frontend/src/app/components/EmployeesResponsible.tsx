import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Typography } from 'antd';
import { User } from '../../sdk';

type EmployeeResponsibleType = User.Assigned;

interface EmployeesResponsibleProps {
  employeeResponsible: EmployeeResponsibleType;
  color?: string;
  isAssignScreen?: boolean;
}

export default function EmployeesResponsible(props: EmployeesResponsibleProps) {

  return (
    <>
      <List.Item.Meta
        avatar={
          <Avatar size={'large'} src={props.employeeResponsible?.avatarUrl}>
            <UserOutlined />
          </Avatar>
        }
        title={<>{props.employeeResponsible?.name}</>}
        description={
          <>
            <Space direction="vertical" size={2}>
              <Typography.Text>
                <strong>Cargo:</strong> {props.employeeResponsible.office}
              </Typography.Text>{' '}
              <Typography.Text>
                <strong>Função:</strong> {props.employeeResponsible.occupation}
              </Typography.Text>
              <Typography.Text>
                <strong>WhatsApp:</strong> {props.employeeResponsible.whatsApp}
              </Typography.Text>
            </Space>
          </>
        }
      />
    </>
  );
}
