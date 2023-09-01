import { UndoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

interface ReloadListProps {
  onReload: (_: any) => Promise<any>;
}

export default function ReloadList(props: ReloadListProps) {
  const { xs } = useBreakpoint();
  return (
    <Tooltip title="Recarregar Lista">
      <Button
        style={{
          width: '100%',
          color: '#BFBFBF',
          fontSize: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        type={'text'}
        size={'large'}
        onClick={() => props.onReload({})}
      >
        <UndoOutlined />
      </Button>
    </Tooltip>
  );
}
