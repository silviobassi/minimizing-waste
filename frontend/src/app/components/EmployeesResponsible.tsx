import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, List } from 'antd';
import { User } from '../../sdk';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';

type EmployeeResponsibleType = User.Assigned;

interface EmployeesResponsibleProps {
  employeeResponsible: EmployeeResponsibleType;
  color?: string;
  isAssignScreen?: boolean;
}

export default function EmployeesResponsible(props: EmployeesResponsibleProps) {
  return (
    <List style={{ marginBottom: 20 }}>
      <Card style={{ width: '100%', backgroundColor: props.color }}>
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar size={'large'} src={props.employeeResponsible?.avatarUrl}>
                <UserOutlined />
              </Avatar>
            }
            title={<a href="#">{props?.employeeResponsible?.name}</a>}
            description={
              <>
                <span>
                  <strong>Cargo: </strong>
                  {props?.employeeResponsible?.office} |{' '}
                  <strong>Função: </strong>
                  {props?.employeeResponsible?.occupation}
                </span>
                <br />
                <strong>WhatsApp: </strong>
                {phoneToFormat(props?.employeeResponsible?.whatsApp)}
              </>
            }
          />
        </List.Item>
      </Card>
    </List>
  );
}
