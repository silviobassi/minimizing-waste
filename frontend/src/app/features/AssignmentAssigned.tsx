import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  List,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { format } from 'date-fns';

import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Assignment, User } from '../../sdk';
import DoubleConfirm from '../components/DoubleConfirm';
import EmployeesResponsible from '../components/EmployeesResponsible';
import WrapperDefault from '../components/WrapperDefault';

type UserAssignedType = User.PagedModelUserAssigned;
type AssignmentType = Assignment.AssignmentModel;

interface AssignmentAssignedProps {
  users?: UserAssignedType;
  assignment?: AssignmentType;
  onAssigned?: (employeeId: number, employeeName: string) => Promise<any>;
  onPage: (page: number) => any;
  assign: boolean;
}

export default function AssignmentAssigned(props: AssignmentAssignedProps) {
  const [form] = Form.useForm<Assignment.AssignmentNotificationInput>();
  const { xs, sm, lg } = useBreakpoint();

  const onConfirm: string = !props.assign
    ? 'Deseja mesmo Associar este colaborador?'
    : 'Deseja mesmo Desassociar este colaborador?';

  const popConfirmTitle: string = !props.assign
    ? 'Associar Colaborador?'
    : 'Desassociar Colaborador?';

  return (
    <WrapperDefault title="Atribuição de Tarefas">
      <Row justify={'space-between'} gutter={60}>
        <Col xs={24} xl={12}>
          <Divider orientation="left">TAREFA A ATRIBUIR</Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label={'Prazo para Conclusão'}>
              <Space direction="horizontal">
                <Tag color="red">
                  {format(new Date(props?.assignment?.deadline), 'dd/MM/yyyy')}
                </Tag>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={'Tipo da Tarefa'}>
              {props?.assignment?.nature}
            </Descriptions.Item>
            <Descriptions.Item label={'Setor'}>
              {props?.assignment?.workStation?.sector?.name}
            </Descriptions.Item>
            <Descriptions.Item label={'Estação de Trabalho'}>
              {props?.assignment?.workStation?.name}
            </Descriptions.Item>
          </Descriptions>

          {xs || sm ? (
            <Typography.Title level={5} style={{ marginTop: 30 }}>
              RESPONSÁVEIS PELA TAREFA
            </Typography.Title>
          ) : (
            <Divider orientation="left">RESPONSÁVEIS PELA TAREFA</Divider>
          )}

          <List
            style={xs || sm ? { marginBottom: 40 } : {}}
            itemLayout={'vertical'}
            pagination={{ pageSize: 4 }}
            dataSource={props?.assignment?.employeesResponsible}
            renderItem={(employee: User.Assigned) => (
              <EmployeesResponsible employeeResponsible={employee} />
            )}
          />
        </Col>
        <Col xs={24} sm={24} xl={12}>
          {props.assign ? (
            <Typography.Title level={5}>
              COLABORADORES QUE PODEM SER ATRIBUÍDOS
            </Typography.Title>
          ) : (
            <Typography.Title level={5}>
              COLABORADORES QUE PODEM SER DESATRIBUÍDOS
            </Typography.Title>
          )}

          <List
            size={'small'}
            className="demo-loadmore-list"
            itemLayout={'vertical'}
            dataSource={props?.users?._embedded?.users}
            renderItem={(employee: User.Assigned) => (
              <EmployeesResponsible employeeResponsible={employee}>
                <DoubleConfirm
                  popConfirmTitle={popConfirmTitle}
                  popConfirmContent={onConfirm}
                  onConfirm={async () => {
                    if (props.assignment)
                      return (
                        props.onAssigned &&
                        props.onAssigned(Number(employee?.id), employee?.name)
                      );
                  }}
                >
                  <Tooltip title={'Excluir'} placement="bottom">
                    {!props.assign ? (
                      <Button type="primary">
                        ASSOCIAR <UserAddOutlined />
                      </Button>
                    ) : (
                      <Button type="primary" danger>
                        DESASSOCIAR <UserDeleteOutlined />
                      </Button>
                    )}
                  </Tooltip>
                </DoubleConfirm>
              </EmployeesResponsible>
            )}
            pagination={{
              onChange: props.onPage,
              total: props?.users?.page?.totalElements,
              pageSize: 4,
            }}
          />
        </Col>
      </Row>
    </WrapperDefault>
  );
}
