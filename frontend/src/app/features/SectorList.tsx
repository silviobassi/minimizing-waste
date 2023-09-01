import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  notification,
} from 'antd';
import { ColumnProps } from 'antd/es/table';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import useSector from '../../core/hooks/useSector';
import useSectors from '../../core/hooks/useSectors';
import { Sector } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import ReloadList from '../components/ReloadList';
import WrapperDefault from '../components/WrapperDefault';
export default function SectorList() {
  const navigate = useNavigate();
  const { sectors, fetchSectors, fetching } = useSectors();
  const { userAuth } = useAuth();
  const { removeSector } = useSector();
  const [sectorName, setSectorName] = useState<string>('');
  const { xs } = useBreakpoint();
  const [accessDeniedError, setAccessDeniedError] = useState(false);

  useEffect(() => {
    fetchSectors({ sectorName }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchSectors, sectorName]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const getColumnSearchProps = (
    dataIndex: keyof Sector.Collection,
    displayName?: string,
  ): ColumnProps<Sector.Collection> => ({
    filterDropdown: ({}) => (
      <Card>
        <Input
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setSectorName(e.target.value);
          }}
        />
      </Card>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#0099ff' : undefined }} />
    ),
  });

  return (
    <>
      <Space
        style={{ width: '100%' }}
        direction={xs ? 'vertical' : 'horizontal'}
        size={'middle'}
      >
        <ReloadList onReload={fetchSectors} />
        <Button
          style={xs ? { width: '100%' } : { display: 'flex' }}
          type={'primary'}
          size={'large'}
          onClick={(_) => navigate('/setor/criar')}
        >
          CRIAR SETOR
        </Button>
      </Space>
      <Divider />
      <WrapperDefault title="Edição de Setor">
        <Row justify={'center'}></Row>

        {xs && (
          <Input
            onChange={(e) => setSectorName(e.target.value)}
            placeholder="Buscar por Nome"
            type="text"
            style={{ width: '100%', marginBottom: 30, marginTop: 20 }}
          />
        )}
        <Table<Sector.Collection>
          loading={fetching}
          rowKey="id"
          dataSource={sectors?._embedded?.sectors}
          columns={[
            {
              title: 'SETORES',
              responsive: ['xs'],
              render(sector: Sector.Collection) {
                return (
                  <Space direction="vertical">
                    <Descriptions column={1} size={'small'}>
                      <Descriptions.Item label={'Nome'}>
                        <Row> {sector.name}</Row>
                      </Descriptions.Item>

                      <Descriptions.Item label={'Ações'}>
                        <>
                          <Tooltip title={'Editar'}>
                            <Button
                              type={'link'}
                              shape={'circle'}
                              icon={<EditOutlined />}
                              onClick={() =>
                                navigate(`/setor/editar/${sector.id}`)
                              }
                            />
                          </Tooltip>

                          <DoubleConfirm
                            popConfirmTitle="Remover Setor?"
                            popConfirmContent="Deseja mesmo remover este Setor?"
                            onConfirm={async () => {
                              await removeSector(Number(sector.id));
                              notification.success({
                                message: 'Sucesso',
                                description: `Setor ${sector.name}  removido com sucesso`,
                              });
                            }}
                          >
                            <Tooltip title={'Excluir'} placement="bottom">
                              <Button type="link">
                                <DeleteOutlined />
                              </Button>
                            </Tooltip>
                          </DoubleConfirm>
                        </>
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                );
              },
            },
            { title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'] },
            {
              title: 'Nome',
              dataIndex: 'name',
              responsive: ['sm'],
              ...getColumnSearchProps('name', 'Nome'),
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              align: 'center',
              width: 200,
              responsive: ['sm'],
              render: (_: any, sector) => (
                <>
                  <Tooltip title={'Editar'}>
                    <Button
                      type={'link'}
                      shape={'circle'}
                      icon={<EditOutlined />}
                      onClick={() => navigate(`/setor/editar/${sector.id}`)}
                    />
                  </Tooltip>

                  <DoubleConfirm
                    popConfirmTitle="Remover Setor?"
                    popConfirmContent="Deseja mesmo remover este Setor?"
                    onConfirm={async () => {
                      await removeSector(Number(sector.id));
                      notification.success({
                        message: 'Sucesso',
                        description: `Setor ${sector.name}  removido com sucesso`,
                      });
                    }}
                  >
                    <Tooltip title={'Excluir'} placement="bottom">
                      <Button type="link">
                        <DeleteOutlined />
                      </Button>
                    </Tooltip>
                  </DoubleConfirm>
                </>
              ),
            },
          ]}
          pagination={false}
        />
      </WrapperDefault>
    </>
  );
}
