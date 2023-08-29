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
  Tooltip,
  notification,
} from 'antd';
import Table, { ColumnProps } from 'antd/es/table';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../core/hooks/useAuth';
import useWorkStation from '../../core/hooks/useWorkStation';
import useWorkStations from '../../core/hooks/useWorkStations';
import { User, WorkStation } from '../../sdk/@types';
import AccessDenied from '../components/AccessDenied';
import DoubleConfirm from '../components/DoubleConfirm';
import WrapperDefault from '../components/WrapperDefault';

export default function WorkStationList() {
  const navigate = useNavigate();
  const [accessDeniedError, setAccessDeniedError] = useState(false);
  const [workStationName, setWorkStationName] = useState<string>();
  const { workStations, fetchWorkStations, fetching } = useWorkStations();
  const { userAuth } = useAuth();
  const { xs } = useBreakpoint();
  const { removeWorkStation } = useWorkStation();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    fetchWorkStations({
      page,
      size: 4,
      sort: ['asc'],
      workStationName,
    }).catch((err) => {
      if (err?.data?.status === 403) {
        setAccessDeniedError(true);
        return;
      }

      throw err;
    });
  }, [fetchWorkStations, page, workStationName]);

  if (accessDeniedError)
    return <AccessDenied>Você não pode visualizar esses dados!</AccessDenied>;

  const getColumnSearchProps = (
    dataIndex: keyof User.Summary,
    displayName?: string,
  ): ColumnProps<User.PagedModelDetailed> => ({
    filterDropdown: ({}) => (
      <Card>
        <Input
          type="text"
          //@ts-ignore
          placeholder={`Buscar ${displayName || dataIndex}`}
          onChange={(e) => {
            setWorkStationName(e.target.value);
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
      <Button
        style={xs ? { width: '100%' } : { display: 'flex' }}
        type={'primary'}
        size={'large'}
        onClick={(_) => navigate('/estacao-de-trabalho/criar')}
      >
        CRIAR ESTAÇÃO DE TRABALHO
      </Button>
      <Divider />
      <WrapperDefault title="Lista de Estações de Trabalho">
        {xs && (
          <Input
            onChange={(e) => setWorkStationName(e.target.value)}
            placeholder="Buscar por Nome"
            type="text"
            style={{ width: '100%', marginBottom: 30, marginTop: 20 }}
          />
        )}
        <Table<WorkStation.Collection>
          loading={fetching}
          rowKey="id"
          dataSource={workStations?._embedded?.workStations}
          columns={[
            {
              title: 'ESTAÇÕES DE TRABALHO',
              responsive: ['xs'],
              render(workStation: WorkStation.Collection) {
                return (
                  <Space direction="vertical">
                    <Descriptions column={1} size={'small'}>
                      <Descriptions.Item label={'Nome'}>
                        <Row> {workStation.name}</Row>
                      </Descriptions.Item>
                      <Descriptions.Item label={'Setor'}>
                        {workStation.sector?.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={'Localização'}>
                        {workStation.localization}
                      </Descriptions.Item>

                      <Descriptions.Item label={'Ações'}>
                        <>
                          <Tooltip title={'Editar'}>
                            <Button
                              type={'link'}
                              shape={'circle'}
                              icon={<EditOutlined />}
                              onClick={() =>
                                navigate(
                                  `/estacao-de-trabalho/editar/${workStation.id}`,
                                )
                              }
                            />
                          </Tooltip>

                          <DoubleConfirm
                            popConfirmTitle="Remover Estação de Trabalho?"
                            popConfirmContent="Deseja mesmo remover esta estação de trabalho?"
                            onConfirm={async () => {
                              await removeWorkStation(Number(workStation.id));
                              notification.success({
                                message: 'Sucesso',
                                description: `Estação de trabalho ${workStation.name}  removida com sucesso`,
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
              title: 'localização',
              dataIndex: 'localization',
              responsive: ['sm'],
            },
            {
              title: 'Setor',
              dataIndex: ['sector', 'name'],
              responsive: ['sm'],
            },
            {
              title: 'Ações',
              dataIndex: 'actions',
              align: 'center',
              width: 200,
              responsive: ['sm'],
              render: (_: any, workstation) => (
                <>
                  <Tooltip title={'Editar'}>
                    <Button
                      type={'link'}
                      shape={'circle'}
                      icon={<EditOutlined />}
                      onClick={() =>
                        navigate(
                          `/estacao-de-trabalho/editar/${workstation.id}`,
                        )
                      }
                    />
                  </Tooltip>

                  <DoubleConfirm
                    popConfirmTitle="Remover Estação de Trabalho?"
                    popConfirmContent="Deseja mesmo remover esta estação de trabalho?"
                    onConfirm={async () => {
                      await removeWorkStation(Number(workstation.id));
                      notification.success({
                        message: 'Sucesso',
                        description: `Estação de trabalho ${workstation.name}  removida com sucesso`,
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
          pagination={{
            onChange: (page: number) => setPage(page - 1),
            total: workStations?.page?.totalElements,
            pageSize: 4,
          }}
        />
      </WrapperDefault>
    </>
  );
}
