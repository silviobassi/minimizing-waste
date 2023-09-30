import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  notification,
} from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWorkStations from '../../core/hooks/useWorkStations';
import { Assignment, AssignmentService, WorkStation } from '../../sdk';
import WrapperDefault from '../components/WrapperDefault';

import { EditOutlined, SaveOutlined, StopOutlined } from '@ant-design/icons';
import useAuth from '../../core/hooks/useAuth';
import ButtonForm from '../components/ButtonForm';

type AssignmentFormType = Assignment.AssignmentModel;
interface AssignmentFormDefaultProps {
  title: string;
  assignment?: AssignmentFormType;
  onUpdate?: (user: Assignment.AssignmentInput) => Promise<AssignmentFormType>;
}

export default function TaskForm(props: AssignmentFormDefaultProps) {
  const [form] = Form.useForm();
  const dateFormat = 'DD/MM/YYYY';
  const { fetchWorkStations, workStations } = useWorkStations();
  const { userAuth } = useAuth();
  const [fetching, setFetching] = useState<boolean>();
  const navigate = useNavigate();

  const option = useCallback(() => {
    return fetchOptions();
  }, [fetchOptions]);

  function fetchOptions() {
    const options: WorkStation.WorkStationModel = [];
    workStations?._embedded?.workStations.map(
      (workStation: WorkStation.WorkStationModel) => {
        options.push({
          label: `${workStation.name} - ${workStation.localization}`,
          value: workStation.id,
        });
      },
    );
    return options;
  }

  useEffect(() => {
    fetchWorkStations({});
  }, [fetchWorkStations]);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.assignment}
        onFinish={async (assignment: Assignment.AssignmentInput) => {
          const assignmentDTO: Assignment.AssignmentInput = {
            ...assignment,
            nature: assignment.nature?.toUpperCase(),
            startDate: assignment.startDate
              ? new Date(assignment.startDate).toISOString()
              : '',
            deadline: assignment.deadline
              ? new Date(assignment.deadline).toISOString()
              : '',
          };
          setFetching(true);
          if (props.assignment) {
            return (
              props.onUpdate &&
              props.onUpdate(assignmentDTO).finally(() => {
                setFetching(false);
              })
            );
          }
          await AssignmentService.createAssignment(assignmentDTO)
            .then((assignment: Assignment.AssignmentModel) => {
              notification.success({
                message: 'Sucesso',
                description: `Tarefa ${assignment?.title}  criada com sucesso`,
              }),
                navigate('/tarefas');
            })
            .finally(() => {
              setFetching(false);
            });
        }}
      >
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Título"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'O Título é obrigatório',
                },
              ]}
            >
              <Input size="large" placeholder="ex: Título" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Ponto Específico"
              name="specificPoint"
              rules={[
                {
                  required: true,
                  message: 'O ponto específico é obrigatório',
                },
              ]}
            >
              <Input size="large" placeholder="e.g: Banheiro 01" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Estação de Trabalho"
              name={['workStation', 'id']}
              rules={[
                {
                  required: true,
                  message: 'A Estação de Trabalho é obrigatória',
                },
              ]}
            >
              <Select
                size="large"
                showSearch
                placeholder="Selecione a Estação de Trabalho"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={option()}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Tipo da Tarefa"
              name="nature"
              rules={[
                {
                  required: true,
                  message: 'O tipo da tarefa é obrigatório',
                },
                {
                  type: 'enum',
                  enum: ['Limpeza', 'Obras'],
                  message: 'A unidade de medida precisa ser: Limpeza ou Obras',
                },
              ]}
            >
              <Select
                size="large"
                placeholder="Selecione o Tipo da Tarefa"
                options={[
                  {
                    label: 'Obras',
                    value: 'Obras',
                  },
                  { label: 'Limpeza', value: 'Limpeza' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Data de Início"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: 'A data de in início é obrigatória',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                locale={locale}
                format={dateFormat}
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item
              label="Prazo para Conclusão"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: 'O prazo para a conclusão é obrigatório',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                locale={locale}
                format={dateFormat}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">NOTIFICAÇÃO</Divider>
        <Row justify={'space-between'} gutter={30}>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Título"
              name={['notification', 'title']}
              rules={[
                {
                  required: true,
                  message: 'O título é obrigatório',
                },
              ]}
            >
              <Input size="large" placeholder="e.g: Título" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Objetivo"
              name={['notification', 'goal']}
              rules={[
                {
                  required: true,
                  message: 'O objetivo é obrigatório',
                },
              ]}
            >
              <Input size="large" placeholder="e.g: Objetivo" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Razão"
              name={['notification', 'reason']}
              rules={[
                {
                  required: true,
                  message: 'A razão é obrigatória',
                },
              ]}
            >
              <TextArea
                rows={4}
                maxLength={300}
                size="large"
                placeholder="e.g: Razão"
                showCount
              />
            </Form.Item>
          </Col>
        </Row>

        <ButtonForm
          loading={fetching}
          icon={{
            create: props.assignment ? <EditOutlined /> : <SaveOutlined />,
            cancel: <StopOutlined />,
          }}
          label={{
            save: props.assignment ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/tarefas' }}
        />
      </Form>
    </WrapperDefault>
  );
}
