import { Button, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { useEffect } from 'react';
import WrapperDefault from '../components/WrapperDefault';

const { RangePicker } = DatePicker;
interface TaskFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function TaskForm(props: TaskFormDefaultProps) {
  const [form] = Form.useForm();
  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    console.log(RangePicker);
  }, []);

  return (
    <WrapperDefault title={props.title}>
      <Form layout={'vertical'} form={form}>
        <Row justify={'space-between'}>
          <Col xs={24} xl={15}>
            <Form.Item label="Título:*">
              <Input size="large" placeholder="ex: Título" />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Período de Conclusão:*">
              <RangePicker
                style={{ width: '100%' }}
                locale={locale}
                format={dateFormat}
                size="large"
                onCalendarChange={(dates) => console.log(dates)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={'space-between'}>
          <Col xs={24} xl={7}>
            <Form.Item label="Tipo da Tarefa*">
              <Select
                size="large"
                defaultValue="Selecione o Tipo da Tarefa"
                options={[
                  { label: 'Obras', value: 'OBRAS' },
                  { label: 'Limpeza', value: 'LIMPEZA' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={7}>
            <Form.Item label="Estação de Trabalho*">
              <Select
                size="large"
                defaultValue="Selecione a Estação de Trabalho"
                options={[
                  { label: 'BLOCO B5 APTO 05', value: 'BLOCO B5 APTO 05' },
                  { label: 'BLOCO B57 APTO 29', value: 'BLOCO B57 APTO 29' },
                  { label: 'BLOCO G7 APTO 129', value: 'BLOCO G7 APTO 129' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} xl={8}>
            <Form.Item label="Colaborador Responsável*">
              <Select
                size="large"
                defaultValue="Selecione o Colaborador Responsável"
                options={[
                  {
                    label: 'Pedro Oliveira Bassi',
                    value: 'Pedro Oliveira Bassi',
                  },
                  {
                    label: 'Ana Paula S. O. Bassi',
                    value: 'Ana Paula S. O. Bassi',
                  },
                  { label: 'Jorge dos Santos', value: 'Jorge dos Santos' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item  style={{marginTop: 10}}>
          <Space direction="horizontal">
            <Button type="primary" icon={props.iconButton.register}>
              {props.labelRegister}
            </Button>
            <Button type="primary" danger icon={props.iconButton.cancel}>
              Cancelar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </WrapperDefault>
  );
}
