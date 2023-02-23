import { Button, Form, Input, notification, Space } from 'antd';
import { Sector, SectorService } from '../../sdk';
import CustomError from '../../sdk/CustomError';
import WrapperDefault from '../components/WrapperDefault';

interface SectorFormDefaultProps {
  labelRegister: string;
  iconButton: {
    register: React.ReactNode;
    cancel: React.ReactNode;
  };
  title: string;
}

export default function SectorForm(props: SectorFormDefaultProps) {
  const [form] = Form.useForm<Sector.Input>();
  return (
    <WrapperDefault title={props.title}>
      <Form
        layout={'vertical'}
        form={form}
        onFinish={async (sector: Sector.Input) => {
          try {
            const data = await SectorService.createSector(sector);
            notification.success({
              message: 'Sucesso',
              description: `Setor com o nome ${data?.name} criado com sucesso`,
            });
          } catch (error) {
            
            if (error instanceof CustomError) {
              if (error.data?.objects) {
                form.setFields(
                  error.data.objects.map((error: any) => {
                    return {
                      name: error.name?.split('.') as string[],
                      errors: [error.userMessage],
                    };
                  }),
                );
              }
            } else {
              notification.error({
                message: 'Houve um erro',
              });
            }
          }
        }}
      >
        <Form.Item label="Nome:*" name={'name'} rules={[{
          required: false,
          message: 'o campo é obrigatório'
        }]}>
          <Input placeholder="ex:nome do setor" size="large" />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button
              type="primary"
              icon={props.iconButton.register}
              htmlType={'submit'}
            >
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
