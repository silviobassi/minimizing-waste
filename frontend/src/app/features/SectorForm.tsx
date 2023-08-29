import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { hasPermission } from '../../auth/utils/isAuthenticated';
import useAuth from '../../core/hooks/useAuth';
import { Sector, SectorService } from '../../sdk';
import AccessDenied from '../components/AccessDenied';
import ButtonForm from '../components/ButtonForm';
import WrapperDefault from '../components/WrapperDefault';
type SectorType = Sector.SectorModel;
interface SectorFormDefaultProps {
  title: string;
  onUpdate?: (sector: Sector.Input) => SectorType;
  sector?: SectorType;
}

export default function SectorForm(props: SectorFormDefaultProps) {
  const [form] = Form.useForm<Sector.Input>();
  const { userAuth } = useAuth();
  const [fetching, setFetching] = useState<boolean>(false);

  if (userAuth?.role?.permissions.some(permission => permission === "EDIT_SECTORS"))
    return (
      <AccessDenied>
        Você não tem permissão para executar essa operação!
      </AccessDenied>
    );

  useEffect(() => {
    form.resetFields();
  }, [props.sector]);

  return (
    <WrapperDefault title={props.title}>
      <Form
        layout={'vertical'}
        form={form}
        initialValues={props.sector}
        onFinish={async (sector: Sector.Input) => {
          if (props.sector) {
            form.setFieldValue('name', '');

            return props.onUpdate && props.onUpdate(sector);
          }

          await SectorService.createSector(sector).then(
            (sector: Sector.SectorModel) => {
              notification.success({
                message: 'Sucesso',
                description: `Setor ${sector?.name} criado com sucesso`,
              });
            },
          )
          form.resetFields();
        }}
      >
        <Form.Item
          label="Nome:*"
          name={'name'}
          rules={[
            {
              required: false,
              message: 'o campo é obrigatório',
            },
          ]}
        >
          <Input placeholder="ex:nome do setor" size="large" />
        </Form.Item>
        <ButtonForm
          icon={{ create: <SaveOutlined />, cancel: <StopOutlined /> }}
          label={{
            save: props.sector ? 'EDITAR' : 'CRIAR',
            cancel: 'CANCELAR',
          }}
          link={{ cancel: '/setores' }}
        />
      </Form>
    </WrapperDefault>
  );
}
