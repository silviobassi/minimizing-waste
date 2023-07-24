import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, List } from 'antd';
import { User } from '../../sdk';
import { phoneToFormat } from '../../sdk/utils/generateFormatterData';

type EmployeeResponsibleType = User.Assigned;

interface EmployeesResponsibleProps {
  employeeResponsible: EmployeeResponsibleType;
}

export default function EmployeesResponsible(props: EmployeesResponsibleProps) {
  return (
    <>
      <List>
        <List.Item>
          <Card style={{ width: '100%', backgroundColor: '#E6F4FF' }}>
      
            <List.Item.Meta
            
              avatar={
                <Avatar
                  src={props?.employeeResponsible?.userPhoto?.url}
                  size={50}
                  icon={<UserOutlined />}
                />
              }
              title={<a href="#">{props?.employeeResponsible?.name}</a>}
              description={
                <>
                  <span>
                    <strong>Cargo: </strong>
                    {props?.employeeResponsible?.office} |{' '}
                    <strong>Função: </strong>
                    {props?.employeeResponsible?.office}
                  </span>
                  <br />
                  <strong>WhatsApp: </strong>
                  {phoneToFormat(props?.employeeResponsible?.whatsApp)}
                </>
              }
            />
          </Card>
        </List.Item>
      </List>
    </>
  );
}
